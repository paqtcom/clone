(function(Clones) {
    'use strict';

    // Object with the elements for the clones.
    Clones.elements = {
        clone: '.js-clone'
    };

    // Search for the elements to clone.
    Clones.init = function() {
        $(Clones.elements.clone).each(Clones.find);
    };

    // Attach to the clone function.
    Clones.find = function() {
        new Clone($(this)).init();
    };
})(window.Way2web.Clones = window.Way2web.Clones || {});
