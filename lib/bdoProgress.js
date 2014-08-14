/**
 * Displays a progress bar with an optional high and low area. Use the
 * following attributes:
 * bdo-progress: Progress value
 * bdo-progress-low: Low mark value
 * bdo-progress-high: High mark value
 */
angular.module('customElements').directive('bdoProgress', [
	function () {
		// The relative amount of the line occupied by the given areas
		var sizes = {
			low: 0.2,
			high: 0.2
		};

		function link(scope, element, attrs) {
			element.addClass('bdo-progress');

			// Set min max
			scope.lowPc = 100 * sizes.low;
			scope.highPc = 100 * sizes.high;

			// We might have to update the correct color section later and make
			// sure the caret never exceeds it's bounds.
			// Let's watch the relevant values.
			scope.$watch(
				function (scope) {
					return scope.$eval("[progress, low, high, max]").join(',');
				},
				function (newValue, oldValue, scope) {
					var low = scope.low,
						high = scope.high,
						progress = scope.progress,
						length = (high - low)/(1 - sizes.high - sizes.low),
						min = low - length * sizes.low;


					// Set caret position
					scope.position = 100 *
							Math.max(0, Math.min(1, (progress - min)/length));

					// Find correct active section
					scope.activeSection = progress < low ?
						'low' : (progress < high ? 'medium' : 'high');
				}
			);
		}

		return {
			scope: {
				low: '=bdoProgressLow',
				high: '=bdoProgressHigh',
				progress: '=bdoProgress'
			},

			link: link,

			template: '<div ng-class="[\'bar\', activeSection]">' +
					'<div class="high" style="width: {{highPc}}%;"></div>' +
					'<div class="low" style="width: {{lowPc}}%;"></div>' +
				'</div>' +
				'<div class="indicator" style="left: {{position}}%">▲</div>'
		}
	}
]);
