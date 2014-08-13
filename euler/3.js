(function(eulerProblems) {
	"use strict";
	eulerProblems[3] = function() {
		var num = 600851475143;
		var primes = sieve(1000*10);
		var i;
		for(i = primes.length - 1; i >= 0; --i) {
			if((num % primes[i]) === 0) {
				break;
			}
		}

		return { result: primes[i], expected: 6857 };
	};
})(eulerProblems);
