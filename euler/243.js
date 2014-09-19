(function(eulerProblems) {
	"use strict";

	var primes;
	eulerProblems[243] = function() {
		primes = sieve(1e4);
		var max = primes.length;
		var ans;
		var minRatio = 15499/94744;
		var factors = [];

		var num = 1;
		var phi = 1;

		for(var i = 0; i < max; ++i) {
			num *= primes[i];

			phi *= (1 - 1/(primes[i]));

			if(((num*phi) / (num-1)) < minRatio) {
				num /= primes[i];
				phi /= (1 - 1/(primes[i]));
				var newNum = num;
				var j = 2;
				while(((newNum*phi) / (newNum-1)) >= minRatio) {
					newNum = num * j++;
				}
				ans = newNum;
				break;
			}
		}

		return { result: ans, expected: 892371480 };
	};
})(eulerProblems);
