(function(eulerProblems) {
	"use strict";
	eulerProblems[53] = function() {
		var count = 0;
		var n = 23;
		var r = 10;
		while(n <= 100) {
			while(combinatorial(n, --r) > 1e6);
			++r;
			var mirror = n - r;
			count += mirror + 1 - r;
			++n;
		}
		return {result: count, expected: 4075};
	};

	function combinatorial(n, r) {
		var product = 1;
		var nr = n - r;
		for(var i = n; i > r; --i) {
			product *= i / nr--;
		}
		for(; nr > 1; --nr) {
			product /= nr;
		}
		return Math.round(product);
	}
})(eulerProblems);
