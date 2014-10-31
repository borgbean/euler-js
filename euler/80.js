(function(eulerProblems) {
	"use strict";

	eulerProblems[80] = function(input) {
		var sum = 0;
		var j = 1;
		for(var i = 1; i <= 100; ++i) {
			var approx = Math.sqrt(i);
			if(approx === (approx|0)) {
				continue;
			}

			var result = sqrt(i, 100);
			for(var j = 0; j < 100; ++j) {
				sum += parseInt(result[j], 10);
			}
		}

		return { result: sum, expected: 40886 };
	};

	function sqrt(n, digits) {
		var a = silentBigInteger(n*5);
		var b = silentBigInteger(5);
		var bLen = 1;
		var aLen = 2;
		while(true) {
			if(a.compare(b) > -1) {
				a = a.subtract(b);
				if(bLen < 8 || b._d[0] < 1e8) {
					//don't create new object if not necessary (.add creates a new bigint)
					b._d[0] += 10
				} else {
					b = b.add(10);
				}
			} else {
				if(aLen < 9 && a._d[0] < 1e7) {
					a._d[0] *= 100;
				} else {
					a = a.multiply(100);
				}
				if(bLen < 8 && b._d[0] < 1e8) {
					b._d[0] = b._d[0]*10 - 45;
				} else {
					b = b.multiply(10);
					b = b.subtract(45);  // - 50 + 5
				}
				aLen += 2;
				bLen += 1.5;
			}

			 if(bLen >= digits) {
			 	var digitGroups = b._d;
			 	var length = 0;
			 	for(var i = 0, max = digitGroups.length; i < max; ++i) {
			 		length += decimalLength(digitGroups[i]);
			 	}
				if(length >= (digits+2)) {
					var result = b.toString();
					return result.slice(0, result.length-2);
				}
			}
		}
	}


	var l10 = Math.log(10);
	function decimalLength(x) {
		if (x < 100000) {
				if (x < 10) return 1;
				else if (x < 100) return 2;
				else if (x < 1000) return 3;
				else if (x < 10000) return 4;
				else return 5;
			} else {
				if (x < 1000000) return 6;
				else if (x < 10000000) return 7;
				else if (x < 100000000) return 8;
				else if (x < 1000000000) return 9; 
				else return ((Math.log(x)/l10)|0) + 1;
			}
	}

})(eulerProblems);
