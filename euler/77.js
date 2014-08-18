(function(eulerProblems) {
	"use strict";
	var primes;
	eulerProblems[77] = function() {
		primes = sieve(1e4);
		var ans;

		for(var i = 15;;++i) {
			var ways = ways_to_get(i, 0);
			if(ways > 5000) {
				ans = i;
				break;
			}
		}
		return { result: ans, expected: 71 };
	};

	function ways_to_get(amount, primeIdx) {
		var prime = primes[primeIdx];

		var ways = 0;

		if((amount % prime) === 0) {
			++ways;
		}

		if((primeIdx + 1) == primes.length || amount < primes[primeIdx + 1]) return ways;

		var i = primes[primeIdx + 1] + ((amount - primes[primeIdx + 1]) % prime);

		while(i <= amount) {
			ways += ways_to_get(i, primeIdx + 1);
			i += prime;
		}

		return ways;
	}
})(eulerProblems);
