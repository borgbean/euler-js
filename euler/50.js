(function(eulerProblems) {
	"use strict";
	var primes;
	var primesOrig;
	eulerProblems[50] = function() {
		primesOrig = sieve_unaltered(1e6);
		primes = sieve_from_unaltered(primesOrig);
		var maxPrime = primes[primes.length - 1];
		var maxLeft = 0;
		var maxRight = 0;
		var minLeft = right;
		var sum;

		var right = primes.length - 1;
		while(right > (maxRight - maxLeft)) {
			sum = primes[--right];
			var left = right - 1;
			var foundIdx = -1;
			while(sum <= maxPrime && left >= 0) {
				sum += primes[left];
				if(sum < maxPrime && old_isPrime(primesOrig, sum)) {
					foundIdx = left;
				}
				--left;
			}
			if(foundIdx !== -1 && (right - foundIdx) > (maxRight - maxLeft)) {
				maxLeft = foundIdx;
				maxRight = right;
			}
		}

		sum = 0;
		for(var i = maxLeft; i <= maxRight; ++i) {
			sum += primes[i];
		}

		return { result: sum, expected: 997651 };
	};

})(eulerProblems);
