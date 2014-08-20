(function(eulerProblems) {
	"use strict";

	var primes;
	eulerProblems[70] = function() {
		//proportional to number of primes

		primes = sieve(6000);
		var i;
		var max = primes.length;
		for(i = 0; i < max; ++i) {
			if(primes[i] > 2000) {
				--i;
				break;
			}
		}
		primes = primes.slice(i);
		var ans;
		var minRatio = Infinity;
		max = primes.length;

		for(i = 0; i < max; ++i) {
			for(var j = 0; j < i; ++j) {
				var num = primes[i] * primes[j];
				if(num >= 1e7) break;
				var factors = getFactors(num);
				var phi = num;
				for(var k = factors.length - 1; k >= 0; --k) {
					phi *= (1 - 1/factors[k]);
				}
				if((num / phi) < minRatio && isPermutation(phi.toString(), num.toString())) {
					ans = num;
					minRatio = num / phi;
				}
			}
		}

		return { result: ans, expected: 8319823 };
	};

	function getFactors(n) {
		var factors = [];
		var numPrimes = primes.length;
		for(var i = 0; i < numPrimes && n > 1; ++i) {
			var found = false;
			while((n % primes[i]) === 0) {
				found = true;
				n /= primes[i];
			}
			if(found) {
				factors.push(primes[i]);
			}
		}
		return factors;
	}

	function isPermutation(str1, str2) {
		return str1.split("").sort().join("") === str2.split("").sort().join("");
	}


})(eulerProblems);
