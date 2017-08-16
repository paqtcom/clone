# Clone
Clone an element.

[![NPM version][npm-image]][npm-url] [![Downloads][downloads-image]][npm-url]

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

[downloads-image]: https://img.shields.io/npm/dm/way2web-clone.svg
[npm-url]: https://www.npmjs.com/package/way2web-clone
[npm-image]: https://img.shields.io/npm/v/way2web-clone.svg
