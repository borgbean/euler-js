(function(eulerProblems) {
	"use strict";
	eulerProblems[45] = function() {
		var i = 143;
		var num;
		while(++i) {
			num = hex(i);
			if(!isPentagonal(num) || !isTriangle(num)) {
				continue;
			}

			break;
		}
		return {result:num, expected: 1533776805};
	};

	function isTriangle(num) {
		return ((0.5 + Math.sqrt(0.25 + 2*num)) % 1) === 0;
	}

	function isPentagonal(num) {
		return (((1 + Math.sqrt(1 + 24*num))/6 % 1)) === 0;
	}

	function hex(i) {
		return i*2*i - i;
	}
})(eulerProblems);
