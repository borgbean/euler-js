(function(eulerProblems) {
	"use strict";
	eulerProblems[206] = function() {
		//ends in zero, and it's a number multiplied by itself -> ends in 00
		//chopping off last two numbers, the number ends in an odd number (exclude even)

		var max = Math.floor(Math.sqrt(19293949596979899));
		var floor = max/10;

		floor = silentBigInteger(floor);
		for(var i = silentBigInteger((max | 1) - 2); i.compareAbs(i, floor) > -1; i=i.add(-2)) {
			if(checkCorrect(i.multiply(i))) {
				break;
			}
		}

		return {result: 10*parseInt(i.toString(), 10), expected: 1389019170};
	};

	function checkCorrect(num) {
		num = num.toString().split("");
		for(var i = num.length - 1; i >= 0; i -= 2) {
			if(num[i] - 1 !== Math.floor(i / 2)) {
				return false;
			}
		}
		return true;
	}
})(eulerProblems);
