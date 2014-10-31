(function(eulerProblems) {
	"use strict";

	eulerProblems[75] = function() { //45ms!!
		var perimeters = new Array(1.5e6 + 1);
		var limit = 1.5e6;

		var m = 2;
		while(1) {
			var n = 0;
			var inc = 2;
			if((m & 1) === 0) { // even
				n = -1;
			}

			var mSq = m*m;

			var tmp = n + inc;
			var a = mSq - tmp*tmp;
			var b = 2*m*tmp;
			var c = mSq + tmp*tmp;
			if((a+b+c) > 1.5e6) {
				break;
			}
			while((n += inc) < m) {
				if(gcd(n, m) !== 1) {
					continue;
				}
				a = mSq - n*n;
				b = 2*m*n;
				c = mSq + n*n;
				var perimeter = a + b + c;
				var p = perimeter;
				while(1) {
					if(perimeter > limit) {
						break;
					}
					if(perimeters[perimeter]) {
						perimeters[perimeter] = -1;
					} else {
						perimeters[perimeter] = 1;
					}
					perimeter += p;
				}
			}
			++m;
		}

		return { result: perimeters.reduce(function(a, b) { return a + (b === 1) }, 0), expected: 161667 };
	};


	function gcd(a, b) {
		while(a !== b) {
			if(a > b) {
				a = a - b;
			} else {
				b = b - a;
			}
		}
		return a;
	}

})(eulerProblems);
