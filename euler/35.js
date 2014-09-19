(function(eulerProblems) {
	"use strict";
	var primes;
	eulerProblems[35] = function() {
		var count = 1; // 2 is the first one
		primes = sieve_unaltered(1e6);
		var primesDigitSorted = [];

		for(var i = primes.length - 1; i >= 0; --i) {
			if(!primes[i]) {
				continue;
			}
			var sorted = ((i*2 + 1) + "").split("").sort().join("");
			var digitsIdentical = true;
			var duplicates = [];
			var impossible = false;

			for(var j = sorted.length - 1; j >= 1; --j) {
				if((sorted[j] & 1) === 0) {
					impossible = true;
					break;
				}
				if(sorted[j] != sorted[j-1]) {
					digitsIdentical = false;
				}
			}
			if(impossible) {
				continue;
			}
			if(digitsIdentical && isPrime(primes, num)) {
				++count;
				continue;
			}
			var num = i*2 + 1;
			var origNum = num;
			var numStr = num + "";
			if(!isPrime(primes, num)) continue;
			for(var j = sorted.length - 1; j >= 0; --j) {
				numStr = rotate(numStr);
				num = parseInt(numStr, 10);

				if(origNum < num) {
					impossible = true;
					break;
				}
				if(!isPrime(primes, num)) {
					impossible = true;
					break;
				}
			}
			if(impossible) {
				continue;
			}
			count += sorted.length;


		}

		return {result: count, expected: 55};
	};

	function fact(num) {
		var product = 1;
		while(num > 0) {
			product *= num--;
		}
		return product;
	}

	function rotate(num) {
		num = (num + "").split("");
		var temp = num[0];
		var len = num.length - 1;
		for(var i = 0; i < len; ++i) {
			num[i] = num[i+1];
		}
		num[num.length - 1] = temp;
		num = num.join("");
		return num;
	}
})(eulerProblems);
