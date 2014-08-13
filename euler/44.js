(function(eulerProblems) {
	"use strict";
	eulerProblems[44] = function() {
		var i = 1;
		var minDiff = null;
		var pen2 = 1;
		while(++i) {
			var lastPen = pen2;
			pen2 = pen(i);
			if(minDiff !== null && (pen2 - lastPen) > minDiff) {
				break;
			}

			var pen1 = lastPen;
			for(var j = i - 1; j > 0; --j) {
				var difference = pen2 - pen1;
				if(minDiff !== null && difference > minDiff) {
					break;
				}
				var sum = pen2 + pen1;
				pen1 = pen(j);
				if(!isPentagonal(difference)) {
					continue;
				}
				if(!isPentagonal(sum)) {
					continue;
				}
				if(minDiff === null || difference < minDiff) {
					minDiff = difference;
					break;
				}
			}
		}
		return {result:minDiff, expected: 5482660};
	};

	function isPentagonal(num) {
		return (((1 + Math.sqrt(1 + 24*num))/6 % 1)) === 0;
	}

	function pen(i) {
		return (i*(3*i - 1))/2;
	}
})(eulerProblems);
