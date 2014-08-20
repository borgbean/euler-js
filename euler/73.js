(function(eulerProblems) {
	"use strict";

	var primes;
	eulerProblems[73] = function() {
		//proportional to number of primes
		var maxNumber = 12000;

		primes = sieve(maxNumber);
		var factorArrays = new Array(maxNumber + 1);
		var max = primes.length;
		var elements = 0;

		for(var i = 1; i <= maxNumber; ++i) {
			factorArrays[i] = [];
		}
		for(var i = 0; i < max; ++i) {
			var prime = primes[i];
			for(var j = prime * 2; j <= maxNumber; j += prime) {
				factorArrays[j].push(prime);
			}
		}
		for(var i = 2; i <= maxNumber; ++i) {
			var first = Math.floor(i / 3) + 1;
			var last = Math.ceil(i / 2) - 1;
			var num = first - 1;
			var factors = factorArrays[i];
			var numFactors = factors.length;
			while(++num <= last) {
				var found = false;
				for(var k = 0; k < numFactors; ++k) {
					if((num % factors[k]) === 0) {
						found = true;
						break;
					}
				}
				if(!found) {
					++elements;
				}
			}
		}

		return { result: elements, expected: 7295372 };
	};
})(eulerProblems);
