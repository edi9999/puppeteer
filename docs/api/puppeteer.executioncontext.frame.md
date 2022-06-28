# ExecutionContext.frame() method

**Signature:**

```typescript
frame(): Frame | null;
```

**Returns:**

[Frame](./puppeteer.frame.md) \| null

The frame associated with this execution context.

## Remarks

Not every execution context is associated with a frame. For example, workers and extensions have execution contexts that are not associated with frames.
