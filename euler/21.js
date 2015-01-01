(function(eulerProblems) {
	"use strict";
	var divisors_sum;
	eulerProblems[21] = function() {
		var divisor_sums = [];
		for(var i = 1; i < 10000; ++i) {
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
			if(typeof divisor_sums[sum] === 'undefined') {
				divisor_sums[sum] = [];
			}
			divisor_sums[sum].push(i);
		}

		var sum = 0;
		for(var i = 0; i < 10000; ++i) {
			if(typeof divisor_sums[i] === 'undefined') {
				continue;
			}
			for(var j = divisor_sums[i].length - 1; j >= 0; --j) {
				var num = divisor_sums[i][j];
				if(typeof divisor_sums[num] !== 'undefined') {
					var idx = divisor_sums[num].indexOf(i);
					if(idx != -1) {
						if(divisor_sums[num][idx] == num) {
							idx = divisor_sums[num].indexOf(i, idx + 1);
						}
						if(idx != -1) {
							sum += num;
						}
					}
				}
			}
		}

		return { result: sum, expected: 31626 };
	};
})(eulerProblems);
