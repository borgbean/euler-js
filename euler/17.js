(function(eulerProblems) {
	"use strict";
	var digits;
	var teens;
	var tens;
	var hundred;
	var orders;
	eulerProblems[17] = function() {
		digits = ["", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];
		teens = ["eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen"];
		tens = ["ten", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"];
		hundred = "hundred";
		orders = ["thousand", "million", "billion", "trillion", "quadrillion", "quintillion"];
		var sum = 0;
		for(var i = 1; i <= 1000; ++i) {
			sum += num_to_str(i).replace(/[ -]/g, "").length;
		}

		return { result: sum, expected: 21124 };
	};

	function num_to_str(num) {
		// len += hundreds(num % 1000);
		var out = "";
		var order = Math.floor(num / 1000);
		var order_cnt = 0;
		while(order >= 1) {
			if(out.length > 0) {
				out = " " + out;
			}
			var out_temp = hundreds(order % 1000);
			if(out_temp.length > 0) {
				out = out_temp + " " + orders[order_cnt] + out;
			}
			++order_cnt;
			order = Math.floor(order / 1000);
		}
		if(out.length > 0) {
			out += " ";
		}
		out += hundreds(num % 1000);
		return out;
	}

	function hundreds(num) {
		var out = "";

		//check for teens
		var teens_digits = num % 100;
		if(teens_digits < 20 && teens_digits > 10) {
			out += teens[teens_digits - 11];
		} else {
			//tens, first digit
			var tens_digit = Math.floor((num % 100) / 10);
			if(tens_digit > 0) {
				out += tens[tens_digit - 1];
			}
			if((num % 10) !== 0) {
				if(out.length >= 1) {
					out += "-";
				}
				out = out + digits[num % 10];
			}
		}
		var hundreds_digit = Math.floor(num / 100);
		if(hundreds_digit > 0) {
			if(out.length >= 1) {
				out = " and " + out;
			}
			out = digits[hundreds_digit] + " " + hundred + out;
		}
		return out;
	}
})(eulerProblems);
