# Page.waitForNetworkIdle() method

**Signature:**

```typescript
waitForNetworkIdle(options?: {
        idleTime?: number;
        timeout?: number;
    }): Promise<void>;
```

## Parameters

| Parameter | Type                                     | Description                                   |
| --------- | ---------------------------------------- | --------------------------------------------- |
| options   | { idleTime?: number; timeout?: number; } | <i>(Optional)</i> Optional waiting parameters |

**Returns:**

Promise&lt;void&gt;

Promise which resolves when network is idle
