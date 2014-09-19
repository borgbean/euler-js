(function(eulerProblems) {
	"use strict";

	var numLines = 5;
	eulerProblems[68] = function() {
		var numbers = [true, true, true, true, true, true, true, true, true, true];
		var curSolution = [1];
		var lines = [];
		for(var i = 0; i < numLines; ++i) {
			lines.push(new Array(3));
		}
		fillPosition(lines, 0, 0, numbers, curSolution, -1, 0);

		return { result: curSolution[0], expected: 6531031914842725 };
	};

	function fillPosition(lines, line, position, numbers, curSolution, solution, sum) {
		if((position === 1 && line !== 0)) {
			fillPosition(lines, line, position+1, numbers, curSolution, solution, sum + lines[line][1]);
			return;
		}
		var i;

		if(position === 2 && line === (numLines-1)) {
			sum += lines[line][2];
			if(sum !== solution) {
				return;
			}
			var digits = [];
			var minIdx = 0;
			for(i = 0; i < numLines; ++i) {
				if(lines[i][0] < lines[minIdx][0]) {
					minIdx = i;
				}
			}
			i = minIdx;
			do {
				for(var k = 0; k < 3; ++k) {
					digits.push(lines[i][k]);
				}
				if(++i >= numLines) {
					i = 0;
				}
			} while(i !== minIdx);
			digits = digits.join("");
			if(digits.length > 16) {
				return;
			}
			digits = parseInt(digits, 10);
			if(digits > curSolution[0]) {
				curSolution[0] = digits;
			}
			return;
		}

		var max = numbers.length;
		i = 0;
		if(position === 2 && line !== 0) {
			i = solution - sum - 1;
		}
		for(; i < max; ++i) {
			if(!numbers[i]) {
				continue;
			}
			lines[line][position] = i+1;
			if(position === 2 && line < numLines) {
				lines[line+1][1] = i+1;
			}
			if(solution !== -1 && (sum + i + 1) > solution) {
				break;
			}
			if(line === 0) {
				if(position === 2) {
					solution = sum + i + 1;
				} else {
					solution = Infinity;
					lines[1][1] = i + 1;
					lines[numLines - 1][2] = i + 1;
				}
			}
			if(position === 2) {
				if((sum + i + 1) !== solution) {
					continue;
				}
				numbers[i] = false;
				fillPosition(lines, line+1, 0, numbers, curSolution, solution, 0);
				numbers[i] = true;
			} else {
				numbers[i] = false;
				fillPosition(lines, line, position+1, numbers, curSolution, solution, sum + i + 1);
				numbers[i] = true;
			}
		}
	}

})(eulerProblems);
