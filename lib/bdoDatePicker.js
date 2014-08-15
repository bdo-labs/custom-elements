var Pikaday = require('pikaday');

angular.module('customElements').directive('bdoDatePicker', function () {
	return {
		link: function (scope, el, attr) {
			var pikaday = new Pikaday({
				field: el[0].firstChild,
				onSelect: function () {
					scope.$emit('dateChanged', pikaday.toString());
				},
				format: 'D MMM YYYY'
			});
			pikaday.setDate(new Date())
		},
		template: '<input class="bdo-date-picker" readonly="readonly">'
	}
});