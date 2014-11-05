(function() {
	"use strict";
	eulerProblems[49] = function() {
		var primes = sieve(1e4);
		var i = 0;
		while(primes[++i] < 1000);
		primes = primes.slice(i);
		for(i = primes.length - 1; i >= 0; --i) {
			primes[i] = [primes[i], primes[i].toString(10)];
		}

		for(i = primes.length - 1; i >= 0; --i) {
			var num = primes[i];
			if(num[0] == 8147) {
				continue;
			}
			for(var j = i - 1; j >= 0; --j) {
				if(!isPermutation(num, primes[j])) {
					continue;
				}
				var difference = num[0] - primes[j][0];
				var permutations = [num[0], primes[j][0]];
				for(var sub = primes[j][0] - difference; sub > 0; sub -= difference) {
					if(!isPermutation(num, [0, sub.toString(10)])) {
						break;
					}
					permutations.push(sub);
				}
				if(permutations.length >= 3) {
					var max = permutations.length;
					for(var curPerm = 1; curPerm < max; ++curPerm) {
						if(isPrime(primes, Math.floor(permutations[curPerm]/2))) {
							break;
						}
					}
					if(curPerm >= 3) {
						permutations = permutations.slice(0, curPerm);
						var ret = "";
						for(i = permutations.length - 1; i >= 0; --i) {
							ret += permutations[i];
						}
						return {result: ret, expected: 296962999629};
					}
				}
			}
		}
		return {result: -1, expected: 1};
	};

	function isPermutation(num1, num2) {
		var digits = [];
		var i;
		num1 = num1[1].split("");
		num1 = num1.sort();
		num2 = num2[1].split("");
		num2 = num2.sort();
		if(num1.length != num2.length) {
			return false;
		}
		for(i = num1.length - 1; i >= 0; --i) {
			if(num1[i] !== num2[i]) {
				return false;
			}
		}
		return true;
	}
})(eulerProblems);
