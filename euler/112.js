(function(eulerProblems) {
	"use strict";
	eulerProblems[112] = function() {
		var bouncyNumbers = 0;
		var curNum = [1, 0, 0];
		var num = 100;

		while(1) {
			++num;
			incNum(curNum);

			var isDecreasing = true;
			var isIncreasing = true;
			for(var i = 0, max = curNum.length; i < max; ++i) {
				if(i > 0) {
					if(curNum[i] < curNum[i-1]) {
						isIncreasing = false;
						if(!isDecreasing) {
							break;
						}
					}
				}
				if(i < (max-1)) {
					if(curNum[i] < curNum[i+1]) {
						isDecreasing = false;
						if(!isIncreasing) {
							break;
						}
					}
				}
			}

			var isBouncy = !isDecreasing && !isIncreasing;

			if(isBouncy) {
				++bouncyNumbers;
				if((bouncyNumbers / num) === 9.99) {
					break;
				}
			}
		}
		
		return { result: num, expected: 1587000 };
	};

	function incNum(num) {
		for(var i = num.length - 1; i >= 0; --i) {
			if(num[i] === 9) {
				num[i] = 0;
			} else {
				++num[i];
				break;
			}
		}
		if(i < 0 && num[0] === 0) {
			num.unshift(1);
		}
	}
})(eulerProblems);
