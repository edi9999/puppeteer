/**
 * Copyright 2020 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {ariaHandler} from './AriaQueryHandler.js';
import {DOMWorld, WaitForSelectorOptions} from './DOMWorld.js';
import {ElementHandle} from './ElementHandle.js';
import {JSHandle} from './JSHandle.js';
import {AwaitableIterable} from './types.js';

/**
 * @internal
 */
export interface InternalQueryHandler {
  queryOne?: (
    element: ElementHandle<Node>,
    selector: string
  ) => Promise<ElementHandle<Node> | null>;
  queryAll?: (
    element: ElementHandle<Node>,
    selector: string
  ) => Promise<AwaitableIterable<ElementHandle<Node>>>;

  waitFor?: (
    domWorld: DOMWorld,
    selector: string,
    options: WaitForSelectorOptions
  ) => Promise<ElementHandle<Node> | null>;
  queryAllArray?: (
    element: ElementHandle<Node>,
    selector: string
  ) => Promise<JSHandle<Iterable<Node>>>;
}

/**
 * Contains two functions `queryOne` and `queryAll` that can
 * be {@link registerCustomQueryHandler | registered}
 * as alternative querying strategies. The functions `queryOne` and `queryAll`
 * are executed in the page context.  `queryOne` should take an `Element` and a
 * selector string as argument and return a single `Element` or `null` if no
 * element is found. `queryAll` takes the same arguments but should instead
 * return a `NodeListOf<Element>` or `Array<Element>` with all the elements
 * that match the given query selector.
 * @public
 */
export interface CustomQueryHandler {
  queryOne?: (element: Node, selector: string) => Node | null;
  queryAll?: (element: Node, selector: string) => Iterable<Node>;
}

function createInternalQueryHandler(
  handler: CustomQueryHandler
): InternalQueryHandler {
  const internalHandler: InternalQueryHandler = {};

  if (handler.queryOne) {
    const queryOne = handler.queryOne;
    internalHandler.queryOne = async (element, selector) => {
      const jsHandle = await element.evaluateHandle(queryOne, selector);
      const elementHandle = jsHandle.asElement();
      if (elementHandle) {
        return elementHandle;
      }
      await jsHandle.dispose();
      return null;
    };
    internalHandler.waitFor = (
      domWorld: DOMWorld,
      selector: string,
      options: WaitForSelectorOptions
    ) => {
      return domWorld._waitForSelectorInPage(queryOne, selector, options);
    };
  }

  if (handler.queryAll) {
    const queryAll = handler.queryAll;
    internalHandler.queryAll = async function (element, selector) {
      const iterableHandle = await element.evaluateHandle(queryAll, selector);
      const iteratorHandle = await iterableHandle.evaluateHandle(iterable => {
        return iterable[Symbol.iterator]();
      });
      await iterableHandle.dispose();
      async function* generate(handle: JSHandle<Iterator<Node, void>>) {
        let elementHandle: ElementHandle<Node> | null = null;
        do {
          const nextHandle = await handle.evaluateHandle(iterator => {
            return iterator.next().value;
          });
          elementHandle = nextHandle.asElement();
          if (elementHandle) {
            yield elementHandle;
          }
          await nextHandle.dispose();
        } while (elementHandle);
        await handle.dispose();
      }
      return generate(iteratorHandle);
    };
    internalHandler.queryAllArray = async (element, selector) => {
      return await element.evaluateHandle(queryAll, selector);
    };
  }

  return internalHandler;
}

const defaultHandler = createInternalQueryHandler({
  queryOne: (element, selector) => {
    if (!('querySelector' in element)) {
      throw new Error(
        `Could not invoke \`querySelector\` on node of type ${element.nodeName}.`
      );
    }
    return (
      element as unknown as {querySelector(selector: string): Element}
    ).querySelector(selector);
  },
  queryAll: (element, selector) => {
    if (!('querySelectorAll' in element)) {
      throw new Error(
        `Could not invoke \`querySelectorAll\` on node of type ${element.nodeName}.`
      );
    }
    return (
      element as unknown as {
        querySelectorAll(selector: string): NodeList;
      }
    ).querySelectorAll(selector);
  },
});

