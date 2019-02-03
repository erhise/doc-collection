---
date: "2019-01-29"
title: "Angular Notes"
tags: ['angular']
---
Some basic, general stuff

## Architecture Considerations
* App overview
* App features
* Domain security
* Domain rules
* Logging
* Services/Communication
* Data models
* Feature components
* Shared functionality

## LIFT
* Locate code quickly
* Identify the code at a glance
* Keep the flattest structure you can
* Try to be DRY

## Preventing reimport of Core
```javascript
export function throwIfAlreadyLoaded(parentModule: any, moduleName: string) {
  if (parentModule) {
    throw new Error(`${moduleName} has alreay been loaded. Import Core modules in the AppModule only.`);
  }
}

import { throwIfAlreadyLoaded } from './import.guard';

export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}
```

## Reference vs. Value Types
Short about changeDetection, no updated value and immutability. A valid term to use.

