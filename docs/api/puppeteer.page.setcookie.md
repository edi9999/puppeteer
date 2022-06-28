# Page.setCookie() method

**Signature:**

```typescript
setCookie(...cookies: Protocol.Network.CookieParam[]): Promise<void>;
```

## Parameters

| Parameter | Type                             | Description |
| --------- | -------------------------------- | ----------- |
| cookies   | Protocol.Network.CookieParam\[\] |             |

**Returns:**

Promise&lt;void&gt;

## Example

```js
await page.setCookie(cookieObject1, cookieObject2);
```
