---
date: "2019-01-13"
title: "JavaScript Basics"
tags: ['fundamentals', 'basic', 'javascript']
---
Fundamentals of JavaScript.

### if condition
```javascript
if ( some_variable ) {
    // we don't get here if some_variable is null, undefined, 0, NaN, false or ""
}
```
The two lines are equivalent:
```javascript
if ( some_variable != null ) {}
if ( typeof(some_variable) !== "undefined" && some_variable !== null) {}
```

### IIFE with closures
**IIFE**: Immediately invoked function expression.
Any variables and functin within the IIFE will continue to exists. But need to make sure to return a reference.

```javascript
const app = (function() {
    const carId = 123;
    const getId = function() {
        return carId;
    };
    return {
        getId: getId
    };
})();
console.log(app.getId()); // 123
```

### Call and apply
(move section to basic)

```javascript
const o = {
    carId: 123,
    getId: function() {
        return this.carId;
    }
};

const newCar = { carId: 456 };
console.log(o.getId.call(newCar)); // <-- 456
```

Apply similar to call but you can pass arguments.
```javascript
...
getId: function(prefix) {
    return prefix + this.carId;
}
console.log(o.getId.apply(newCar, ['id: '])); // id: 456
```

### Bind
Copy of existing function
```javascript
...
const newFn = o.getId.bind(newCar);
console.log(newFn()); // 456
```

### Arrow functions
Arrow functions do not have their own *this* value. *this* refers to the enclosing context.


