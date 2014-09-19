(function(eulerProblems) {
	"use strict";
	eulerProblems[19] = function() {
		var months = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
		var count = 0;
		//sunday = 0; it's monday
		var day_of_week = (1 + 365) % 7;
		//we're at jan 1 1901
		var year = 1901;
		var month = 0;
		while(year <= 2000) {
			if(day_of_week === 0) {
				++count;
			}

			if(month == 1) {
				if(is_leap(year)) {
					++day_of_week;
				}
			}
			day_of_week = (day_of_week + months[month]) % 7;
			//go to next month
			month = (month + 1) % 12;
			if(month === 0) {
				++year;
			}
		}

		return { result: count, expected: 171 };
	};

	function is_leap(year) {
		if((year & 3) === 0) { //divisible by 4
			if((year % 100) === 0) {
				if((year % 400) === 0) {
					return true;
				}
				return false;
			}
			return true;
		}
		return false;
	}
})(eulerProblems);
