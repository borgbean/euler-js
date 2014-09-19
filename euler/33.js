(function(eulerProblems) {
	"use strict";
	eulerProblems[33] = function() {
		var results = [];
		var num, denom;
		denom = 11;
		while(denom < 100) {
			var denomDigits = getDigits(denom);
			num = 11;
			while(num < 100 && num < denom) {
				var frac = num / denom;
				var numDigits = getDigits(num);
				var found = false;
				for(var i = 0; !found && i < 2; ++i) {
					for(var j = 0; j < 2; ++j) {
						if(numDigits[j] === denomDigits[i] && numDigits[1 ^ j] / denomDigits[1 ^ i] === frac) {
							found = true;
							results.push([num, denom]);
							break;
						}
					}
				}

				++num;
				if(num % 10 === 0) {
					++num;
				}
			}
			++denom;
			if(denom % 10 === 0) {
				++denom;
			}
		}

		num = 1;
		denom = 1;
		for(var i = results.length - 1; i >= 0; --i) {
			num *= results[i][0];
			denom *= results[i][1];
		}

		var divisor = gcd(num, denom);

		return {result: denom / divisor, expected: 100};
	};

	function gcd(a, b) {
		var t;
		while(b !== 0) {
			t = b;
			b = a % b;
			a = t;
		}
		return a;
	}

	function getDigits(num) {
		return [Math.floor(num / 10), num % 10];
	}
})(eulerProblems);
