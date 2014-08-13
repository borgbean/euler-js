(function(eulerProblems) {
	"use strict";
	eulerProblems[64] = function() {
		var count = 0;
		var max = 10000;
		for(var num = 2; num <= max; ++num) {
			if((Math.sqrt(num) % 1) === 0) {
				continue;
			}
			var sqrt = Math.floor(Math.sqrt(num));
			var iterations = [];
			var last = {m:0, d:1, a: sqrt};
			var length = 0;
			while(true) {
				var m = last.d*last.a - last.m;
				var d = (num - m*m) / last.d;
				var a = Math.floor((sqrt + m) / d);
				last = {m: m, d: d, a: a};

				for(var i = 0, maxI = iterations.length; i < maxI; ++i) {
					var curLast = iterations[i];
					if(last.m === curLast.m && last.d === curLast.d && last.a === curLast.a) {
						length = maxI;
						break;
					}
				}
				if(length !== 0) {
					break;
				}
				iterations.push(last);
			}
			if((length & 1) === 1) {
				++count;
			}
		}
		return { result: count, expected: 1322 };
	};
})(eulerProblems);
