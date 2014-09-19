(function(eulerProblems) {
	"use strict";
	var primes;
	eulerProblems[204] = function() {
		primes = sieve(100);

		var limit = 10e8;

		var resultCount = countResults(primes.length - 1, limit, 1);

		return { result: resultCount, expected: 2944730 };
	};

	function countResults(primeIdx, limit, cur) {
		var prime = primes[primeIdx];
		var resultCount = 0;
		for(var exp = cur; exp <= limit; exp *= prime) {
			if(exp == limit) {
				return resultCount + 1;
			}
			if((primeIdx - 1) === 0) {
				var curPrime = primes[0];
				var tmp = exp;
				while(tmp <= limit) {
					++resultCount;
					tmp *= curPrime;
				}
			} else {
				resultCount += countResults(primeIdx - 1, limit, exp);
			}

		}

		return resultCount;
	}
})(eulerProblems);
