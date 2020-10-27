(function(Clones) {
    'use strict';

    // Object with the elements for the clones.
    Clones.elements = {
        clone1: '.js-clone1',
        clone2: '.js-clone2'
    };

    Clones.items = {
        clone1: [],
        clone2: []
    };

    // Search for the elements to clone.
    Clones.init = function() {
        $(Clones.elements.clone1).each(Clones.find1);
        $(Clones.elements.clone2).each(Clones.find2);
    };

    // Attach to the clone function.
    Clones.find1 = function() {
        Clones.items.clone1.push(
            new Clone($(this)).init()
        );
    };

    // Attach to the clone function.
    Clones.find2 = function() {
        Clones.items.clone2.push(
            new Clone($(this)).setCountOnRemove(true).init()
        );
    };

    Clones.init();
})(window.Clones = window.Clones || {});
