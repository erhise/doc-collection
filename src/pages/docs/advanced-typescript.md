---
date: "2018-12-08"
title: "Advanced TypeScript"
tags: ['typescript', 'advanced']
---
Some various TypeScript tips and tricks.

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


