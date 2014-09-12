(function(eulerProblems, eulerRequests) {
	"use strict";

	eulerRequests[81] = function() {
		return GET("euler/files/p081_matrix.txt");
	};

	eulerProblems[81] = function(input) {
		var memoized_paths = [];
		input = input.split('\n');
		for(var i = input.length - 1; i >= 0; --i) {
			input[i] = input[i].split(',');
			input[i] = input[i].map(function(x) {return parseInt(x, 10);});
			memoized_paths.push(new Array(input[i].length));
		}

		var ans = traverse(input, 0, 0, memoized_paths);

		return { result: ans, expected: 427337 };
	};

	function traverse(input, row, col, memoized_paths) {
		if(row >= input.length || col >= input[row].length) {
			return false;
		}
		if(memoized_paths[row][col] !== undefined) {
			return memoized_paths[row][col];
		}
		var sum = input[row][col];
		
		var down = traverse(input, row+1, col, memoized_paths);
		var right = traverse(input, row, col+1, memoized_paths);

		if(right !== false && (right < down || down === false)) {
			sum += right;
		} else if(down !== false) {
			sum += down;
		}
		memoized_paths[row][col] = sum;
		return sum;
	}
})(eulerProblems, eulerRequests);
