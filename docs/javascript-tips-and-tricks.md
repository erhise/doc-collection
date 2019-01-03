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

