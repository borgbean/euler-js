(function(eulerProblems) {
	"use strict";
	eulerProblems[104] = function() {
		var ans;
		var n = 1;
		var lastN = 0;
		var g = (1 + Math.sqrt(5)) / 2;
		var r5 = Math.sqrt(5);
		var l10 = Math.log(10);

		for(var i = 2; i < (329468+1); ++i) {
			var temp = n;

			n = (n + lastN) % 1e9;
			lastN = temp;

			if(i > 100 && isPandigital(n % 1e9)) {
				var result = i * (Math.log(g)/l10) + (Math.log(1/r5) / l10);
				result = Math.pow(10, (result % 1) + 8);
				if(isPandigital(result.toString().substring(0, 9))) {
					ans = i;
					break;
				}
			}
		}

		return {result: ans, expected: 329468};
	};

})(eulerProblems);
