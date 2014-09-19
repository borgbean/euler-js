(function(eulerProblems) {
	"use strict";
	eulerProblems[7] = function() {
		var primes = sieve(2*100*1000);
		return { result: primes[10000], expected: 104743 };
	};
})(eulerProblems);
