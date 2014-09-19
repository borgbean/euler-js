(function(eulerProblems) {
	"use strict";
	var primes, primesOrig;
	var primesOrigLength;
	var primesLength;
	var longest;
	var targetLength = 5;
	eulerProblems[60] = function() {

		primesOrig = sieve_unaltered(10000);
		primes = sieve_from_unaltered(primesOrig);
		primesOrigLength = primesOrig.length;
		primesLength = primes.length;

		var longest = getNextValidPrime([], 0);

		return { result: longest.reduce(function(x,y){return x+y;}), expected: 26033 };
	};

	function canAddToPrimes(curPrimes, newPrime) {
		var ord = order(newPrime);
		for(var i = curPrimes.length - 1; i >= 0; --i) {
			if(!concatenatable(ord, newPrime, curPrimes[i])) {
				return false;
			}
		}
		return true;
	}


	function getNextValidPrime(curPrimes, primeIdx) {
		for(; primeIdx < primesLength; ++primeIdx) {
			var curPrime = primes[primeIdx];
			if(!canAddToPrimes(curPrimes, primes[primeIdx])) {
				continue;
			}

			var curPrimesCopy = curPrimes.slice(0);
			curPrimesCopy.push(curPrime);
			var ret = getNextValidPrime(curPrimesCopy, primeIdx + 1);
			if(ret) {
				return ret;
			}
			if(curPrimesCopy.length >= targetLength) {
				return curPrimesCopy;
			}
			if((curPrimes.length + (primesLength - primeIdx)) < targetLength) return false;
		}
		return false;
	}

	function concatenatable(num1Order, num1, num2) {
		var concat = num1Order*num2 + num1;
		if(!isBigPrime(concat)) {
			return false;
		}
		var num2Order = order(num2);
		concat = num2Order*num1 + num2;
		if(!isBigPrime(concat)) {
			return false;
		}
		return true;
	}

	var l10 = Math.log(10);

	function order(num) {
		var pow = Math.ceil(Math.log(num)/l10);
		var result = 1;
		var base = 10;
		while (pow) {
			if (pow & 1) {
				result *= base;
			}
			pow = Math.floor(pow / 2);
			base *= base;
		}

		return result;
	}

	function isBigPrime(num) {
		if(num === 2) {
			return true;
		}
		if((num & 1) === 0) {
			return false;
		}

		var half = Math.floor(num/2);
		if(primesOrigLength > half) {
			return primesOrig[half];
		}
		var sqrt = Math.sqrt(num);
		for(var i = 0, max = primesLength; i < max && primes[i] <= sqrt; ++i) {
			if((num % primes[i]) === 0) {
				return false;
			}
		}
		return true;
	}
})(eulerProblems);
