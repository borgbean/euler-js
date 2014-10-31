(function(eulerProblems) {
	"use strict";

	eulerProblems[87] = function(input) {
		var max = 5e7;
		var primes = sieve(Math.sqrt(max)|0);
		var numPrimes = primes.length;
		var numbers = [];
		var numberCnt = 0;

		var primeSet = [0, 0, 0];
		do {
			var sum = 0;
			for(var i = 0; i < 3; ++i) {
				sum += Math.pow(primes[primeSet[i]], 4 - i);
			}

			if(!numbers[sum] && sum < max) {
				numbers[sum] = true;
				++numberCnt;
			}
		} while(incNum(primeSet, numPrimes, sum >= max));

		return { result: numberCnt, expected: 1097343 };
	};

	/**
	 * Increment a number stored as an array of digits
	 * @param  {array} 	  num       the array
	 * @param  {int}		  maxDigit  the base
	 * @param  {bool}		  tooBig    true if we need to start switching the next number (since the current digits are too large)
	 */
	function incNum(num, maxDigit, tooBig, _lastDigit) {
		if(_lastDigit === undefined) {
			_lastDigit = num.length - 1;
		}
		if(tooBig) {
			var reset = false;
			for(var i = _lastDigit; i >= 0; --i) {
				if(num[i] !== 0) {
					num[i] = 0;
					reset = true;

					return incNum(num, maxDigit, false, i - 1);
				}
			}
			return false;
		} else {
			for(var i = _lastDigit; i >= 0; --i) {
				if(num[i] === maxDigit) {
					num[i] = 0;
				} else {
					++num[i];
					break;
				}
			}
			if(i < 0 && num[0] === 0) {
				return false;
			}
			return true;
		}
	}

})(eulerProblems);
