# Lesson 15 — Asynchronous Programming & RxJS

# Asynchronous Programming

Asynchronous programming allows an application to start an operation and handle its result later, without waiting synchronously for the operation to finish.

Common examples include:

- HTTP requests
- Database operations
- File operations
- Timers
- User events
- API calls

### Synchronous

In synchronous programming, the next operation waits for the current operation to complete.

```typescript
const result = calculateValue();

console.log(result);
```

### Asynchronous

In asynchronous programming, the application can continue other work while waiting for the result.

```typescript
const promise = loadData();

promise.then(result => {
  console.log(result);
});

console.log('Continue working...');
```

# Types of Asynchronous Programming

Common approaches include:

1. Callback
2. Promise
3. `async` / `await`
4. Observable
5. Reactive Programming with RxJS

| Type | Purpose |
|---|---|
| Callback | Executes a function after an operation completes |
| Promise | Represents a future single result |
| `async` / `await` | Provides simpler syntax for Promise-based operations |
| Observable | Represents a stream of values over time |
| RxJS | Provides Observables and operators for reactive programming |

### 1. Callback

A callback is a function passed to another function and executed later.

```typescript
setTimeout(() => {
  console.log('Operation completed');
}, 1000);
```

Key Points

- A callback is executed after an operation completes.
- Multiple nested callbacks can make code difficult to maintain.
- Promises provide a cleaner approach for many asynchronous operations.

### 2. Promise

A Promise represents the eventual result of an asynchronous operation.

A Promise has three states:

| State | Meaning |
|---|---|
| Pending | Operation is still running |
| Fulfilled | Operation completed successfully |
| Rejected | Operation failed |

```typescript
const promise = new Promise<string>(resolve => {
  resolve('Data received');
});

promise.then(result => {
  console.log(result);
});
```

### 3. `async` / `await`

`async` and `await` provide cleaner syntax for working with Promises.

```typescript
async function loadData(): Promise<string> {
  const result = await getData();

  return result;
}
```

Key Points

- `async` defines an asynchronous function.
- `await` waits for a Promise result inside that function.
- An `async` function returns a Promise.

### 4. Observable

An Observable represents a stream of values that can be emitted over time.

```typescript
import { Observable } from 'rxjs';

const numbers$ = new Observable<number>(subscriber => {
  subscriber.next(1);
  subscriber.next(2);
  subscriber.next(3);

  subscriber.complete();
});
```

Subscribe to the Observable:

```typescript
numbers$.subscribe(value => {
  console.log(value);
});
```

Output:

```text
1
2
3
```

Key Points

- An Observable can emit multiple values.
- An Observable can emit values over time.
- An Observable normally starts executing when subscribed to.
- An Observable can be unsubscribed from.
- Angular `HttpClient` returns Observables.

### 5. Reactive Programming with RxJS

Reactive programming is an approach based on reacting to values, events, and asynchronous data streams.

```text
Data/Event Source
       ↓
Observable
       ↓
RxJS Operators
       ↓
Subscriber
       ↓
Application/UI
```

# RxJS

**RxJS (Reactive Extensions for JavaScript)** is a library for working with asynchronous data streams and events.

Angular uses RxJS extensively for:

- HTTP requests
- User input
- Reactive forms
- Router events
- Event streams
- Asynchronous operations

The central concept in RxJS is the **Observable**.

# Observer

An Observer defines how to handle Observable notifications.

```typescript
const observer = {
  next: (value: number) => {
    console.log('Value:', value);
  },

  error: (error: unknown) => {
    console.error('Error:', error);
  },

  complete: () => {
    console.log('Completed');
  }
};
```

Use it with:

```typescript
numbers$.subscribe(observer);
```

Observable Notifications

| Notification | Purpose |
|---|---|
| `next` | Receives an emitted value |
| `error` | Handles an error |
| `complete` | Handles completion |

# Subscription

A Subscription represents an active Observable execution.

```typescript
const subscription = numbers$.subscribe({
  next: value => {
    console.log(value);
  }
});
```

A subscription can be cancelled:

```typescript
subscription.unsubscribe();
```

Subscription management is important for long-running Observables.

# Observable vs Promise

| Feature | Promise | Observable |
|---|---|---|
| Result | Usually one | Zero, one, or many |
| Lazy | No | Yes |
| Cancellation | Limited | `unsubscribe()` |
| Operators | Limited | Many RxJS operators |
| Streams | No | Yes |
| Angular HttpClient | No | Yes |

# RxJS Operators

