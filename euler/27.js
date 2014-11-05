(function(eulerProblems) {
	"use strict";
	eulerProblems[27] = function() {
		var primes = sieve(1000);
		var primes_len = primes.length;
		var max_len = 0;
		var max_product = 0;
		for(var a = -999; a < 999; ++a) {
			for(var i = primes_len - 1; i >= 0; --i) {
				var b = primes[i];

				var temp = (max_len*max_len) + a*max_len + b;
				if(temp < 0) {
					break;
				}
				if(!isPrime(primes, temp)) {
					continue;
				}

				var n;
				for(n = 1;;++n) {
					if(!isPrime(primes, n*(n + a) + b)) {
						break;
					}
				}
				if((n - 1) > max_len) {
					max_len = n - 1;
					max_product = a * b;
				}
			}
		}

		return { result: max_product, expected: -59231 };
	};

})(eulerProblems);
