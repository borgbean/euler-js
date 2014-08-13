(function(eulerProblems) {
	"use strict";
	eulerProblems[29] = function() {
		var powers = [];
		var count = 0;
		for(var a = silentBigInteger(2); a.compareAbs(101) === -1; a=a.add(1)) {
			var num = a;
			for(var b = 2; b < 101; ++b) {
				num = num.multiply(a);
				var result = num.toString();
				if(powers[result]) {
					continue;
				}
				powers[result] = 1;
				++count;
			}
		}

		return {result: count, expected: 9183};
	}
})(eulerProblems);
