(function(eulerProblems) {
	"use strict";
	var max = 0;
	var memoized_results = [];
	var l10 = Math.log(10);
	var maxLen = 0;
	var arraySum = function(prev, cur) { return (prev|0) + (cur|0); };
	eulerProblems[56] = function() {
		var count = 0;
		for(var i = 99; i > 0; --i) {
			if((i % 10) === 0) {
				continue;
			}
			var base = new silentBigInteger(i);
			var j;
			for(j = i; j > 0; --j) {
				var res = base.pow(j).toString().split("");
				var sum = res.reduce(arraySum);
				if(Math.ceil(Math.log(sum) / l10) < maxLen) {
					break;
				}
				if(sum > max) {
					max = sum;
					maxLen = Math.ceil(Math.log(max) / l10);
				}
			}
			if(j === i) {
				break;
			}
		}
		return { result: max, expected: 972 };
	};

})(eulerProblems);
