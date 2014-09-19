(function(eulerProblems) {
	"use strict";
	eulerProblems[38] = function() {
		var numProducts = 2;
		var num = (9 - (Math.log(fact(numProducts))/Math.log(10))) /numProducts;
		num = Math.floor(Math.pow(10, num));
		var max = 0;

		while(num > 1) {
			var concat = "";
			for(var i = 1; i <= numProducts; ++i) {
				concat += num * i;
			}
			if(concat.length < 9) {
				++numProducts;
				num = (9 - (Math.log(fact(numProducts))/Math.log(10))) / numProducts;
				num = Math.floor(Math.pow(10, num));
				continue;
			}
			concat = parseInt(concat, 10);
			if(!isPandigital(concat)) {
				--num;
				continue;
			}

			var cur = concat;
			if(cur > max) {
				max = cur;
			}

			--num;
		}


		return {result: max, expected: 932718654};
	};

	function fact(num) {
		var product = 1;
		while(num > 1) {
			product *= num--;
		}
		return product;
	}
})(eulerProblems);
