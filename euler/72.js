(function(eulerProblems) {
	"use strict";

	var primes;
	eulerProblems[72] = function() {
		//proportional to number of primes
		var maxNumber = 1e6;

		primes = sieve(maxNumber);
		var phiArray = new Array(maxNumber + 1);
		var max = primes.length;
		var elements = 0;

		for(var i = 1; i <= maxNumber; ++i) {
			phiArray[i] = i;
		}
		for(var i = 0; i < max; ++i) {
			var prime = primes[i];
			for(var j = prime*2; j <= maxNumber; j += prime) {
				phiArray[j] *= (1 - 1/prime);
			}
		}
		for(var i = maxNumber; i > 0; --i) {
			if(phiArray[i] === i) {
				elements += i - 1;
			} else {
				elements += phiArray[i];
			}
		}

		return { result: elements, expected: 303963552391 };
	};
})(eulerProblems);
