(function(eulerProblems) {
	"use strict";
	eulerProblems[2] = function() {
		var fib = [1, 2];
		var sum = 0;
		while(fib[0] < 4*1000*1000) {
			if((fib[0] & 1) === 0) {
				sum += fib[0];
			}
			var temp = fib[0] + fib[1];
			fib[0] = fib[1];
			fib[1] = temp;
		}

		return { result: sum, expected: 4613732 };
	};
})(eulerProblems);