| Operator | Purpose |
|---|---|
| `map()` | Transform values |
| `filter()` | Filter values |
| `tap()` | Perform side effects |
| `switchMap()` | Switch to the latest Observable |
| `mergeMap()` | Run inner Observables concurrently |
| `concatMap()` | Run inner Observables sequentially |
| `exhaustMap()` | Ignore new values while current operation runs |
| `catchError()` | Handle errors |
| `retry()` | Retry failed operations |
| `debounceTime()` | Wait for inactivity |
| `distinctUntilChanged()` | Ignore consecutive duplicate values |
| `take()` | Take a specific number of values |
| `finalize()` | Perform cleanup |

# `pipe()`

RxJS operators are commonly combined using `pipe()`.

```typescript
numbers$
  .pipe(
    map(value => value * 2),
    filter(value => value > 2)
  )
  .subscribe(value => {
    console.log(value);
  });
```

# Common RxJS Examples

### `map()`

Transforms emitted values.

```typescript
of(1, 2, 3)
  .pipe(
    map(value => value * 10)
  )
  .subscribe(value => {
    console.log(value);
  });
```

### `filter()`

Filters emitted values.

```typescript
of(1, 2, 3, 4)
  .pipe(
    filter(value => value % 2 === 0)
  )
  .subscribe(value => {
    console.log(value);
  });
```

### `catchError()`

Handles an Observable error.

```typescript
this.http.get<Customer[]>('/api/customers')
  .pipe(
    catchError(error => {
      console.error(error);
      return of([]);
    })
  )
  .subscribe(customers => {
    console.log(customers);
  });
```

### `retry()`

Retries a failed operation.

```typescript
this.http.get<Customer[]>('/api/customers')
  .pipe(
    retry(2)
  )
  .subscribe();
```

### `debounceTime()`

Waits for a period of inactivity.

This is commonly used for search fields.

```typescript
searchTerm$
  .pipe(
    debounceTime(300)
  )
  .subscribe(term => {
    console.log(term);
  });
```

### `switchMap()`

Switches to the latest Observable.

It is commonly used for search operations.

```typescript
searchTerm$
  .pipe(
    switchMap(term =>
      this.searchCustomers(term)
    )
  )
  .subscribe(customers => {
    console.log(customers);
  });
```

### Concept

```text
User types
   ↓
Search request A
   ↓
User types again
   ↓
Switch to request B
   ↓
Use latest result
```

# Angular HttpClient and Observables

Angular `HttpClient` returns Observables.

```typescript
this.http.get<Customer[]>('/api/customers');
```

The return type is:

```text
Observable<Customer[]>
```

The response can be handled using `subscribe()`:

```typescript
this.http.get<Customer[]>('/api/customers')
  .subscribe({
    next: customers => {
      console.log(customers);
    },

    error: error => {
      console.error(error);
    }
  });
```

The flow is:

```text
HTTP Request
     ↓
Observable
     ↓
HTTP Response
     ↓
next()
     ↓
Application
```

# Async Pipe

Angular provides the `async` pipe for working with Observables and Promises directly in templates.

Example:

```typescript
message$ = of('Hello from Observable');
```

Template:

```html
<p>{{ message$ | async }}</p>
```

The `async` pipe:

- Subscribes to the Observable or Promise.
- Displays the emitted value.
- Updates the template when a new value arrives.
- Helps manage subscription cleanup.

# Asynchronous Programming vs Reactive Programming

These concepts are related but not identical.

| Concept | Meaning |
|---|---|
| Asynchronous | Handles results that become available later |
| Non-blocking | Does not remain blocked waiting for I/O |
| Reactive | Works with streams of values/events |
| RxJS | JavaScript library providing reactive programming capabilities |

A typical Angular HTTP flow is:

```text
Asynchronous Operation
        ↓
HttpClient
        ↓
Observable
        ↓
RxJS Operators
        ↓
Subscription
        ↓
Update UI
```

# Key Takeaways

- Asynchronous programming allows an application to handle results that become available later.
- HTTP requests are a common asynchronous operation.
- Common approaches include callbacks, Promises, and `async/await`.
- RxJS is used extensively by Angular for asynchronous and event-based programming.
- Observable is the core RxJS concept.
- An Observable can emit multiple values over time.
- `subscribe()` receives Observable values.
- A Subscription represents an active Observable execution.
- RxJS operators process and transform Observable values.
- `map()` transforms values.
- `filter()` filters values.
- `switchMap()` switches to the latest Observable.
- `catchError()` handles errors.
- `retry()` retries failed operations.
- `debounceTime()` is useful for search input.
- Angular `HttpClient` returns Observables.
- The `async` pipe can consume an Observable directly in an Angular template.
- RxJS provides the reactive programming foundation commonly used with Angular.
