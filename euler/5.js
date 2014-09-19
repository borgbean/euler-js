(function(eulerProblems) {
	"use strict";

	eulerProblems[5] = function() {
		var primes = sieve(20);
		var numPrimes = primes.length;

		var num = 1;

		for(var i = 0; i < numPrimes; ++i) {
			var factor = 1;
			while(factor <= 20) {
				factor *= primes[i];
			}
			num *= factor / primes[i];
		}

		return { result: num, expected: 232792560 };
	};

	function increase(num) {

	}
})(eulerProblems);
