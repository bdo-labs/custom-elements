/**
 * Simple toggle button in switch format
 */

angular.module('customElements').directive('bdoSwitch', function () {
  return {
    restrict: 'EA',
    scope: {
      value: '=switch'
    },
    link: function (scope, element, attributes) {

      element.addClass('bdo-switch');

      element[0].addEventListener('click', function () {
        scope.$apply(function () {
          scope.value = !scope.value;
        });
      });

      scope.$watch('value', function (newValue) {
        element.removeClass('off on');
        element.addClass(scope.value ? 'on' : 'off');
      });

    },
    template: '<span>{{value ? \'Ja\' : \'Nei\'}}</span>'
  };
});

