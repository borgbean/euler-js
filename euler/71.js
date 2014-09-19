(function(eulerProblems) {
	"use strict";

	eulerProblems[71] = function() {
		var frac = 3/7;
		var minDiff = 1;
		var minNumerator = 0;
		var numerator = 1;
		for(var d = 7; d < 1e6; ++d) {
			if((d % 7) === 0) {
				continue;
			}
			while((++numerator/d) < frac);
			--numerator;
			var diff = frac - (numerator / d);
			if(diff < minDiff) {
				minDiff = diff;
				minNumerator = numerator;
			}
		}

		return { result: minNumerator, expected: 428570 };
	};
})(eulerProblems);
