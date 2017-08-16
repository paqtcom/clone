/**
 *  Clone an element.
 *
 * @param {object} $scope
 * @param {object} customElements
 * @param {object} customClasses
 * @param {object} customEvents
 *
 * @return {object}
 */
window.Clone = function($scope, customElements, customClasses, customEvents) {
    'use strict';

    var version = '0.0.9';

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

    /**
     * Get all parameters, and merge it with the default values.
     * Check the click events.
     *
     * @return {object}
     */
    function init() {
        elements = $.extend(elements, customElements);
        classes = $.extend(classes, customClasses);
        events = $.extend(events, customEvents);

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
        elements = $.extend(elements, customElements);

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
        elements = $.extend(elements, customClasses);

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
        elements = $.extend(elements, customEvents);

        return this;
    }

     /**
      * Clone the element.
      */
    function cloneElement() {
        var $target = $scope.find(elements.target);
        var $counter = $scope.find(elements.counter);
        var $count = $counter.val();

        var $template = $scope.find(elements.template);
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
        $(this).parent(elements.removeClone).remove();

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

    return {
        init:        init,
        scope:       $scope,
        clone:       cloneElement,
        remove:      removeElement,
        setElements: setElements,
        setClasses:  setClasses,
        setEvents:   setEvents,
        version:     version
    };
};
