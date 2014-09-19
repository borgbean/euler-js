(function(eulerProblems) {
	"use strict";
	eulerProblems[57] = function() {
		var count = 0;
		var num = new silentBigInteger(3);
		var denom = new silentBigInteger(2);

		for(var i = 0; i < 1000; ++i) {
			var newDenom = denom.add(num);
			num = num.add(denom.multiply(2));
			denom = newDenom;
			if(num.toString().length > denom.toString().length) {
				++count;
			}
		}

		return {result: count, expected: 153};
	};

})(eulerProblems);
