(function(eulerProblems) {
	"use strict";
	eulerProblems[16] = function() {
		var digits = [1]; //BCD type thingy
		for(var _ = 0; _ < 1000; ++_) {
			var carry = 0;
			//double the number
			var len = digits.length;
			for(var i = 0; i < len; ++i) {
				digits[i] *= 2;
				digits[i] += carry;
				carry = 0;
				if(digits[i] > 9) {
					digits[i] -= 10;
					carry = 1;
				}
			}
			if(carry > 0) {
				digits.push(carry);
			}
		}
		var sum = 0;
		for(var j = digits.length - 1; j >= 0; --j) {
			sum += digits[j];
		}

		return { result: sum, expected: 1366 };
	};
})(eulerProblems);
