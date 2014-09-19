(function(eulerProblems) {
	"use strict";
	eulerProblems[1] = function() {
		var i = 0;
		var add_rotation = [3, 2, 1, 3, 1, 2, 3];
		var add_rotation_pos = 0;
		var sum = 0;

		i += add_rotation[add_rotation_pos++];
		while(i < 1000) {
			sum += i;
			i += add_rotation[(add_rotation_pos++) % add_rotation.length];
		}

		return { result: sum, expected: 233168 };
	};
})(eulerProblems);
