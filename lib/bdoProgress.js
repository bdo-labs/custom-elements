/**
 * Displays a progress bar with an optional high and low area. Use the
 * following attributes:
 * bdo-progress: Progress value
 * bdo-progress-low: Low mark percentage
 * bdo-progress-high: High mark percentage
 * bdo-progress-max: (optional) The maximum value, everything above will be
 *     shown as 100%. Defaults to 100.
 *
 * PS: The directive name and attributes are prefixed to avoid conflicts
 *     with bootstrap's progress bar.
 */
angular.module('customElements').directive('bdoProgress', [
	function () {

		function link(scope, element, attrs) {
			element.addClass('bdo-progress');

			// We might have to update the correct color section later and make
			// sure the caret never exceeds it's bounds.
			// Let's watch the relevant values.
			scope.$watch(
				function (scope) {
					return scope.$eval("[progress, low, high, max]").join(',');
				},
				function (newValue, oldValue, scope) {

					var max = isNaN(scope.max) ? 100 : scope.max,
						percent = 100*scope.progress/max;

					// Set caret position
					scope.position = 100 * Math.min(1, scope.progress/max);

					// Set min/max
					scope.lowPc = isNaN(scope.low) ? 0 : scope.low;
					scope.highPc = isNaN(scope.high) ? 100 : scope.high;

					// Find correct active section
					scope.activeSection = percent < scope.lowPc ?
						'low' : (percent < scope.highPc ? 'medium' : 'high');
			}
		);
	}

	return {
		scope: {
			low: '=bdoProgressLow',
			high: '=bdoProgressHigh',
			progress: '=bdoProgress',
			max: '=?bdoProgressMax'
		},

		link: link,

		template: '<div ng-class="[\'bar\', activeSection]">' +
				'<div class="high" style="width: {{100-highPc}}%;"></div>' +
				'<div class="low" style="width: {{lowPc}}%;"></div>' +
			'</div>' +
			'<div class="indicator" style="left: {{position}}%">▲</div>'
	}
}
]);
