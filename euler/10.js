(function(eulerProblems) {
	"use strict";
	eulerProblems[10] = function() {
		var primes = sieve_unaltered(2*1000*1000);
		var len = primes.length;
		var sum = 2;
		for(var i = 0; i < len; ++i) {
			if(primes[i]) {
				sum += (i*2)+1;
			}
		}

		return { result: sum, expected: 142913828922 };
	};
})(eulerProblems);
