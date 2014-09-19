(function(eulerProblems) {
	"use strict";
	var primes;
	eulerProblems[37] = function() {
		primes = sieve_unaltered(1e6);
		var results = [];

		for(var i = 0; i < primes.length; ++i) {
			var num = i*2 + 1;
			if(!primes[i] || num < 10) {
				continue;
			}
			var digits = Math.ceil(Math.log(num) / Math.log(10));
			var firstDigit = Math.floor(num / Math.pow(10, digits-1));
			if(firstDigit !== 2 && (firstDigit & 1) === 0) {
				continue;
			}

			var truncatable = true;

			//truncate
			var tens = 1;
			for(var j = digits - 1; j >= 1; --j) {
				tens *= 10;
				var leftTruncated = num % tens;
				var rightTruncated = Math.floor(num / tens);
				if(!isPrime(primes, leftTruncated) || !isPrime(primes, rightTruncated)) {
					truncatable = false;
					break;
				}
			}

			if(!truncatable) {
				continue;
			}

			results.push(num);
			if(results.length == 11) {
				break;
			}
		}

		var sum = results.reduce(function(prev, cur) { return prev + cur;});

		return {result: sum, expected: 748317};
	};
})(eulerProblems);
