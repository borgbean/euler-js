(function(eulerProblems) {
	"use strict";
	eulerProblems[9] = function() {
		var product = -1; //-1 while we don't know the answer
		for(var c = 997; product == -1 && c > 2; --c) {
			for(var b = 1000 - (c + 1); c + b + (b - 1) >= 1000; --b) {
				var a = 1000 - (c + b);
				if((a*a + b*b) == c*c) {
					product = c * b * a;
					break;
				}
			}
		}

		return { result: product, expected: 31875000 };
	};
})(eulerProblems);
