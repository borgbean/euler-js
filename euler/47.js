(function(eulerProblems) {
	"use strict";
	var primes;
	eulerProblems[47] = function() {
		primes = sieve(1e5);
		var tmp = [];
		for(var i = 0, max = primes.length; i < max; ++i) {
			tmp[primes[i]] = true;
		}
		primes = tmp;

		for(var i = 600;;i += 4) {
			if(countFactors(primes, i) < 4) {
				continue;
			}
			var instances = [i];
			var first = i;
			var j;
			var cnt = 1;
			//go down
			for(j = i - 1; j > i - 4; --j) {
				if(countFactors(primes, j) < 4) {
					break;
				}
				instances.push(j);
				first = j;
				++cnt;
			}
			//go up
			for(j = i + 1; j < i + 4; ++j) {
				if(countFactors(primes, j) < 4) {
					break;
				}
				instances.push(j);
				++cnt;
			}

			if(cnt >= 4) {
				return {result: first, expected: 134043};
			}

		}

	};

	function countFactors(primes, num) {
		if(primes[num]) {
			return 0;
		}
		var factors = 0;
		while((num & 1) === 0) {
			factors = 1;
			num /= 2;
		}
		var max = Math.floor(Math.sqrt(num)) | 1;
		for(var i = 3; i < max && num > 1; i += 2) {
			if(primes[num]) {
				return factors + 1;
			}
			if(!primes[i]) {
				continue;
			}
			if((num % i) === 0) {
				num /= i;
				++factors;
			}

			while((num % i) === 0) {
				num /= i;
			}
		}
		if(primes[num]) {
			return factors + 1;
		}

		return factors;
	}
})(eulerProblems);