const pierceHandler = createInternalQueryHandler({
  queryOne: (element, selector) => {
    let found: Element | null = null;
    function search(root: Node) {
      const iter = document.createTreeWalker(root, NodeFilter.SHOW_ELEMENT);
      do {
        const currentNode = iter.currentNode as Element;
        if (currentNode.shadowRoot) {
          search(currentNode.shadowRoot);
        }
        if (currentNode !== root && !found && currentNode.matches(selector)) {
          found = currentNode;
        }
      } while (!found && iter.nextNode());
    }
    search(element);
    return found;
  },

  queryAll: (element, selector) => {
    function* collect(root: Node): Generator<Node, void> {
      const iter = document.createTreeWalker(root, NodeFilter.SHOW_ELEMENT);
      do {
        const currentNode = iter.currentNode as Element;
        if (currentNode.shadowRoot) {
          yield* collect(currentNode.shadowRoot);
        }
        if (currentNode !== root && currentNode.matches(selector)) {
          yield currentNode;
        }
      } while (iter.nextNode());
    }
    return collect(element);
  },
});

const builtInHandlers = new Map([
  ['aria', ariaHandler],
  ['pierce', pierceHandler],
]);
const queryHandlers = new Map(builtInHandlers);

/**
 * Registers a {@link CustomQueryHandler | custom query handler}.
 *
 * @remarks
 * After registration, the handler can be used everywhere where a selector is
 * expected by prepending the selection string with `<name>/`. The name is only
 * allowed to consist of lower- and upper case latin letters.
 *
 * @example
 * ```
 * puppeteer.registerCustomQueryHandler('text', { … });
 * const aHandle = await page.$('text/…');
 * ```
 *
 * @param name - The name that the custom query handler will be registered
 * under.
 * @param queryHandler - The {@link CustomQueryHandler | custom query handler}
 * to register.
 *
 * @public
 */
export function registerCustomQueryHandler(
  name: string,
  handler: CustomQueryHandler
): void {
  if (queryHandlers.get(name)) {
    throw new Error(`A custom query handler named "${name}" already exists`);
  }

  const isValidName = /^[a-zA-Z]+$/.test(name);
  if (!isValidName) {
    throw new Error(`Custom query handler names may only contain [a-zA-Z]`);
  }

  const internalHandler = createInternalQueryHandler(handler);

  queryHandlers.set(name, internalHandler);
}

/**
 * @param name - The name of the query handler to unregistered.
 *
 * @public
 */
export function unregisterCustomQueryHandler(name: string): void {
  if (queryHandlers.has(name) && !builtInHandlers.has(name)) {
    queryHandlers.delete(name);
  }
}

/**
 * @returns a list with the names of all registered custom query handlers.
 *
 * @public
 */
export function customQueryHandlerNames(): string[] {
  return [...queryHandlers.keys()].filter(name => {
    return !builtInHandlers.has(name);
  });
}

/**
 * Clears all registered handlers.
 *
 * @public
 */
export function clearCustomQueryHandlers(): void {
  customQueryHandlerNames().forEach(unregisterCustomQueryHandler);
}

/**
 * @internal
 */
export function getQueryHandlerAndSelector(selector: string): {
  updatedSelector: string;
  queryHandler: InternalQueryHandler;
} {
  const hasCustomQueryHandler = /^[a-zA-Z]+\//.test(selector);
  if (!hasCustomQueryHandler) {
    return {updatedSelector: selector, queryHandler: defaultHandler};
  }

  const index = selector.indexOf('/');
  const name = selector.slice(0, index);
  const updatedSelector = selector.slice(index + 1);
  const queryHandler = queryHandlers.get(name);
  if (!queryHandler) {
    throw new Error(
      `Query set to use "${name}", but no query handler of that name was found`
    );
  }

  return {
    updatedSelector,
    queryHandler,
  };
}
