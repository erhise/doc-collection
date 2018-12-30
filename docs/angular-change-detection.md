---
date: "2018-12-30"
title: "Angular Change Detection"
tags: ['angular']
---
Brief summary of Angular Change Detection

Two main building blocks of change detection in Angular:
* a component view
* the associated bindings

The view is an Angular low-level abstraction. There is a direct relationship between a view and a component. All operations like property checks and DOM updates are performed on views.

> A View is a fundamental building block of the application UI. It is the smallest grouping of Elements which are created and destroyed together.
> 
> Properties of elements in a View can change, but the structure of elements in a View cannot. Changing the structure of Elements can only be done by inserting, moving or removing nested Views via a ViewContainerRef. Each View can contain many ViewContainers.

### DOM Nodes

Every Angular component has a template with HTML elements. When Angular creates the DOM nodes to render the content of the template, it needs a place to store the references to those DOM nodes. Internally there is a data structure known as **View**. 

### Bindings

Compiler analyzes the template and identifies properties of the DOM elements that may need to be updated during change detection. For each such property, the compiler creates a **binding**. The binding defines the property name to update and the expression that Angular uses to obtain a new value.

### Reference types

* `ElementRef`
* `TemplateRef`
* `ViewRef`
* `ComponentRef`
* `ViewContainerRef`

These DOM abstractions can be accessed inside a component/directive class through DOM queries. It comes in a form of `@ViewChild` and `@ViewChildren` decorators. They returns one/multiple references as a `QueryList` object.

```typescript
@ViewChild([template reference], {read: [reference type]});

<span #templateRef>InnerText</span>
@ViewChild("templateRef", {read: ElementRef}) templateRef: ElementRef;
```

