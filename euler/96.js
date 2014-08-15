(function(eulerProblems, eulerRequests) {
	"use strict";

	var width = 9;

	eulerRequests[96] = function() {
		return GET("euler/files/sudoku.txt");
	};

	eulerProblems[96] = function(input) {
		input = input.trim().split("\n");
		input.push("");
		var numLines = input.length;
		var sum = 0;
		var intParser = function(x) { return parseInt(x, 10); };
		var stuff = input.reduce(function(prev, cur, idx) {
			if(idx === 0) {
				return prev;
			}
			if((idx % 10) === 0) {
				var puzzle = solve(prev);
				sum += puzzle[0][0]*100 + puzzle[0][1]*10 + puzzle[0][2];
				return [];
			}
			prev[(idx-1) % 10] = cur.trim().split("").map(intParser);
			return prev;

		}, []);


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
				if(minIdx === null || cur.length < eliminationMatrix[minIdx[0]][minIdx[1]].length) {
					minIdx = [row, col];
				}
			}
		}


		var mat = eliminationMatrix[minIdx[0]][minIdx[1]];
		for(var idx = 1; idx <= width; ++idx) {
			if(!mat[idx]) {
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

	function verify(puzzle) {
		for(var row = 0; row < width; ++row) {
			for(var col = 0; col < width; ++col) {
				if(puzzle[row][col] === 0) {
					continue;
				}
				var number = puzzle[row][col];

				//eliminate numbers in this row
				for(var j = 0; j < width; ++j) {
					if(j !== col && puzzle[row][j] === number) {
						return false;
					}
				}
				//eliminate numbers in this column
				for(var i = 0; i < width; ++i) {
					if(i !== row && puzzle[i][col] === number) {
						return false;
					}
				}

				var rowWindow = row - (row % 3);
				var colWindow = col - (col % 3);

				//eliminate numbers in this group of 9
				for(var i = rowWindow, iMax = rowWindow+3; i < iMax; ++i) {
					for(var j = colWindow, jMax = colWindow+3; j < jMax; ++j) {
						if(!(i === row && j === col) && puzzle[i][j] === number) {
							return false;
						}
					}
				}
			}
		}
		return true;
	}

	function checkBeforeCell(puzzle, row, col) {
		var columns = puzzle[row].length;
		var rows = puzzle.length;

		var number = puzzle[row][col];

		//eliminate numbers in this row
		for(var j = 0; j < col && j < columns; ++j) {
			if(number === puzzle[row][j]) {
				return false;
			}
		}
		//eliminate numbers in this column
		for(var i = 0; i < rows && i < row; ++i) {
			if(number === puzzle[i][col]) {
				return false;
			}
		}

		var rowWindow = row - (row % 3);
		var colWindow = col - (col % 3);

		//eliminate numbers in this group of 9
		for(var i = row, iMax = row; i <= iMax; ++i) {
			for(var j = col, jMax = col+3; j < jMax && (j < col || i < row); ++j) {
				if(number === puzzle[i][j]) {
					return false;
				}
			}
		}
		return true;
	}

	function fillInBlanks(puzzle) {
		var eliminationMatrix;

		for(;;) {
			eliminationMatrix = [];
			for(var row = 0; row < width; ++row) {
				eliminationMatrix.push([]);
				for(var col = 0; col < width; ++col) {
					eliminationMatrix[row][col] = eliminate(puzzle, row, col);
				}
			}
			var didSomething = false;
			var solved = true;
			for(var row = 0; row < width; ++row) {
				for(var col = 0; col < width; ++col) {
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
								foundSomething = true;
								if(ans !== null) {
									ans = null;
									break;
								} else {
									ans = i;
								}
							}
						}
						if(ans !== null) {
							puzzle[row][col] = ans;
							didSomething = true;
							if(!checkBeforeCell(puzzle, row, col)) {
								return false;
							}
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
			return false;
		}
		var possibilities = [];
		possibilities.push(false); //0
		for(var i = 1; i <= width; ++i) {
			possibilities.push(true);
		}
		var columns = puzzle[row].length;
		var rows = puzzle.length;

		//eliminate numbers in this row
		for(var j = 0; j < columns; ++j) {
			possibilities[puzzle[row][j]] = false;
		}
		//eliminate numbers in this column
		for(var i = 0; i < rows; ++i) {
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
