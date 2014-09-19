(function(eulerProblems) {
	"use strict";
	eulerProblems[25] = function() {
		var digits = [1];
		var digits2 = [1];
		var digits_temp = [];
		var term = 2;

		while(digits2.length < 1000) {
			var len = digits.length;
			var carry = 0;
			for(var i = 0; i < len; ++i) {
				var sum = digits[i] + digits2[i] + carry;
				digits_temp[i] = sum % 10;
				carry = 0;
				if(sum > 9) {
					carry = Math.floor(sum / 10);
				}
			}
			var len = digits2.length;
			for(; i < len; ++i) {
				var sum = digits2[i] + carry;
				digits_temp[i] = sum % 10;
				carry = 0;
				if(sum > 9) {
					carry = Math.floor(sum / 10);
				}
			}
			if(carry !== 0) {
				digits_temp.push(carry);
			}
			digits = digits2;
			digits2 = digits_temp;
			digits_temp = [];
			++term;
		}

		return { result: term, expected: 4782 };
	};
})(eulerProblems);
