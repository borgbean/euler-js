(function(eulerProblems) {
	"use strict";
	eulerProblems[4] = function() {
		var i = 999;
		var largest = 0;
		while (i >= 100) {
			var j = i;
			if (largest > i * i) break;
			while (j >= 100) {
				if (largest > i * j) break;
				var num = i * j;
				if (isPalindrome(num + "")) {
					largest = num;
					break; //there won't be any bigger ones
				}
				--j;
			}
			--i;
		}
		return { result: largest, expected: 906609 };
	};

})(eulerProblems);
