(function(eulerProblems) {
	"use strict";

	var facts;
	var digitFacts;
	eulerProblems[74] = function() {
		facts = [];
		digitFacts = [];
		for(var i = 0; i < 10; ++i) {
			digitFacts[i] = fact(i);
		}

		var arr = [0,0,0,0,0,0,0,0,0,0];
		var count = 0;
		for(var i = 1; i < 1e6; ++i) {
			var length = 0;
			var newFacts = [];
			var next = digitCountReuse(i, arr);
			var nextDigits = compactDigitCount(next);

			while(true) {
				if(typeof facts[nextDigits] !== 'undefined') {
					length += facts[nextDigits];
					_fillInFacts(newFacts, length);
					if(length === 60) {
						++count;
					}
					break;
				}
				if(newFacts.indexOf(nextDigits) !== -1) {
					if(length === 60) {
						++count;
					}
					_fillInFacts(newFacts, newFacts.length);
					break;
				}
				++length;
				newFacts.push(nextDigits);
				next = digitCountReuse(digitFact(next), next);
				nextDigits = compactDigitCount(next);
			}
		}

		return { result: count, expected: 402 };
	};

	function digitCountReuse(num, dig) {
		for(var i = 0; i < 10; ++i) {
			dig[i] = 0;
		}
		while(num > 0) {
			++dig[num % 10];
			num = (num / 10) | 0;
		}
		return dig;
	} 

	function compactDigitCount(dig) {
		var order = 1;

		var newNum = 0;
		for(var i = 0; i < 10; ++i) {
			newNum += order * dig[i];
			order *= 10;
		}
		return newNum;
	} 

	function digitFact(num) {
		var sum = 0;
		for(var i = 0; i < 10; ++i) {
			sum += digitFacts[i] * num[i];
		}
		return sum;
	}

	function fact(num) {
		var product = 1;
		while(num > 1) {
			product *= num--;
		}
		return product;
	}

	function _fillInFacts(newFacts, length) {
		var len = newFacts.length;
		var addLen = length - len;
		for(var newFact = 0; newFact < len; ++newFact) {
			facts[newFacts[newFact]] = addLen + len - newFact;
		}
	}

})(eulerProblems);
