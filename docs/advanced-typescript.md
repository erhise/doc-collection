---
date: "2018-12-18"
title: "Advanced TypeScript"
tags: ['typescript', 'advanced']
---
Some various TypeScript tips and tricks.

### Constant enums
As long as you are using constant values for your `enum` you should really make it a **constant enum**.

```typescript
const enum Compass {
  North,
  East,
  South,
  West
}
```

By adding `const` in front of your `enum`, it will be completely removed during compilation. This means any reference to the `enum` is replaced with the actual value in the compiled code.

For example, if you have the following TypeScript:
```typescript
const foo: Compass = Compass.North;
var foo = 0;
```
Hence, **constant enums** give us all the benefits of enumerations with no overhead.

### Numeric Separator
Since TypeScript 2.7 it is possible to add numeric separators

```javascript
const bigNumber = 1243253214;
const bigNumber = 1_243_253_214;
```

Compiled JavaScript will be the same.

### Usage of the JavaScript "in" operator

```javascript
interface Admin {
	id: string;
	role: string;
}
interface User {
	email: string;
}

function redirect(usr: Admin | User) {
	if ("role" in usr) {
		// assured user is of type admin
	} else {
		// the user is of type user
	}
}
```

Not great but can be used as an alternative
```javascript
function isAdmin(usr: Admin | User): usr is Admin {
	return (<Admin>usr).role !== "undefined";
}
```


