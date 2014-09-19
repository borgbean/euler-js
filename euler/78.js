(function(eulerProblems) {
	"use strict";

	eulerProblems[78] = function() {
		var ans;
		var partitions = [1];
		var pentagonals = new Array(5000);
		for(var i = 0; i < 5000; ++i) {
			pentagonals[i] = pen(((i & 1) ? -1 : 1) * ((i >> 1) + 1))
		}
		for(var num = 1;; ++num) {
			var sum = 0;
			var lastPart;
			var cnt = 0;
			while((lastPart = num - pentagonals[cnt]) > -1) {
				var sign = ((cnt & 3) > 1) ? -1 : 1;
				sum += sign*partitions[lastPart];
				++cnt;
			}
			sum = sum  % 1e6;
			if(sum === 0) {
				ans = num;
				break;
			}
			partitions.push(sum);
		}

		return { result: ans, expected: 55374 };
	};


	function pen(n) {
		return (3 * n*n - n) >> 1;
	}

})(eulerProblems);
