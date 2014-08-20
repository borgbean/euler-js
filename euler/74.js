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

		var count = 0;
		for(var i = 1; i < 1e6; ++i) {
			var length = 0;
			var newFacts = [];
			var next = i;

			while(true) {
				if(typeof facts[next] !== 'undefined') {
					length += facts[next];
					_fillInFacts(newFacts, length);
					if(length === 60) {
						++count;
					}
					break;
				}
				if(newFacts.indexOf(next) !== -1) {
					if(length === 60) {
						++count;
					}
					_fillInFacts(newFacts, newFacts.length);
					break;
				}
				++length;
				newFacts.push(next);
				next = digitFact(next.toString());
			}
		}

		return { result: count, expected: 402 };
	};

	function digitFact(num) {
		var sum = 0;
		for(var i = num.length - 1; i >= 0; --i) {
			sum += digitFacts[num[i]];
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
