# Page.setUserAgent() method

**Signature:**

```typescript
setUserAgent(userAgent: string, userAgentMetadata?: Protocol.Emulation.UserAgentMetadata): Promise<void>;
```

## Parameters

| Parameter         | Type                                 | Description                             |
| ----------------- | ------------------------------------ | --------------------------------------- |
| userAgent         | string                               | Specific user agent to use in this page |
| userAgentMetadata | Protocol.Emulation.UserAgentMetadata | <i>(Optional)</i>                       |

**Returns:**

Promise&lt;void&gt;

Promise which resolves when the user agent is set.
