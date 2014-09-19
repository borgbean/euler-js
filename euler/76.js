(function(eulerProblems) {
	"use strict";
	var max;
	var memoized;
	eulerProblems[76] = function() {
		max = 99;
		memoized = [];
		for(var i = 1; i <= max; ++i) {
			memoized[i] = [];
		}
		return { result: ways_to_get(100, 1), expected: 190569291 };
	};

	function ways_to_get(amount, num) {
		if(typeof memoized[num][amount] !== 'undefined') {
			return memoized[num][amount];
		}
		var ways = 0;

		if((amount % num) === 0) {
			++ways;
		}

		if(num === max || amount < (num+1)) return ways;

		var i = (num+1) + ((amount - (num+1)) % num);

		while(i <= amount) {
			ways += ways_to_get(i, num + 1);
			i += num;
		}

		memoized[num][amount] = ways;

		return ways;
	}
})(eulerProblems);
