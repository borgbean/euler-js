(function(eulerProblems) {
	"use strict";
	eulerProblems[69] = function() {
		//proportional to number of primes

		var primes = sieve(100);
		var product = 1;
		var lastProduct = 1;
		var i = 0;
		while(product < 1e6) {
			lastProduct = product;
			product *= primes[i++];
		}
		return { result: lastProduct, expected: 510510 };
	};


})(eulerProblems);
