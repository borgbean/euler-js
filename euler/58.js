(function(eulerProblems) {
	"use strict";
	eulerProblems[58] = function() {
		var primes = sieve(1e5);
		var primeCount = 0;
		var nonPrimeCount = 1;

		var len = 2;
		var diag = 1;
		var i = 0;
		while(true) {
			diag += len;
			++nonPrimeCount;
			if(isPrime(primes, diag)) {
				++primeCount;
			}

			if(++i == 4) {
				if((primeCount / nonPrimeCount) < 0.1 && diag > 10) {
					break;
				}
				len += 2;
				i = 0;
			}
		}
		return { result: len + 1, expected: 26241 };
	};

	function isPrime(primes, num) {
		if(num === 2) {
			return true;
		}
		if((num & 1) === 0) {
			return false;
		}

		var sqrt = Math.floor(Math.sqrt(num));
		for(var i = 0; primes[i] <= sqrt; ++i) {
			if((num % primes[i]) === 0) {
				return false;
			}
		}
		return true;
	}
})(eulerProblems);
