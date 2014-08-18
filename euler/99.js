(function(eulerProblems, eulerRequests) {
	"use strict";
	var coins;

	eulerRequests[99] = function() {
		return GET("euler/files/base_exp.txt");
	};

	eulerProblems[99] = function(input) {
		input = input.split("\n").map(function(x) { return x.split(","); });

		var max = 0;
		var maxLine;
		for(var i = input.length - 1; i >= 0; --i) {
			var base = input[i][0];
			var exp = input[i][1];

			var res = exp * Math.log(base);
			if(res > max) {
				max = res;
				maxLine = i;
			}
		}


		return { result: maxLine+1, expected: 709 };
	};

})(eulerProblems, eulerRequests);
