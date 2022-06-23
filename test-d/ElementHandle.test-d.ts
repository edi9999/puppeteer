import {expectNotType, expectType} from 'tsd';
import {ElementHandle} from '../lib/esm/puppeteer/common/ElementHandle.js';
import {AwaitableIterable} from '../lib/esm/puppeteer/common/types.js';

declare const handle: ElementHandle;

{
  {
    expectType<ElementHandle<HTMLAnchorElement> | null>(await handle.$('a'));
    expectNotType<ElementHandle<Element> | null>(await handle.$('a'));
  }
  {
    expectType<ElementHandle<HTMLDivElement> | null>(await handle.$('div'));
    expectNotType<ElementHandle<Element> | null>(await handle.$('div'));
  }
  {
    expectType<ElementHandle<Element> | null>(await handle.$('some-custom'));
  }
}

{
  {
    expectType<AwaitableIterable<ElementHandle<HTMLAnchorElement>>>(
      await handle.$$('a')
    );
    expectNotType<ElementHandle<Element>[]>(await handle.$$('a'));
  }
  {
    expectType<AwaitableIterable<ElementHandle<HTMLDivElement>>>(
      await handle.$$('div')
    );
    expectNotType<AwaitableIterable<ElementHandle<Element>>>(
      await handle.$$('div')
    );
  }
  {
    expectType<AwaitableIterable<ElementHandle<Element>>>(
      await handle.$$('some-custom')
    );
  }
}

{
  expectType<void>(
    await handle.$eval(
      'a',
      (element, int) => {
        expectType<HTMLAnchorElement>(element);
        expectType<number>(int);
      },
      1
    )
  );
  expectType<void>(
    await handle.$eval(
      'div',
      (element, int, str) => {
        expectType<HTMLDivElement>(element);
        expectType<number>(int);
        expectType<string>(str);
      },
      1,
      ''
    )
  );
  expectType<number>(
    await handle.$eval(
      'a',
      (element, value) => {
        expectType<HTMLAnchorElement>(element);
        return value;
      },
      1
    )
  );
  expectType<number>(
    await handle.$eval(
      'some-element',
      (element, value) => {
        expectType<Node>(element);
        return value;
      },
      1
    )
  );
  expectType<HTMLAnchorElement>(
    await handle.$eval('a', element => {
      return element;
    })
  );
  expectType<unknown>(await handle.$eval('a', 'document'));
}

{
  expectType<void>(
    await handle.$$eval(
      'a',
      (elements, int) => {
        expectType<Iterable<HTMLAnchorElement>>(elements);
        expectType<number>(int);
      },
      1
    )
  );
  expectType<void>(
    await handle.$$eval(
      'div',
      (elements, int, str) => {
        expectType<Iterable<HTMLDivElement>>(elements);
        expectType<number>(int);
        expectType<string>(str);
      },
      1,
      ''
    )
  );
  expectType<number>(
    await handle.$$eval(
      'a',
      (elements, value) => {
        expectType<Iterable<HTMLAnchorElement>>(elements);
        return value;
      },
      1
    )
  );
  expectType<number>(
    await handle.$$eval(
      'some-element',
      (elements, value) => {
        expectType<Iterable<Node>>(elements);
        return value;
      },
      1
    )
  );
  expectType<Iterable<HTMLAnchorElement>>(
    await handle.$$eval('a', elements => {
      return elements;
    })
  );
  expectType<unknown>(await handle.$$eval('a', 'document'));
}

{
  {
    expectType<ElementHandle<HTMLAnchorElement> | null>(
      await handle.waitForSelector('a')
    );
    expectNotType<ElementHandle<Element> | null>(
      await handle.waitForSelector('a')
    );
  }
  {
    expectType<ElementHandle<HTMLDivElement> | null>(
      await handle.waitForSelector('div')
    );
    expectNotType<ElementHandle<Element> | null>(
      await handle.waitForSelector('div')
    );
  }
  {
    expectType<ElementHandle<Element> | null>(
      await handle.waitForSelector('some-custom')
    );
  }
}
