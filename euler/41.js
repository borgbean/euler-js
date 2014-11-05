(function(eulerProblems) {
	"use strict";
	eulerProblems[41] = function() {
		var largest = null;
		var primes = sieve(7654321);  //8+9 digits all divisible by 3
		for(var i = primes.length - 1; i >= 0; --i) {
			var prime = primes[i];
			var decBy = isPandigital(prime);
			if(decBy === 0) {
				largest = prime;
				break;
			}
		}

		return {result: largest, expected: 7652413};
	};

	var l10 = Math.log(10);
	function isPandigital(num) {
		var digits = [];
		var len = Math.ceil(Math.log(num)/l10);
		var i = 0;
		while(num > 0) {
			var cur = num % 10;
			num = (num / 10) << 0;
			if(cur === 0 || cur > len || digits[cur] >= 0) {
				if(cur > len) {
					var sub = cur - len;
					return sub * Math.pow(10, i);
				} else if(cur === 0) {
					return Math.pow(10, i);
				} else {
					return Math.pow(10, digits[cur]);
				}
			}
			digits[cur] = i;
			++i;
		}
		return 0;
	}
})(eulerProblems);
