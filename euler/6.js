(function(eulerProblems) {
	"use strict";
	eulerProblems[6] = function() {
		var max = 100;
		var diff = (max*(max+1))/2;
		diff *= diff;
		for(var i = 1; i <= max; ++i) {
			diff -= i * i;
		}

		return { result: diff, expected: 25164150 };
	};
})(eulerProblems);
