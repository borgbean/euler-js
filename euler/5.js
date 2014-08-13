(function(eulerProblems) {
	"use strict";
	eulerProblems[5] = function() {
		var i = 20;
		var divisible_by = [19, 18, 17, 16, 15, 14, 13, 12, 11];
		var len = divisible_by.length;
		while(true) {
			i += 20;
			var j;
			for(j = 0; j < len; ++j) {
				if((i % divisible_by[j]) !== 0) break;
			}
			if(j == len) break;

		}
		return { result: i, expected: 232792560 };
	};
})(eulerProblems);
