(function(eulerProblems) {
	"use strict";

	eulerProblems[66] = function() {
		var n = 5;
		var max = 0, maxN = 0;
		while(++n <= 1000) {
			var b = 1;
			var a = Math.round(Math.sqrt(n * b * b));
			var k = a*a - n*b*b;
			//m*m - n is minimal
			var minimal = Math.round(Math.sqrt(n));
			var m = minimal;

			if(k === 0) {
				continue;
			}

			while(k !== 1) {
				var absK = Math.abs(k);

				// k divides a + bm
				var diff = (minimal + m) % absK;
				var lo = minimal - diff;
				var hi = lo + absK; // next one divisible by k is k more

				if(Math.abs(hi*hi - n) < Math.abs(lo*lo - n)) {
					m = hi;
				} else {
					m = lo;
				}

				var newa = (a*m + n*b) / absK;
				var newb = (a + b*m) / absK;
				var newk = (m*m - n) / k;
				var a = newa, b = newb, k = newk;
			}

			if(a > max) {
				max = a;
				maxN = n;
			}
		}



		return { result: maxN, expected: 661 };
	};

})(eulerProblems);
