(function(eulerProblems) {
	"use strict";
	eulerProblems[20] = function() {
		var digits = [1]; //BCD type thingy
		for(var mul = 1; mul < 101; ++mul) {
			var carry = 0;
			var len = digits.length;
			for(var i = 0; i < len; ++i) {
				digits[i] *= mul;
				digits[i] += carry;
				carry = 0;
				if(digits[i] > 9) {
					var tens = Math.floor(digits[i] / 10);
					digits[i] = digits[i] % 10;
					carry = tens;
				}
			}
			var digit = digits.length - 1;
			while(carry > 0 || digits[digits.length] > 9) {
				if(carry > 0) {
					digits.push(carry);
					++digit;
				}
				carry = 0;
				if(digits[digit] > 9) {
					var tens_ = Math.floor(digits[digit] / 10);
					digits[digit] = digits[digit] % 10;
					carry = tens_;
				}
			}
		}
		var sum = 0;
		for(var j = digits.length - 1; j >= 0; --j) {
			sum += digits[j];
		}

		return { result: sum, expected: 648 };
	};
})(eulerProblems);
