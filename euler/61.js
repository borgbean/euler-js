(function(eulerProblems) {
	"use strict";
	var figurateValues;
	var answer;
	eulerProblems[61] = function() {
		var figurateFunctions = [
		//triangle
			function(n) {
				return (n*n + n) / 2;
			},
		//square
			function(n) {
				return n*n;
			},
		//pentagonal
			function(n) {
				return (3*n*n - n) / 2;
			},
		//hexagonal
			function(n) {
				return 2*n*n - n;
			},
		//hexptagonal
			function(n) {
				return (5*n*n - 3*n) / 2;
			},
		//octagonal
			function(n) {
				return 3*n*n - 2*n;
			}];

		figurateValues = [];
		for(var i = figurateFunctions.length - 1; i >= 0; --i) {
			var curFigurateValues = [];
			var n = 0;
			while(figurateFunctions[i](++n) < 1010) {
				continue;
			}
			while(figurateFunctions[i](++n) < 10000) {
				curFigurateValues.push(figurateFunctions[i](n));
			}
			figurateValues.push(curFigurateValues);
		}

		answer = new Array(6);
		findFigurateSet(null);
		return { result: answer.reduce(function(x,y) { return x+y;}), expected: 28684 };
	};

	function findFigurateSet(lastNum, firstNum) {
		var didSomething = false;
		for(var i = 0, max=answer.length; i < max; ++i) {
			if(answer[i]) {
				continue;
			}
			didSomething = true;
			var firstDigits = lastNum % 100;
			var curFigurateValues = figurateValues[i];
			var fig = 0;
			var curMax = curFigurateValues.length;
			while(lastNum !== null && fig < curMax && Math.floor(curFigurateValues[++fig]/ 100) < firstDigits) {
				continue;
			}
			for(; fig < curMax && (lastNum === null || Math.floor(curFigurateValues[fig]/ 100) === firstDigits); ++fig) {
				var figValue = curFigurateValues[fig];
				if(answer.indexOf(figValue) !== -1) {
					continue;
				}
				if(lastNum === null) {
					firstNum = figValue;
				}
				answer[i] = figValue;
				if(findFigurateSet(figValue, firstNum)) {
					return true;
				}
			}
			answer[i] = false;
		}
		if(!didSomething && (Math.floor(firstNum/100) === (lastNum % 100))) {
			return true;
		}
		return false;
	}

})(eulerProblems);
