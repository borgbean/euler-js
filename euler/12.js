(function(eulerProblems) {
	"use strict";
	eulerProblems[12] = function() {
		var num = 0;
		var primes = sieve(1e5);
		var max = 1000*1000;
		for(var i = 1; i < max; ++i) {
			num += i;
			var divisors = cntDivisors(num, primes);
			if(divisors > 500) {
				break;
			}
		}
		return { result: num, expected: 76576500 };
	};

	function cntDivisors(num, primes) {
		var max = primes.length;
		var cnt = 1;
		for(var i = 0; i < max; ++i) {
			var prime = primes[i];
			if((prime * prime) > num) {
				return cnt * 2;
			}

			var pow = 1;
			while((num % prime) === 0) {
				++pow;
				num = Math.floor(num / prime);
			}
			cnt *= pow;

			if(num === 1) {
				return cnt;
			}
		}
		return cnt;
	}
})(eulerProblems);
