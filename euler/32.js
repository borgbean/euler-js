(function(eulerProblems) {
	"use strict";
	eulerProblems[32] = function() {
		var results = [];
		var a = 1;
		while((lenNum(a)*2 + lenNum(a*a)) < 10) {
			var lenA = lenNum(a);

			var b = a;

			var lenB = lenNum(b);
			var lenC = lenNum(a * b);
			while((lenA + lenB + lenC) < 10) {
				var identity = (a + "" + b) + (a * b);
				if(lenNum(identity) === 9 && isPandigital(identity)) {
					if(results.indexOf(a * b) === -1) {
						results.push(a*b);
					}
				}
				++b;
				lenB = lenNum(b);
				lenC = lenNum(a * b);
			}
			++a;
		}

		var sum = 0;
		for(var i = results.length - 1; i >= 0; --i) {
			sum += results[i];
		}

		return { result: sum, expected: 45228 };
	};

	function isPandigital1(num) {
		num = num + "";
		var digits = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
		for(var i = num.length - 1; i >= 0; --i) {
			if(num[i] === 0) {
				return false; //1 - 9 pandigital
			}
			digits[num[i]] = 1;
		}
		for(var i = digits.length - 1; i >= 1; --i) {
			if(digits[i] != 1) {
				return false;
			}
		}
		return true;
	}

	var log10 = Math.log(10);
	function lenNum(num) {
		return Math.ceil(Math.log(num) / log10);
	}
})(eulerProblems);
