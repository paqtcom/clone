/**
 *  Clone an element.
 *
 * @param {object} $scope
 *
 * @return {object}
 */
 var Clone = function($scope) {
     'use strict';

     var elements = {
         toggle:   '.js-clone-toggle',
         original: '.js-clone-element',
         target:   '.js-clone-target'
     };

     /**
      * Clone the element.
      */
     function cloneElement() {
         var $clone = $scope.find(elements.original).first().clone();
         var $target = $scope.find(elements.target);

         $target.append(
             $clone
                 .removeAttr('hidden')
                 .removeClass(elements.original)
         );
     }

     $scope.find(elements.toggle).on('click', cloneElement);
 };
