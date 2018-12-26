---
date: "2018-12-16"
title: "Algorithms in JavaScript"
tags: ['javascript', 'algorithms']
---
Big-O notation is a special notation that tells you how fast an algorithm is. It does not tell you how fast in seconds your algorithm will run to completion (*duh*, of course). Essentially, Big-O tells us the worst case scenario our algorithm will run at.

Algorithms teach you that large problems can be broken down into smaller problems.
How can we write a maintainable solution that will scale efficiently?

### Counter function

```javascript
function counter() {
    
}
```
Using loop

```javascript
function counter() {
    for (let n=0; n<=10; n++) {
        console.log(n); // 0,1,2,3,4,5,6,7,8,9,10
    }
}
```

Recursion instead of a loop

```javascript
function counter(n) {
    console.log(n); // 0,1,2,3,4,5,6,7,8,9,10
    if (n === 10) {
        return;
    }
    return counter(n + 1);
}
```

In recursion we need to have at least one **base case** and one **recursion case**, otherwise it's going to enter an infinite loop.

*Note*: there's no performance benefit to using recursion. In fact, loops are sometimes better for performance. Contrary, recursion can sometimes be easier to read/understand.

### Example of recursive case

```javascript
const items = [[1,2,3],[4,5,6]];

function findSix(i) {
    let hasSix="no";
    i.forEach(a => {
        a.forEach(l => {
            if (l === 6) {
                hasSix = "yes";
            }
        });
    });
    return hasSix;
}
```
Solve it with recursion

```javascript
const items = [[1,2,3],[4,5,[6]]]; // <-- notice difference

function findSix(i) {
    let hasSix="no";
    i.forEach(a => {
        if (l === 6) { // <-- base case
            hasSix = "yes";
        }
        if (Array.isArray(a)) { // <-- recursion case
            hasSix = findSix(a);
        }
    });
    return hasSix;
}
```

### Divide and Conquer function

Divide and conquer algorithms are recursive algorithms. It's a way to think about a problem. It is composed by using recursive functions to create a base case and to divide or decrease a problem until it becomes the base case.

#### Let's create a sum function
```javascript
function sum(arr) {
    let total = 0;
    for (let i of arr) {
        total += i;
    }
    return total;
}

console.log(sum([1,2,3,4,5])); // 15
```

How to Divide and Conquer and recursion to break this down into smaller problems? Smallest case with our numbers would be if we had an array of just one number or even an empty array.

```javascript
function sum(arr) {
    if (arr.length === 0) return 0;
}
```

Goal is to move closer to this with each recursive call.

```javascript
function sum(arr) {
    if (arr.length === 0) return 0;
    return arr[0] + sum(arr.slice(1));
}

// 1 + sum([2,3,4,5])
// 2 + sum([3,4,5])
```

### Selection Sort

> Big-O notation: O(n x n) or O(n^2)

Not the fastest sorting algorithm, but it get's the job done.

```javascript
function findLargestValue(list) {
    let lrg = list[0];
    let indexOfLarge = 0;
    for (let i; i <= list.length; i++) {
        if (lrg < list[i]) {
            lrg = list[i];
            indexOfLarge = i;
        }
    }
    return indexOfLarge;
}

function selectionSort(list) {
    let newList = [];
    let lrgItem;
    while (list.length) {
        lrgItem = findLargestValue(list);
        newList.push(list[lrgItem]);
        list.splice(lrgItem, 1);
    }
    return newList;
}

const itemsToSort = [3,2,4,1,6];
console.log(slectionSort(itemsToSort)); // [6,4,3,2,1]
```

1. Creating a new array. This is the array that is going to be returned with this function that we see printed in the console.log.
2. Use while loop, where findLargestValue function gets called, passing in the current `list` that have been provided. Once this `findLargestValue` function returns, it gives the index location the current larget item.
3. Which gets pushed onto this new array, then also gets removed right after that.
4. New list gets returned.

Because we need to call our `findLargestValue` function for N number of times, i.e. we have to call our function a total of however long our list is - this gives our `selectionSort` function a beginning big O notation of `O(n)`.

Then if we remember our `findLargestValue` function also has a loop inside of it, i.e. stepping through another N times with its provided list, this makes our big O notation `O(n*n) or O(n^2)`


### QuickSort function

```javascript
function quickSort(array) {
    if (array.length < 2) return array;
    const pivotIndex = Math.floor(array.length / 2);
    const pivot = array[pivotIndex];
    const less = [];
    const greater = [];
    for (const i in array) {
        if (i != pivotIndex) {
            array[i] > pivot
                ? greater.push(array[i])
                : less.push(array[i]);
        }
    }
    return [
        ...quickSort(less),
        pivot,
        ...quickSort(greater),
    ];
}

// pivot: 5, 2, 4
// n-times: 7  
console.log(quickSort([6, 3, 4, 5, 2, 1])); // [1, 2, 3, 4, 5, 6]
```

Every single item in the array needs to be touched. We need to see how large or small an item is in order to know where it fits in line. We know we're at least going to be `O(n)`.

```
// O(n) * O(log n) = O(n log n) --> best and average case
// O(n) * O(n) = O(n^2) --> worst case
```

