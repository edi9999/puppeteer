# Page.setGeolocation() method

Sets the page's geolocation.

**Signature:**

```typescript
setGeolocation(options: GeolocationOptions): Promise<void>;
```

## Parameters

| Parameter | Type                                                    | Description |
| --------- | ------------------------------------------------------- | ----------- |
| options   | [GeolocationOptions](./puppeteer.geolocationoptions.md) |             |

**Returns:**

Promise&lt;void&gt;

## Remarks

NOTE: Consider using [BrowserContext.overridePermissions()](./puppeteer.browsercontext.overridepermissions.md) to grant permissions for the page to read its geolocation.

## Example

```js
await page.setGeolocation({latitude: 59.95, longitude: 30.31667});
```
