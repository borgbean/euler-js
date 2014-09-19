(function() {
	"use strict";
	eulerProblems[197] = function() {
		var num = -1;
		for(var i = 0; i < 1000; ++i) {
			num = term(num);
		}
		num += term(num, i+1);

		return {result: Math.round(num * Math.pow(10,9))/Math.pow(10, 9), expected: 1.710637717};
	};

	function term(num) {
		return Math.floor(Math.pow(2, 30.403243784 - (num * num))) * Math.pow(10, -9);
	}
})(eulerProblems);
