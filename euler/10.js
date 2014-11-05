(function(eulerProblems) {
	"use strict";
	eulerProblems[10] = function() {
		var primes = sieve(2*1000*1000);
		var sum = 0;
		for(var i = 0, max = primes.length; i < max; ++i) {
			sum += primes[i];
		}

		return { result: sum, expected: 142913828922 };
	};
})(eulerProblems);
