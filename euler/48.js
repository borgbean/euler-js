(function() {
	"use strict";
	eulerProblems[48] = function() {
		var sum = 0;

		for(var i = 1; i <= 1000; ++i) {
			var product = 1;
			for(var j = 0; j < i; ++j) {
				product = (product * i) % 1e10;
			}
			sum = (sum + product) % 1e10;
		}

		return {result: sum, expected: 9110846700};
	};
})(eulerProblems);
