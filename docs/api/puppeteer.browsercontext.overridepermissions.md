# BrowserContext.overridePermissions() method

**Signature:**

```typescript
overridePermissions(origin: string, permissions: Permission[]): Promise<void>;
```

## Parameters

| Parameter   | Type                                        | Description                                                                                              |
| ----------- | ------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| origin      | string                                      | The origin to grant permissions to, e.g. "https://example.com".                                          |
| permissions | [Permission](./puppeteer.permission.md)\[\] | An array of permissions to grant. All permissions that are not listed here will be automatically denied. |

**Returns:**

Promise&lt;void&gt;

## Example

```js
const context = browser.defaultBrowserContext();
await context.overridePermissions('https://html5demos.com', ['geolocation']);
```
