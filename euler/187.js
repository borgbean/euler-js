(function(eulerProblems) {
	"use strict";

	eulerProblems[187] = function() {
		var primes = sieve(1e8/2);
		var max = 1e8 - 1;
		var count = 0;

		for(var i = primes.length - 1; i >= 0; --i) {
			var idx = binarySearch(0, i, max / primes[i], primes);

			idx -= (primes[i] * primes[idx]) > max;
			if(idx === i) {
				break;
			}
			count += idx + 1;
		}

		++i;
		count += i * (i+1) / 2;

		return { result: count, expected: 17427258 };
	};

})(eulerProblems);
