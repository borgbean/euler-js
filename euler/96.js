(function(eulerProblems, eulerRequests) {
	"use strict";

	var width = 9;

	eulerRequests[96] = function() {
		return GET("euler/files/sudoku.txt");
	};

	eulerProblems[96] = function(input) {
		input = input.trim().split("\n");
		var numLines = input.length;
		var sum = 0;

		var intParser = function(x) { return parseInt(x, 10); };
		//10 lines per puzzle (ignore first line)
		for(var i = 1; i < numLines; i += 10) {
			var puzzle = [];
			for(var j = i, max = i+9; j < max; ++j) {
				puzzle.push(input[j].trim().split('').map(intParser));
			}
			var solution = solve(puzzle);
			sum += solution[0][0]*100 + solution[0][1]*10 + solution[0][2];
		}

		return {result: sum, expected: 24702};
	};

	function solve(puzzle) {
		var eliminationMatrix = fillInBlanks(puzzle);
		if(!eliminationMatrix) {
			return false;
		}
		if(eliminationMatrix === true) {
			return puzzle;
		}

		var minIdx = null;
		var done = false;
		for(var row = 0; !done && row < width; ++row) {
			for(var col = 0; col < width; ++col) {
				var cur = eliminationMatrix[row][col];
				if(cur === false) {
					continue;
				}
				cur = cur.filter(Boolean);
				if(cur.length === 2) {
					minIdx = [row, col];
					done = true;
					break;
				}
				if(cur.length > 0 && (minIdx === null || cur.length < eliminationMatrix[minIdx[0]][minIdx[1]].length)) {
					minIdx = [row, col];
				}
			}
		}


		var possibilities = eliminationMatrix[minIdx[0]][minIdx[1]];
		for(var idx = 1; idx <= width; ++idx) {
			if(!possibilities[idx]) {
				continue;
			}
			var puzzleCopy = [];
			for(var i = 0; i < width; ++i) {
				puzzleCopy[i] = puzzle[i].slice(0);
			}

			puzzleCopy[minIdx[0]][minIdx[1]] = idx;
			var result = solve(puzzleCopy);
			if(result) {
				return result;
			}
		}
	}

	function fillInBlanks(puzzle) {
		var eliminationMatrix;

		while(1) {
			eliminationMatrix = [];
			var didSomething = false;
			var solved = true;
			for(var row = 0; row < width; ++row) {
				eliminationMatrix.push([]);
				for(var col = 0; col < width; ++col) {
					eliminationMatrix[row][col] = eliminate(puzzle, row, col);
					if(puzzle[row][col] !== 0) {
						continue;
					}
					var possibilities = eliminationMatrix[row][col];
					if(possibilities) {
						solved = false;
						var foundSomething = false;
						var ans = null;
						for(var i = possibilities.length - 1; i >= 1; --i) {
							if(possibilities[i]) {
								if(foundSomething) {
									ans = null;
									break;
								} else {
									ans = i;
								}
								foundSomething = true;
							}
						}
						if(ans !== null) {
							eliminationMatrix[row][col] = false;
							puzzle[row][col] = ans;
							didSomething = true;
						}
						if(!foundSomething) {
							return false;
						}
					}
				}
			}
			if(solved) {
				return true;
			}
			if(!didSomething) {
				break;
			}
		}
		return eliminationMatrix;
	}

	function eliminate(puzzle, row, col) {
		if(puzzle[row][col] !== 0) {
			return [];
		}
		var possibilities = [];
		possibilities.push(false); //0
		for(var i = 1; i <= width; ++i) {
			possibilities.push(true);
		}

		//eliminate numbers in this row
		for(var j = 0; j < width; ++j) {
			possibilities[puzzle[row][j]] = false;
		}
		//eliminate numbers in this column
		for(var i = 0; i < width; ++i) {
			possibilities[puzzle[i][col]] = false;
		}

		row = row - (row % 3);
		col = col - (col % 3);

		//eliminate numbers in this group of 9
		for(var i = row, iMax = row+3; i < iMax; ++i) {
			for(var j = col, jMax = col+3; j < jMax; ++j) {
				possibilities[puzzle[i][j]] = false;
			}
		}

		return possibilities;
	}

})(eulerProblems, eulerRequests);
