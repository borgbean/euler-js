(function(eulerProblems, eulerRequests) {
	"use strict";


	eulerRequests[67] = function() {
		return GET("euler/files/triangle.txt");
	};


	var memoized_routes;
	var triangle;
	var routes_tested = 0;
	eulerProblems[67] = function(input) {
		var triangle_file = new XMLHttpRequest();
		triangle_file.ontimeout = function() {
			alert("Timed out");
		};

		triangle = input.trim();
		memoized_routes = [];
		triangle = triangle.split("\n");
		for(var i = triangle.length - 1; i >= 0; --i) {
			var split = triangle[i].split(" ");
			for(var j = split.length - 1; j >= 0; --j) {
				split[j] = parseInt(split[j], 10);
			}
			triangle[i] = split;
			memoized_routes.push(new Array(split.length));
		}

		return { result: traverse(0, 0), expected: 7273 };
	};

	function traverse(row, col) {
		if(row >= triangle.length) {
			return 0;
		}

		if(memoized_routes[row][col] != null) {
			return memoized_routes[row][col];
		}

		if(row == (triangle.length - 1)) {
			++routes_tested;
		}

		var left = traverse(row + 1, col);
		var right = traverse(row + 1, col + 1);
		memoized_routes[row][col] = Math.max(left, right) + triangle[row][col];
		return memoized_routes[row][col];
	}
})(eulerProblems, eulerRequests);
