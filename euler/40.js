(function(eulerProblems) {
	"use strict";
	eulerProblems[40] = function() {
		var product = 1;
		var digitIdx = 0;
		var num = 0;
		var d = 1;
		while(d <= 1e6) {
			var digit;

			var ord = Math.ceil(Math.log(num+1) / Math.log(10));
			if(ord < 1) {
				ord = 1;
			}

			while(true) {
				if((Math.pow(10, ord) - (Math.pow(10, ord) % d)) > d) {
					while(digitIdx < d) {
						++num;
						digitIdx += ord;
					}

					if(digitIdx < d) {
						continue;
					}
					var numStr = num.toString(10);
					numStr = numStr[numStr.length - 1 - (digitIdx - d)];
					product *= parseInt(numStr, 10);
					break;
				} else {
					var increments = Math.ceil((d - digitIdx) / ord);
					if(increments > (Math.pow(10, ord) - num - 1)) {
						increments = (Math.pow(10, ord) - num - 1);
					}
					num += increments;
					digitIdx += ord * increments;

					if(digitIdx < d) {
						++num;
						digitIdx += ord + 1;
						++ord;
						continue;
					}
					var numStr = num.toString(10);
					numStr = numStr[numStr.length - 1 - (digitIdx - d)];
					product *= parseInt(numStr, 10);
					break;
				}
			}

			d *= 10 & (~1);
		}

		return {result: product, expected: 210};
	};
})(eulerProblems);
