# BrowserContext.clearPermissionOverrides() method

Clears all permission overrides for the browser context.

**Signature:**

```typescript
clearPermissionOverrides(): Promise<void>;
```

**Returns:**

Promise&lt;void&gt;

## Example

```js
const context = browser.defaultBrowserContext();
context.overridePermissions('https://example.com', ['clipboard-read']);
// do stuff ..
context.clearPermissionOverrides();
```
