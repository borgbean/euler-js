(function(eulerProblems) {
	"use strict";
	eulerProblems[39] = function() {
		var maxCount = 0;
		var maxP = -1;
		var p = 1000;
		while(p >= 5) {
			var count = 0;
			var a = 1;
			while(((2 * a) + 1) < p) {
				//LOL
				var b = ((2 * a) * (a - p) + (p * p)) / (2 * (p - a));
				if((b % 1) !== 0) {
					++a;
					continue;
				}
				++count;
				++a;
			}
			if(count > maxCount) {
				maxCount = count;
				maxP = p;
			}
			--p;
		}

		return {result: maxP, expected: 840};
	};
})(eulerProblems);
