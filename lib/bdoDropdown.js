/**
 * Dropdown menu
 *
 * This directive expects to be filled with to elements where the first is the
 * dropdown trigger and the second is the dropdown it self. Eg.
 *
 * <div bdo-dropdown>
 *   <a href="">My dropdown</a>
 *   <div>
 *     Dropdown content
 *   </div>
 * </div>
 *
 * The dropdown will add listeners to window in order to close on window blur or
 * clicks outside the dropdown. Do also notice that the dropdown will close when
 * an anchor inside the menu is clicked (but not when the clicked item is not an
 * anchor).
 */

angular.module('customElements').directive('bdoDropdown', [
  '$window',
  function ($window) {

    return {
      link: function (scope, element, attributes) {

        var children = element.children(),
          visible = false;

        if (children.length < 2) {
          throw new Error(
            'A dropdown must contain at least two elements!'
          );
        }

        element.addClass('bdo-dropdown');


        // Add event listener to first element (typically a link)
        children[0].addEventListener('click', function (event) {
          toggle();
          event.preventDefault();
        });


        /**
         * This is added as a listener to the body and toggles the menu
         * when a click outside the menu or on a link inside is detected.
         */
        function clickListener(event) {
          var target = event.target,
            anchorClicked = false;

          while (target) {
            anchorClicked |= (target.tagName === 'A');
            if (target === children[1] && anchorClicked) {
              toggle();
              return;
            }

            if (target === element[0]) {
              return;
            }

            target = target.parentNode;
          }

          toggle();

          // Make sure nothing else happens
          event.preventDefault();
          event.stopPropagation();
        };

        /**
         * Toggles the menu
         */
        function toggle() {
          angular.element(children[1]).toggleClass('visible');

          var action = (visible ? 'remove' : 'add') + 'EventListener';

          $window[action]('click', clickListener, true);
          $window[action]('blur', toggle, false);

          visible = !visible;
        }
      }
    };

  }
]);
