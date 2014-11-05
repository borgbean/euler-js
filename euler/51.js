(function(eulerProblems) {
	"use strict";
	var primes;
	var primeValues;
	eulerProblems[51] = function() {
		primes = sieve_unaltered(1e6);
		primeValues = sieve_from_unaltered(primes);
		var max = primeValues.length;
		var prime;

		var num = 10;
		while(++num < max) {
			prime = primeDigitReplacements(primeValues[num]);
			if(prime) {
				break;
			}
		}

		return { result: prime, expected: 121313 };
	};

	function primeDigitReplacements(num) {
		var digits = num.toString().split("");
		var len = digits.length;

		var max = Math.pow(2, len);
		for(var replaceDigits = 1; replaceDigits < max; ++replaceDigits) {
			if((replaceDigits & 1) !== 1 && (num & 1) === 0) {
				continue;
			}
			var prime = replacePrimeDigits(num, len, replaceDigits);
			if(prime) {
				return prime;
			}


		}
		return null;
	}

	function replacePrimeDigits(num, numLen, replaceDigits) {
		var primeCnt = 0;
		var minPrime = 0;
		var addMe = [];

		var newNum = 0;
		var oldReplace = replaceDigits;
		var order = 1;
		for(var j = 0; j < numLen; ++j) {
			if((replaceDigits & 1) === 0) {
				newNum += (num % 10) * order;
			} else {
				addMe.push(order);
			}
			replaceDigits = replaceDigits >> 1;
			num = Math.floor(num/10);
			order *= 10;
		}
		if((oldReplace >> (numLen-1)) !== 1) {
			if(old_isPrime(primes, newNum)) {
				if(!minPrime || newNum < minPrime) {
					minPrime = newNum;
				}
				++primeCnt;
			}
		}
		replaceDigits = oldReplace;

		var addMeLen = addMe.length;

		for(var i = 1; i < 10; ++i) {
			if((i - primeCnt) > 2) {
				break;
			}

			for(var j = 0; j < addMeLen; ++j) {
				newNum += addMe[j];
			}
			if(old_isPrime(primes, newNum)) {
				if(!minPrime || newNum < minPrime) {
					minPrime = newNum;
				}
				++primeCnt;
			}
		}
		if(primeCnt >= 8) {
			return minPrime;
		}
		return null;
	}
})(eulerProblems);
