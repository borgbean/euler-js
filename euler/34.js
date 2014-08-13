(function(eulerProblems) {
	"use strict";
	var factorials;
	eulerProblems[34] = function() {

		var results = [];
		var digits = [1, 0];
		factorials = [];
		for(var i = 0; i < 10; ++i) {
			factorials.push(factorial(i));
		}

		while(digits.length < 8) {
			var num = parseInt(digits.join(""), 10);
			var facSum = digitFactorial(digits);

			if(facSum === num) {
				results.push(num);
			}

			if(facSum > num) {
				incNextGroup(digits);
			} else {
				inc(digits, num - facSum);
			}


		}

		var sum = 0;
		for(var i = results.length - 1; i >= 0; --i) {
			sum += results[i];
		}

		return {result: sum, expected: 40730};
	};

	function inc(digits, difference) {
		for(var i = digits.length - 1; i >= 0; --i) {
			var digit = digits[i];
			if(digit < 9) {
				if(difference === 0) {
					++digits[i];
					return;
				}
				var diff = factorials[9] - factorials[digit];
				digit = 9;

				while(digit >= 1 && diff > difference) {
					--digit;
					diff -= factorials[digit + 1] - factorials[digit];
				}
				if(digit == digits[i]) {
					++digit;
				}
				digits[i] = digit;
				return;
			}
			digits[i] = 0;
		}
		digits.unshift(1);
	}

	function incNextGroup(digits) {
		var digitFound = false;
		var i;
		for(i = digits.length - 1; i >= 0; --i) {
			if(digitFound && digits[i] < 9) {
				++digits[i];
				return;
			}
			if(digits[i] === 0) {
				--i;
				while(i >= 0 && digits[i] === 0) {
					--i;
				}
				++i;
				continue;
			}
			if(digits[i] > 0) {
				digits[i] = 0;
				digitFound = true;
			}
		}
		digits.unshift(1);
	}

	function factorial(digit) {
		var product = 1;
		for(var i = 1; i <= digit; ++i) {
			product *= i;
		}
		return product;
	}

	function digitFactorial(digits) {
		var sum = 0;
		for(var i = digits.length - 1; i >= 0; --i) {
			sum += factorials[digits[i]];
		}
		return sum;
	}
})(eulerProblems);
