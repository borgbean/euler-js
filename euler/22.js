(function(eulerProblems, eulerRequests) {
	"use strict";

	eulerRequests[22] = function() {
		return GET("euler/files/names.txt");
	};

	eulerProblems[22] = function(input) {
		input = JSON.parse(input).names.sort();
		var total_sum = 0;
		var a_ord = "A".charCodeAt(0) - 1; //(so that a - this == 1)
		for(var i = input.length - 1; i >= 0; --i) {
			var name = input[i];
			var sum = 0;
			for(var j = name.length - 1; j >= 0; --j) {
				sum += name.charCodeAt(j) - a_ord;
			}
			total_sum += sum * (i+1);
		}
		return { result: total_sum, expected: 871198282 };
	};
})(eulerProblems, eulerRequests);
