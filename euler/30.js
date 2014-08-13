(function(eulerProblems) {
	"use strict";
	eulerProblems[30] = function() {
		//max 6 digits (9^5 * 6 is six digits)
		var num = Math.pow(9, 5) * 6;
		var cur_len = 6;
		var sum_occur = 0; //number of occurances
		var nums = [];
		var log10 = Math.log(10);

		while(num > 9) {
			var digits = get_digits(num);
			var sum = 0;
			for(var i = digits.length - 1; i >= 0; --i) {
				sum += Math.pow(digits[i], 5);
			}
			if(sum == num) {
				sum_occur += sum;
				nums.push(sum);
			}

			--num;
		}

		return { result: sum_occur, expected: 443839 };
	};

	function get_digits(num) {
		var num_str = num.toString();
		var digits = new Array(num_str.length);
		for(var i = num_str.length - 1; i >= 0; --i) {
			digits[i] = num_str[i];
		}
		return digits;
	}
})(eulerProblems);
