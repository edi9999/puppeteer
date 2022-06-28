# JSHandle.getProperties() method

The method returns a map with property names as keys and JSHandle instances for the property values.

**Signature:**

```typescript
getProperties(): Promise<Map<string, JSHandle>>;
```

**Returns:**

Promise&lt;Map&lt;string, [JSHandle](./puppeteer.jshandle.md)&gt;&gt;

## Example

```js
const listHandle = await page.evaluateHandle(() => document.body.children);
const properties = await listHandle.getProperties();
const children = [];
for (const property of properties.values()) {
  const element = property.asElement();
  if (element) children.push(element);
}
children; // holds elementHandles to all children of document.body
```
