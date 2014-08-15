// // (function(eulerProblems) {
// // 	"use strict";
// // 	eulerProblems[66] = function() {
// // 		var max = 0;
// // 		for(var d = 2; d <= 9; ++d) {
// // 			if((Math.sqrt(d) % 1) === 0) {
// // 				continue;
// // 			}
// // 			for(var x = 2;;++x) {
// // 				var y = Math.sqrt((x*x - 1) / d);
// // 				if((y % 1) === 0) {
// // 					log(d);
// // 					if(x > max) {
// // 						max = x;
// // 					}
// // 					break;
// // 				}
// // 			}
// // 		}
// // 		return { result: max, expected: 272 };
// // 	};
// // })(eulerProblems);
// (function(eulerProblems) {
// 	"use strict";
// 	eulerProblems[66] = function() {
// 		var max = 0;
// 		for(var d = 53; d <= 53; ++d) {
// 			if((Math.sqrt(d) % 1) === 0) {
// 				continue;
// 			}

// 			// x^2 - dy^2 = 1
// 			// a^2 - db^2 = k
// 			var y = 1;
// 			var a = Math.floor(Math.sqrt(d));
// 			var k = a*a - d*y*y;

// 			//m ->
// 			//	minimize |M^2 - d|
// 			//	(x + y*m) % k === 0

// 			log(k);
// 			return;
// 			while(true) {}

// 			for(var x = 2;;++x) {
// 				var y = Math.sqrt((x*x - 1) / d);
// 				if((y % 1) === 0) {
// 					log(d);
// 					if(x > max) {
// 						max = x;
// 					}
// 					break;
// 				}
// 			}
// 		}
// 		return { result: max, expected: 272 };
// 	};
// })(eulerProblems);
