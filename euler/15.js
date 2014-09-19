(function(eulerProblems) {
	"use strict";
	var rows;
	var cols;
	var memoized_routes;
	eulerProblems[15] = function() {
		rows = 20;
		cols = 20;
		memoized_routes = new Array(rows + 1);
		for(var i = 0; i < rows + 1; ++i) {
			memoized_routes[i] = new Array(cols + 1);
			for(var j = 0; j < cols + 1; ++j) {
				memoized_routes[i][j] = -1;
			}
		}

		return { result: find_routes(0, 0), expected: 137846528820 };
	};

	function find_routes(row, col) {
		if(row == rows && col == cols) {
			return 1;
		}
		if(row > rows) {
			return 0;
		}
		if(col > cols) {
			return 0;
		}
		if(memoized_routes[row][col] != -1) {
			return memoized_routes[row][col];
		}

		var routes = find_routes(row, col + 1) + find_routes(row + 1, col);
		memoized_routes[row][col] = routes;
		return routes;
	}
})(eulerProblems);
