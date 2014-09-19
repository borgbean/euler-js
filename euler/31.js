(function(eulerProblems) {
	"use strict";
	var coins;
	eulerProblems[31] = function() {
		coins = [1, 2, 5, 10, 20, 50, 100];
		var ways = 1;

		ways += ways_to_get(200, 0);
		return { result: ways, expected: 73682 };
	};

	function ways_to_get(amount, first_coin) {
		var coin_size = coins[first_coin];
		var ways = 0;

		if((amount % coin_size) === 0) {
			++ways;
		}

		if(first_coin+1 === coins.length || amount < coins[first_coin + 1]) return ways;

		var i = coins[first_coin + 1] + ((amount - coins[first_coin + 1]) % coin_size);

		while(i <= amount) {
			ways += ways_to_get(i, first_coin + 1);
			i += coin_size;
		}

		return ways;
	}
})(eulerProblems);
