(function(eulerProblems) {
	"use strict";
	var primes;
	eulerProblems[46] = function() {
		var primes = sieve(1e5);
		var twiceSquares = [];
		var i;


		for(i = 1; i < 1e2; ++i) {
			twiceSquares[i - 1] = 2 * i * i;
		}


		for(i = 9; i < 1e7; i += 2) {
			if(isPrime(primes, i)) {
				continue;
			}

			var found = false;
			for(var j = 0; twiceSquares[j] < i; ++j) {
				if(isPrime(primes, i - twiceSquares[j])) {
					found = true;
					break;
				}
			}

			if(found) {
				continue;
			}
			return {result: i, expected: 5777};
		}
		return {result: "Not found.", expected: "An answer."};
	};
})(eulerProblems);
