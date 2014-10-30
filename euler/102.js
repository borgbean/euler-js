(function(eulerProblems, eulerRequests) {
	"use strict";


	eulerRequests[102] = function() {
		return GET("euler/files/p102_triangles.txt");
	};

	//I'm lazy, so the math is blatantly stolen from http://www.blackpawn.com/texts/pointinpoly/.
	eulerProblems[102] = function(input) {
		var count = 0;

		var triangles = input.split(/[\r\n]/).map(function(line) { return line.split(',').map(Number); });


		for(var i = 0, max = triangles.length; i < max; ++i) {
			var triangle = triangles[i];
			var a = triangle.slice(0, 2);
			var b = triangle.slice(2, 4);
			var c = triangle.slice(4, 6);

			var v0 = vectorBetween(c, a);
			var v1 = vectorBetween(b, a);
			var v2 = vectorBetween([0, 0], a);

			var dot00 = dotProd(v0, v0);
			var dot01 = dotProd(v0, v1);
			var dot02 = dotProd(v0, v2);
			var dot11 = dotProd(v1, v1);
			var dot12 = dotProd(v1, v2);

			var invDenom = 1 / (dot00 * dot11 - dot01 * dot01);
			var u = (dot11 * dot02 - dot01 * dot12) * invDenom
			var v = (dot00 * dot12 - dot01 * dot02) * invDenom

			var inside = (u >= 0) && (v >= 0) && (u + v < 1);

			count += inside;
		}

		return { result: count, expected: 228 };
	};

	function vectorBetween(v0, v1) {
		return [v1[0] - v0[0], v1[1] - v0[1]];
	}

	function dotProd(v0, v1) {
		return v0[0]*v1[0] + v0[1]*v1[1];
	}

})(eulerProblems, eulerRequests);
