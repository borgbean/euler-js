(function(eulerProblems) {
	"use strict";
	eulerProblems[62] = function() {
		var cubes = [];
		var target = 5;
		var answer;
		var smallestFound = null;

		for(var i = 2;;++i) {
			var cubeVal = i*i*i;
			if(smallestFound !== null && cubeVal > smallestFound[target - 1]) {
				answer = smallestFound;
				break;
			}
			var cube = cubeVal.toString().split("");
			cube = cube.sort();
			cube = cube.join("");
			if(typeof cubes[cube] !== 'undefined') {
				cubes[cube].push(i);
				if(cubes[cube].length === target) {
					if(smallestFound === null || cubes[cube][0] < smallestFound[0]) {
						smallestFound = cubes[cube];
					}
				}
			} else {
				cubes[cube] = [i];
			}
		}


		return { result: Math.pow(answer[0], 3), expected: 127035954683 };
	};

})(eulerProblems);
