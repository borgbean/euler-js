(function(eulerProblems) {
	"use strict";
	var ans;
	eulerProblems[52] = function() {
		for(var i = 1;; ++i) {
			if(Math.ceil(log10(i*6)) !== Math.ceil(log10(i))) {
				i = 6 * i;
				continue;
			}
			var digits = i.toString().split("").sort();
			var found = true;
			for(var j = 6; j >= 2; --j) {
				var newDigits = i * j;
				newDigits = newDigits.toString().split("").sort();
				for(var idx = newDigits.length - 1; idx >= 0; --idx) {
					if(digits[idx] !== newDigits[idx]) {
						found = false; break;
					}
				}
				if(!found) {
					break;
				}
			}
			if(found) {
				ans = i;
				break;
			}
		}

		return { result: ans, expected: 142857 };
	};

	var log10_ = Math.log(10);
	function log10(num) {
		return Math.log(num) / log10_;
	}
})(eulerProblems);
