(function(eulerProblems) {
	"use strict";
	eulerProblems[23] = function() {
		var abundant_numbers = [];
		for(var i = 1; i < 28123; ++i) {
			var j, max, inc;
			var sum = 1;
			max = Math.floor(Math.sqrt(i));
			if((i & 1) === 0) { //even
				j = 2;
				inc = 1;
			} else { //odd
				j = 3;
				inc = 2;
			}
			for(;j <= max; j += inc) {
				if((i % j) === 0) {
					sum += j;
					if(j * j != i) {
						sum += i / j;
					}
				}
			}
			if(sum > i) {
				abundant_numbers.push(i);
			}
		}
		var representable_numbers = new Array(28123);

		var len = abundant_numbers.length;
		var len_rep = representable_numbers.length;
		for(var i = 0; i < len; ++i) {
			for(var j = 0; j <= i; ++j) {
				var sum = abundant_numbers[i] + abundant_numbers[j];
				if(sum >= len_rep) {
					break;
				}
				representable_numbers[sum] = true;
			}
		}
		var sum = 0;
		for(var i = representable_numbers.length - 1; i >= 0; --i) {
			if(typeof representable_numbers[i] === 'undefined') {
				sum += i;
			}
		}

		return { result: sum, expected: 4179871 };
	};
})(eulerProblems);
