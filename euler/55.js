(function(eulerProblems) {
	"use strict";
	var memoized_results = [];
	eulerProblems[55] = function() {
		var count = 0;
		for(var num = 1; num < 10000; ++num) {
			isLychrel(new silentBigInteger(num)) ? count++ : null;
		}
		return { result: count, expected: 249 };
	};

	function isLychrel(num) {
		var numbers = [];
		for(var _ = 0; _ < 50; ++_) {//max of 50 iterations
			var strRev = num.toString().split("").reverse().join("");
			num = num.add(strRev);
			if(typeof memoized_results[num] !== 'undefined') {
				return memoized_results[num];
			}
			numbers.push(num);
			if(isPalindrome(num.toString())) {
				break;
			}
		}

		var result = _ === 50;
		for(var i = numbers.length - 1; i >= 0; --i) {
			memoized_results[numbers[i]] = result;
		}
		return result;
	}
})(eulerProblems);
