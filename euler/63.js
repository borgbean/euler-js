(function(eulerProblems) {
	"use strict";
	eulerProblems[63] = function() {
		var count = 1; //1^1 isn't counted
		var length = 1;
		var magnitude = 1;


		while(true) {
			var val = Math.pow(2, length);

			var origMagnitude = magnitude;
			magnitude *= 10;

			var origCount = count;
			var i = 2;
			while(i < 10 && val < magnitude) {
				if(val >= origMagnitude) {
					++count;
				}
				val = Math.pow(++i, length);
			}
			if(origCount === count) {
				break;
			}

			++length;
		}

		return { result: count, expected: 49 };
	};

})(eulerProblems);
