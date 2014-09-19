(function(eulerProblems, eulerRequests) {
	"use strict";
	var triangleNumbers;

	eulerRequests[42] = function() {
		return GET("euler/files/words.txt");
	};

	eulerProblems[42] = function(input) {
		var count = 0;
		input = JSON.parse(input);
		var aIdx = "A".charCodeAt(0) - 1;

		triangleNumbers = [];

		for(var i = input.length - 1; i >= 0; --i) {
			var word = input[i];
			var sum = 0;
			for(var j = word.length - 1; j >= 0; --j) {
				sum += word.charCodeAt(j) - aIdx;
			}
			if(isTriangleNumber(sum)) {
				++count;
			}
		}

		return { result: count, expected: 162 };
	};

	function isTriangleNumber(num) {
		for(var i = triangleNumbers.length - 1; i >= 0; --i) {
			if(triangleNumbers[i] < num) {
				if(triangleNumbers[triangleNumbers.length - 1] < num) {
					break;
				}
				return false;
			} else if(triangleNumbers[i] == num) {
				return true;
			}
		}
		//not enough triangle numbers- get more.
		var n = triangleNumbers.length + 1;
		while(true) {
			var triangleNumber = 0.5 * n * (n + 1);
			triangleNumbers.push(triangleNumber);
			++n;
			if(triangleNumber > num) {
				return false;
			} else if(triangleNumber === num) {
				return true;
			}
		}
	}
})(eulerProblems, eulerRequests);
