(function(eulerProblems) {
	"use strict";
	eulerProblems[11] = function() {
		var lines = "08 02 22 97 38 15 00 40 00 75 04 05 07 78 52 12 50 77 91 08\n49 49 99 40 17 81 18 57 60 87 17 40 98 43 69 48 04 56 62 00\n81 49 31 73 55 79 14 29 93 71 40 67 53 88 30 03 49 13 36 65\n52 70 95 23 04 60 11 42 69 24 68 56 01 32 56 71 37 02 36 91\n22 31 16 71 51 67 63 89 41 92 36 54 22 40 40 28 66 33 13 80\n24 47 32 60 99 03 45 02 44 75 33 53 78 36 84 20 35 17 12 50\n32 98 81 28 64 23 67 10 26 38 40 67 59 54 70 66 18 38 64 70\n67 26 20 68 02 62 12 20 95 63 94 39 63 08 40 91 66 49 94 21\n24 55 58 05 66 73 99 26 97 17 78 78 96 83 14 88 34 89 63 72\n21 36 23 09 75 00 76 44 20 45 35 14 00 61 33 97 34 31 33 95\n78 17 53 28 22 75 31 67 15 94 03 80 04 62 16 14 09 53 56 92\n16 39 05 42 96 35 31 47 55 58 88 24 00 17 54 24 36 29 85 57\n86 56 00 48 35 71 89 07 05 44 44 37 44 60 21 58 51 54 17 58\n19 80 81 68 05 94 47 69 28 73 92 13 86 52 17 77 04 89 55 40\n04 52 08 83 97 35 99 16 07 97 57 32 16 26 26 79 33 27 98 66\n88 36 68 87 57 62 20 72 03 46 33 67 46 55 12 32 63 93 53 69\n04 42 16 73 38 25 39 11 24 94 72 18 08 46 29 32 40 62 76 36\n20 69 36 41 72 30 23 88 34 62 99 69 82 67 59 85 74 04 36 16\n20 73 35 29 78 31 90 01 74 31 49 71 48 86 81 16 23 57 05 54\n01 70 54 71 83 51 54 69 16 92 33 48 61 43 52 01 89 19 67 48";

		lines = lines.split("\n");
		for (var i = lines.length - 1; i >= 0; --i) {
			lines[i] = lines[i].split(" ");
		}

		var runLength = 4;
		var maxProduct = 1;

		//do horizontal
		for(var i = 0; i < lines.length; ++i) {
			var product = 1;
			var zeroes = 0;
			for(var j = 0; j < 4; ++j) {
				var num = parseInt(lines[i][j], 10);
				if(num === 0) {
					++zeroes;
				} else {
					product *= num;
				}
			}

			for(var j = 4; j < lines[i].length; ++j) {
				if(zeroes === 0 && product > maxProduct) {
					/*var ans = "";
					for(var k = j-1; k > (j - 5); --k) {
						ans += lines[i][k] + " ";
					}
					log(ans);*/
					maxProduct = product;
				}
				var num = parseInt(lines[i][j], 10);
				var oldNum = parseInt(lines[i][j - 4], 10);
				if(oldNum === 0) {
					--zeroes;
				} else {
					product /= oldNum;
				}
				if(num === 0) {
					++zeroes;
				} else {
					product *= num;
				}
			}
		}

		//do vertical

		for(var j = 0; j < lines.length; ++j) {
			var product = 1;
			var zeroes = 0;
			for(var i = 0; i < 4; ++i) {
				var num = parseInt(lines[i][j], 10);
				if(num == 0) {
					++zeroes;
				} else {
					product *= num;
				}
			}

			for(var i = 4; i < lines.length; ++i) {
				if(zeroes == 0 && product > maxProduct) {
					maxProduct = product;
				}
				var num = parseInt(lines[i][j], 10);
				var oldNum = parseInt(lines[i-4][j], 10);
				if(oldNum === 0) {
					--zeroes;
				} else {
					product /= oldNum;
				}
				if(num === 0) {
					++zeroes;
				} else {
					product *= num;
				}
			}
		}

		//do diagonal

		//diagonal part one : diagonals along the row headers
		for(var i = 0; (i+3) < lines.length; ++i) {
			var product = 1;
			var productLeft = 1;
			var zeroes = 0;
			var zeroesLeft = 0;

			//do the diagonals starting at this row's header
			for(var j = i, k = 0, kLeft = lines[i].length - 1; j < lines.length && k < lines[i].length; ++j, ++k, --kLeft) {
				if(zeroes === 0 && product > maxProduct) {
					maxProduct = product;
				}
				if(zeroesLeft === 0 && productLeft > maxProduct) {
					maxProduct = productLeft;
				}

				if((j-4) >= 0 && (k-4) >= 0) {
					var oldNum = parseInt(lines[j - 4][k - 4]);
					if(oldNum === 0) {
						--zeroes;
					} else {
						product /= oldNum;
					}
				}

				var num = parseInt(lines[j][k]);
				if(num === 0) {
					++zeroes;
				} else {
					product *= num;
				}

				if((j-4) >= 0 && (kLeft+4) < lines[j].length) {
					var oldNum = parseInt(lines[j - 4][kLeft + 4], 10);
					if(oldNum === 0) {
						--zeroes;
					} else {
						productLeft /= oldNum;
					}
				}

				var num = parseInt(lines[j][kLeft], 10);
				if(num === 0) {
					++zeroes;
				} else {
					productLeft *= num;
				}
			}
		}

		//diagonal part two : diagonals along the row bottoms
		for(var i = lines.length - 1; (i-3) >= 0 ; --i) {
			var product = 1;
			var productLeft = 1;
			var zeroes = 0;
			var zeroesLeft = 0;

			//do the diagonals starting at this row's header
			for(var j = i, k = 0, kLeft = lines[i].length - 1; j >= 0 && k < lines[i].length; --j, ++k, --kLeft) {
				if(zeroes === 0 && product > maxProduct) {
					maxProduct = product;
				}
				if(zeroesLeft === 0 && productLeft > maxProduct) {
					maxProduct = productLeft;
				}

				if((j+4) < lines.length && (k-4) >= 0) {
					var oldNum = parseInt(lines[j + 4][k - 4], 10);
					if(oldNum === 0) {
						--zeroes;
					} else {
						product /= oldNum;
					}
				}

				var num = parseInt(lines[j][k], 10);
				if(num == 0) {
					++zeroes;
				} else {
					product *= num;
				}

				if((j+4) < lines.length && (kLeft+4) < lines[j].length) {
					var oldNum = parseInt(lines[j + 4][kLeft + 4], 10);
					if(oldNum === 0) {
						--zeroes;
					} else {
						productLeft /= oldNum;
					}
				}

				var num = parseInt(lines[j][kLeft]);
				if(num === 0) {
					++zeroes;
				} else {
					productLeft *= num;
				}
			}
		}


		return { result: maxProduct, expected: 70600674 };
	};
})(eulerProblems);
