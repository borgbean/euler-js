(function(eulerProblems) {
	"use strict";
	eulerProblems[36] = function() {
		var results = [];
		var mid = '';
		var num = 999;
		while(mid === '' || mid < 10) {
			while(num > 0) {
				var numRev = num.toString().split("");
				numRev = numRev.reverse();
				numRev = num.toString() + mid + numRev.join("");
				numRev = parseInt(numRev, 10);
				if((numRev & 1) === 0) {
					--num;
					continue;
				}
				var bin = numRev.toString(2);

				if(!isPalindrome(bin)) {
					num -= 1;
					continue;
				}
				if(numRev < 1e6)
				results.push(numRev);
				--num;
			}
			if(mid === '') {
				mid = -1;
			}
			++mid;
			num = 99;
		}

		var sum = 25; // single digit palindrome sum = 25.
		for(var i = results.length - 1; i >= 0; --i) {
			sum += results[i];
		}

		return {result: sum, expected: 872187};
	};
})(eulerProblems);
