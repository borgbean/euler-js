(function(eulerProblems) {
	"use strict";
	eulerProblems[97] = function() {
		var order = 1e10;

		var base = 2;
		var pow = 7830457;
		var result = 1;

		while(pow) {
			if(pow & 1) {
				result = (result * base) % order;
			}
			pow >>= 1;
			base = (base * base) % order;
		}

		result = (result * 28433) % order;
		result += 1;



		return {result: result % order, expected: 8739992577};
	};

})(eulerProblems);
