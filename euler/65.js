(function(eulerProblems) {
	"use strict";
	eulerProblems[65] = function() {
		var lastNum = silentBigInteger(2);
		var num = silentBigInteger(3);

		for(var i = 3; i <= 100; ++i) {
			var temp = num;

			if((i % 3) === 0) {
				num = num.multiply(2*(i/3));
			}
			num = num.add(lastNum);
			lastNum = temp;
		}
		
		return { result: num.toString().split("").reduce(function(x, y) { return (x|0) + (y|0); }), expected: 272 };
	};
})(eulerProblems);
