---
date: "2019-01-09"
title: "Basic RxJs stuff"
tags: ['rxjs', 'basic']
---
Some very fundamental basic things

### Creating an Observable

```typescript
const source$ = new Observable<number>(observer {
    observer.next(42);
    observer.complete();

    return function teardown() { console.log('Teardown'); };
});
```

When you create a new **Observable**, you pass in an **Observer** which you can emit data to at any point. You also include any tear-down logic such as clearing a timeout or interval, or cancelling an incomplete network request.

### Create an Observer or data sink

```typescript
const observer = {
    next: (x: number) => {
        console.log(`Next: ${x}`);
    },
    complete: () => {
        console.log(`Complete`);
    }
};
```

```typescript
const subscription = number$.subscribe(observer);

const subscription = array$.subscribe({
    next: x => console.log(`Next: ${x}`),
    complete: () => console.log(`Complete`),
    error: err => console.error(err);
});
```

