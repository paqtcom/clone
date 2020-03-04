# Clone
Clone an element.

[![NPM version][npm-image]][npm-url] [![Downloads][downloads-image]][npm-stats]

With this package you can clone elements on page.

Add this to your javascript file:
```
new Clone(element).init();
```

Example html:

```
<div class="js-clone">
    <input class="js-clone-count" name="counter" type="hidden" value="1">
    <form>
        <div class="js-remove-target">
            <button type="button" name="remove-target" class="js-clone-delete">
                Delete
            </button>
            <input name="test[0][id]" type="hidden" value="1">
        </div>

        <div class="js-clone-target"></div>
    </form>

    <div class="is-hidden | js-remove-target js-clone-template">
        <button type="button" name="remove-target" class="js-clone-delete">
            Delete
        </button>
        <input name="test[{key}][id]" type="hidden" value="{key}">
    </div>

    <button class="btn btn--filled | js-add-clone-button">Add delivery address</button>
</div>

```

Default elements:
```
{
    toggle:      '.js-add-clone-button',
    remove:      '.js-clone-delete',
    target:      '.js-clone-target',
    template:    '.js-clone-template',
    counter:     '.js-clone-count',
    removeClone: '.js-remove-target'
}
```

You can overrule this with: `.setElements({ ... })`

Default classes:
```
{
    hidden: 'is-hidden'
}
```

You can overrule this with: `.setClasses({ ... })`

When a element is cloned or removed an event is triggered.
You can set functions to call when the element is cloned or removed.
The events are `clone` and `remove`.

You can overrule this with: `.setEvents({ ... })`

e.g.
```
new Clone(element)
    .setEvents({
        clone: testFunction
    })
    .init();
```

## functions

### init

Get all parameters, and merge it with the default values.
Check the click events.

`return {object}`

### scope

The element used for the clone.

### clone

Clone the element.
This function is called if you click on the clone button.

### remove

When triggered, remove the target element.
This function is called if you click on the remove button of an item.

### setElements

Overrule the default elements.

`param {object} customElements`

`return {object}`

### setClasses

Overrule the default classes.

`@param {object} customClasses`

`@return {object}`

### setEvents

Overrule the default events.

`@param {object} customEvents`

`@return {object}`

### setCountOnRemove

If true, the count will be the amount of items.
The counter will change if you delete an item.
By default the value is false, so it can be used as an unique id.

`@param {boolean} customCountOnRemove`

`@return {object}`

### getItems

Get all item elements.

`return {object}`

### getTemplate

Get the template element.

`@return {object}`

### getItemCount

Get the total of items.

`@return {integer}`

### version

Get the version of the package.


## NPM

Install using npm:

```
$ npm install --save way2web-clone
```


## Test the package.

To test the package, clone the package to your system.
Than run this command.

```
npm run build
```

This will copy the test files to the dist, and also build the package files include the dependencies.

When this script is complete without errors, you can open `dist/index.html` in your browser.
Open the dev tools, tab console, and you see all the results of the tests.

If you only want to check the eslint rules, just run.

```
npm run lint
```

[downloads-image]: https://img.shields.io/npm/dt/way2web-clone.svg
[npm-url]: https://www.npmjs.com/package/way2web-clone
[npm-image]: https://img.shields.io/npm/v/way2web-clone.svg
[npm-stats]: https://npm-stat.com/charts.html?package=way2web-clone
