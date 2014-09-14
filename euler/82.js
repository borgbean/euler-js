(function(eulerProblems, eulerRequests) {
	"use strict";

	eulerRequests[82] = function() {
		return GET("euler/files/p082_matrix.txt");
	};

	eulerProblems[82] = function(input) {
		var memoized_paths = [];
		input = input.trim().split('\n');
		for(var i = input.length - 1; i >= 0; --i) {
			input[i] = input[i].split(',');
			input[i] = input[i].map(function(x) {return parseInt(x, 10);});
			memoized_paths.push(new Array(input[i].length));
		}

		var ans = traverse(input, 0, 0, memoized_paths, 0, -1);

		return { result: ans, expected: 260324 };
	};

	function traverse(input, row, col, memoized_paths, costSoFar, best) {
		if(row < 0 || row >= input.length || col >= input[row].length || (best > 0 && (costSoFar + input[row][col]) >= best)) {
			return false;
		}
		if(memoized_paths[row][col] !== undefined) { 
			return memoized_paths[row][col];
		}
		
		var sum = input[row][col];
		if(row === (input.length - 1) && col === (input.length - 1)) {
			return sum;
		}
		var down = traverse(input, row+1, col, memoized_paths, costSoFar + sum, best);
		if(down !== false) {
			if(best < 0 || (down + sum + costSoFar) < best) {
				best = down + sum + costSoFar;
			}
		} else {
			down = Infinity;
		}
		var right = traverse(input, row, col+1, memoized_paths, costSoFar + sum, best);
		if(right !== false) {
			if(best < 0 || (right + sum + costSoFar) < best) {
				best = right + sum + costSoFar;
			}
		} else {
			right = Infinity;
		}
		var up = traverse(input, row-1, col, memoized_paths, costSoFar + sum, best);
		if(up !== false) {
			if(best < 0 || (up + sum + costSoFar) < best) {
				best = up + sum + costSoFar;
			}
		} else {
			up = Infinity;
		}

		var paths = [right, up, down];
		paths.sort();

		if(paths[0] === Infinity) {
			return false;
		}
		sum += paths[0];

		memoized_paths[row][col] = sum;
		return sum;
	}
})(eulerProblems, eulerRequests);
