---
date: "2019-01-02"
title: "JavaScript Tips and Tricks"
tags: ['javascript', 'tips']
---
Various tips and tricks, good to know information.

### Get unique values of an Array

```javascript
// Way 1: new Set()
const uniqueArray = arr => [...new Set(arr)];

uniqueArray(['Dan', 'Sarah', 'Sophie', 'Sarah']);
// ["Dan", "Sarah", "Sophie"]

// Way 2: Array.from() and new Set()
const uniqueArray2 = arr => Array.from(new Set(arr));

// Way 3: using Array#filter and Set() - may be faster
const seen = new Set();
const uniqueArray3 = arr => arr.filter(x => {
    if (seen.has(x)) return false;
    seen.add(x); return true;
});
```

### Specific Array destructuring
Leaving out values
```javascript
const pIds = [100, 200, 300];
let p1, p2, theRest;
[, p2, ...theRest] = pIds;
console.log(p1, p2, theRest);
// undefined 200 [300]
```

### Specific Object destructring
When destruct to let variable
```javascript
const product = { id: 7000, name: 'nothing' };
let id, name;

({ id, name } = product);
console.log(id, name);
// 7000 "nothing"
```

### Combinding Spread and Rest syntax
```javascript
function startCars(car1, car2, car3, ...rest) {
    console.log(rest);
    // [4, 5, 6]
}

const carIds = [1, 2, 3, 4, 5, 6];
startCars(...carIds);
```

### Loop weird syntax
Without initialized any variables, kind of strange syntax, but it is not a requirement. Need to have the semicolon though.
```javascript
let i=0;
for (; i<12; i++) {
  if (i === 8) {
    break;
  }
}

console.log(i); // 8
```
