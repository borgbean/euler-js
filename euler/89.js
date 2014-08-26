(function(eulerProblems) {
	"use strict";

	eulerRequests[89] = function() {
		return GET("euler/files/p089_roman.txt");
	};

	eulerProblems[89] = function(input) { //test diff in local/non local numerals/values
		var numerals = [1, 5, 10, 50, 100, 500, 1000];
		var numeralVals = [];

		var i = 0;
		numeralVals['I'] = numerals[i++];
		numeralVals['V'] = numerals[i++];
		numeralVals['X'] = numerals[i++];
		numeralVals['L'] = numerals[i++];
		numeralVals['C'] = numerals[i++];
		numeralVals['D'] = numerals[i++];
		numeralVals['M'] = numerals[i++];

		var sum = 0;
		input = input.trim().split("\n");
		var max = input.length;
		for(i = 0; i < max; ++i) {
			var curInput = input[i];
			var value = readValue(numeralVals, curInput);
			var out = writeValue(numerals, value);
			sum += curInput.length - out.length;
			log(value + " : " + out);
			log(curInput.length - out.length);
		}

		return { result: sum, expected: 743 };
	};

	function readValue(numeralVals, input) {
		var maxSoFar = 0;
		var result = 0;
		for(var i = input.length - 1; i >= 0; --i) {
			var curVal = numeralVals[input[i]];
			if(curVal >= maxSoFar) {
				maxSoFar = curVal;
				result += curVal;
			} else {
				result -= curVal;
			}
		}
		return result;
	}

	function findSub(numerals, numeral, input, output) {
		var inNumeral = numerals[numeral];
		if((inNumeral/10) > numerals[numeral-1]) {
			return false;
		}
		input -= inNumeral;

		--numeral;
		if(input >= 0) {
			output.push(inNumeral);
			return input;
		}
		while(numeral >= 0 && ((Math.log(numerals[numeral]) / Math.log(10)) % 1) !== 0) {
			--numeral;
		}
		var sub = numerals[numeral];
		if(numeral < 0 || (sub + input) < 0 || (inNumeral/10) > numerals[numeral]) {
			return false;
		}
		output.push(sub, inNumeral);
		return input + sub;
	}

	function writeValue(numerals, input) {
		var output = [];
		for(var i = numerals.length - 1; i >= 0; --i) {
			while(true) {
				var result = findSub(numerals, i, input, output);
				if(result !== false) {
					input = result;
					if(input === 0) {
						return output;
					}
				} else {
					break;
				}
			}
		}
	}
})(eulerProblems);
