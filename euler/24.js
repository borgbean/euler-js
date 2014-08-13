(function(eulerProblems) {
	"use strict";
	eulerProblems[24] = function() {
		var input = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
		var len = input.length;
		var permutation = 1;

		while(true) {
			var k = -1;
			for(var i = 1; i < len; ++i) {
				if(input[i - 1] < input[i]) {
					k = i - 1;
				}
			}
			if(k == -1) {
				return { result: "ran out of permutations", expected: "not running out of permutations" };
			}
			var l = -1;
			for(var i = k + 1; i < len; ++i) {
				if(input[k] < input[i]) {
					l = i;
				}
			}
			var temp = input[k];
			input[k] = input[l];
			input[l] = temp;

			reverse(input, k+1, len);

			if(++permutation == (1000*1000)) {
				break;
			}
		}

		return { result: parseInt(input.join(""), 10), expected: 2783915460 };
	};

	function reverse(sequence, start, end) {
		var temp;
		for(var i = start, j = end - 1; i < j; ++i, --j) {
			temp = sequence[i];
			sequence[i] = sequence[j];
			sequence[j] = temp;
		}
	}
})(eulerProblems);
