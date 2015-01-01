(function(eulerProblems) {
	"use strict";
	eulerProblems[28] = function() {
		var len = 2;
		var sum = 1;
		var diag = 1;
		var i = 0;
		var width = 2;
		var max = Math.ceil(1001 / 2);
		while(width <= max) {
			diag += len;
			sum += diag;
			if(++i == 4) {
				len += 2;
				i = 0;
				width += 1;
			}
		}
		return { result: sum, expected: 669171001 };
	};
})(eulerProblems);
