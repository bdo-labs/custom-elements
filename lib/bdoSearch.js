/**
 * Search bar. Expands when it gains focus.
 */

angular.module('customElements').directive('bdoSearch', function () {
  return {
    link: function (scope, element, attributes) {
      var searchInput = element.children()[0];

      element.addClass('bdo-search');

      // Live search!
      scope.$watch('search', function (searchString) {
        var searchFunc = scope.$eval(attributes.bdoSearch);

        if (!searchString) {
          delete scope.results;
          return;
        }

        if (typeof searchFunc !== 'function') {
          scope.results = scope.results || [];
        } else {
          scope.results = searchFunc(searchString);
        }

      });

      searchInput.addEventListener('blur', function () {

        element.removeClass('focused');

        scope.$apply(function () {
          scope.search = '';
        });

      });

      searchInput.addEventListener('focus', function () {
        element.addClass('focused');
      });

    },
    template: require('./bdoSearch.html')
  };
});
