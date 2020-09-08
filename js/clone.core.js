/**
 *  Clone an element.
 *
 * @param {object} $scope
 * @param {object} customElements
 * @param {object} customClasses
 * @param {object} customEvents
 * @param {boolean} customCountOnRemove
 *
 * @return {object}
 */
window.Clone = function($scope, customElements, customClasses, customEvents, customCountOnRemove) {
    'use strict';

    var version = '0.3.0';

    var elements = {
        toggle:      '.js-add-clone-button',
        remove:      '.js-clone-delete',
        target:      '.js-clone-target',
        template:    '.js-clone-template',
        counter:     '.js-clone-count',
        removeClone: '.js-remove-target'
    };

    var classes = {
        hidden: 'is-hidden'
    };

    var events = {};

    var countOnRemove = customCountOnRemove;

    /**
     * Get all parameters, and merge it with the default values.
     * Check the click events.
     *
     * @return {object}
     */
    function init() {
        $.extend(elements, customElements);
        $.extend(classes, customClasses);
        $.extend(events, customEvents);

        $scope.find(elements.toggle).on('click', cloneElement);
        $scope.on('click', elements.remove, removeElement);

        return this;
    }

    /**
     * Overrule the default elements.
     *
     * @param {object} customElements
     *
     * @return {object}
     */
    function setElements(customElements) {
        $.extend(elements, customElements);

        return this;
    }

    /**
     * Overrule the default classes.
     *
     * @param {object} customClasses
     *
     * @return {object}
     */
    function setClasses(customClasses) {
        $.extend(classes, customClasses);

        return this;
    }

    /**
     * Overrule the default events.
     *
     * @param {object} customEvents
     *
     * @return {object}
     */
    function setEvents(customEvents) {
        $.extend(events, customEvents);

        return this;
    }

    /**
     * Set the count on remove.
     *
     * @param {boolean} customCountOnRemove
     *
     * @return {object}
     */
    function setCountOnRemove(customCountOnRemove) {
        countOnRemove = customCountOnRemove;

        return this;
    }

    /**
      * Clone the element.
      */
    function cloneElement() {
        var $target = $scope.find(elements.target);
        var $counter = $scope.find(elements.counter);
        var $count = $counter.val();

        var $template = getTemplate();
        var $clone = $template
            .clone(true, true)
            .removeClass(classes.hidden)
            .removeClass(
                removeSelectorPrefix(elements.template)
            );

        $clone.html(
            $clone
                .html()
                .replace(/\{key\}/g, $count)
                .replace(/\{key\+1\}/g, ++$count)
        );

        if($counter.length > 0) {
            $counter.val($count);
        }

        if($target.length > 0) {
            $target.append($clone);
        } else {
            $clone.insertBefore($template);
        }

        triggerEvent('clone', [$clone, $count]);
    }

    /**
     * When triggered, remove the target element.
     */
    function removeElement() {
        var $counter = $scope.find(elements.counter);
        var $count = $counter.val();

        $(this).closest(elements.removeClone).remove();

        if(getItems() && countOnRemove) {
            $count = getItemCount();
        }

        $counter.val($count);

        triggerEvent('remove', [$(this)]);
    }

    /**
     * Trigger an event.
     *
     * @param {string} action
     * @param {array}  eventArguments
     */
    function triggerEvent(action, eventArguments) {
        var event = events[action];

        if(!event) {
            return;
        }

        if(typeof event == 'object') {
            $.each(event, function(index, fn) {
                fn.apply(this, eventArguments);
            });

            return;
        }

        event.apply(this, eventArguments);
    }

    /**
    * Remove the first character of a string.
    *
    * @param {string} selector
    *
    * @return {string}
    */
    function removeSelectorPrefix(selector) {
        var isClass = selector.charAt(0) == '.';
        var isId = selector.charAt(0) == '#';

        if (isClass || isId) {
            return selector.substring(1);
        }
    }

    /**
     * Get all items.
     *
     * @return {object}
     */
    function getItems() {
        return $($scope).find(elements.removeClone + ':not(.' + classes.hidden + ')');
    }

    /**
     * Get the template.
     *
     * @return {object}
     */
    function getTemplate() {
        return $scope.find(elements.template);
    }

    /**
     * Get the total of items.
     *
     * @return {integer}
     */
    function getItemCount() {
        return getItems().length;
    }

    return {
        init:             init,
        scope:            $scope,
        clone:            cloneElement,
        remove:           removeElement,
        setElements:      setElements,
        setClasses:       setClasses,
        setEvents:        setEvents,
        setCountOnRemove: setCountOnRemove,
        getItems:         getItems,
        getTemplate:      getTemplate,
        getItemCount:     getItemCount,
        version:          version
    };
};


if (typeof module !== 'undefined' && module.exports) {
    module.exports = window.Clone;
}
