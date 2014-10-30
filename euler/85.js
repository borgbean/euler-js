(function(eulerProblems) {
	"use strict";

	eulerProblems[85] = function(input) {

		var target = 2e6;
		var closestDiff = Infinity;
		var closestDimensions = [0, 0];

		
		//increase number of cols until we find the midpoint
		for(var cols = 1; cols < (500*1000); ++cols) {
			// rows^2 + rows - (4*1m / (cols^2 + cols)) = 0
			var leftSide = - Math.ceil((4*target) / (cols*(cols+1)));

			var rows = (-1 + Math.sqrt(1 - 4*(leftSide)))/2;

			var solution1 = rows | 0;
			var solution2 = solution1 + 1;
			solution1 = solution1 * (solution1+1) * cols * (cols+1) /4;
			solution2 = solution2 * (solution2+1) * cols * (cols+1) /4;

			var diff1 = Math.abs(target - solution1);
			var diff2 = Math.abs(target - solution2);
			if(diff1 < diff2) {
				if(diff1 < closestDiff) {
					closestDiff = diff1;
					closestDimensions = [rows|0, cols];
				}
			} else {
				if(diff2 < closestDiff) {
					closestDiff = diff2;
					closestDimensions = [(rows|0) + 1, cols];
				}
			}
		}


		return { result: closestDimensions[0] * closestDimensions[1], expected: 2772 };
	};

})(eulerProblems);
