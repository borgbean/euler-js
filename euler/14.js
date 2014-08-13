(function(eulerProblems) {
	"use strict";
	eulerProblems[14] = function() {
		var memoized_results = new Array(50000); // list of results
		var i;
		for(i = memoized_results.length - 1; i >= 0; --i) {
			memoized_results[i] = false;
		}
		var max = [0, 0]; // max length, number that produced it
		for(i = 13; i < 1000*1000; ++i) {
			var num = i;
			var len = 0;
			var to_save = [];
			while(num > 1) {
				++len;
				var old_num = num;
				if(num < memoized_results.length) {
					if(memoized_results[num] >= 0) {
						len += memoized_results[num];
						break;
					} else {
						to_save.push([num, len]);
					}
				}
				if(num & 1) { // odd
					num = 3 * num + 1;
				} else {
					num = num / 2;
				}
			}
			if(to_save.length > 0) {
				for(var j = to_save.length - 1; j >= 0; --j) {
					memoized_results[to_save[j][0]] = len - to_save[j][1];
				}
			}
			if(len > max[0]) {
				max[0] = len;
				max[1] = i;
			}
		}
		return { result: max[1], expected: 837799 };
	};
})(eulerProblems);
