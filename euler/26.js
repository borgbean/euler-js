(function(eulerProblems) {
	"use strict";
	eulerProblems[26] = function() {
		var max = 0;
		var d = 0;
		for(var i = 2; i < 1000; ++i) {
			var cnt = 1;
			var orders = 0;

			var j = 10;
			while((j%i) > 1 && ++orders < i) {
				++cnt;
				j = (j%i) * 10;
			}
			if((j%i) === 1 && cnt > max) {
				max = cnt;
				d = i;
			}
		}

		return {result: d, expected: 983};
	};
})(eulerProblems);
