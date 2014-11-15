(function(eulerProblems) {
	"use strict";

	var squares = { CC1: 2, CC2: 17, CC3: 33, CH1 : 7, CH2 : 22, CH3: 36, JAIL: 10, G2J: 30, GO: 0, GTJ: 30, C1: 11, E3: 24, H2: 39, R1: 5, R2: 15, R3: 25, R4: 35, U1: 12, U2: 28 };

	var numSquares = 40;
	var diceHeads = 4;

	eulerProblems[84] = function(input) {
		var exceptions = [];
		var cChests = [squares.CC1, squares.CC2, squares.CC3];
		for(var i = 0, max=cChests.length; i < max; ++i) {
			exceptions[cChests[i]] = cChest.bind(this, cChests[i]);
		}

		var chances = [squares.CH1, squares.CH2, squares.CH3];
		for(var i = 0, max=chances.length; i < max; ++i) {
			exceptions[chances[i]] = chance.bind(this, chances[i]);
		}

		exceptions[squares.G2J] = function() {
			return squares.JAIL;
		}

		var landings = [];
		for(var i = 0; i < numSquares; ++i) {
			landings[i] = 0;
		}

		var numRolls = 1e6;
		var numDoubles = 0;
		var curSquare = 0;

		for(var i = 0; i <= numRolls; ++i) {
			var roll = rollDice();

			var doubles = roll[0] === roll[1];
			numDoubles = doubles ? numDoubles+1 : 0;

			if(numDoubles === 3) {
				curSquare = squares.JAIL;
				numDoubles = 0;
			} else {
				curSquare = (curSquare + roll[0] + roll[1]) % numSquares;
				var j = 0;
				var lastSquare = -1;
				while(exceptions[curSquare] && curSquare !== lastSquare) {
					lastSquare = curSquare;
					curSquare = exceptions[curSquare]();
				}
			}
			++landings[curSquare];
		}


		landings = landings.map(function(cnt, idx) {return [idx, cnt]});
		landings.sort(function(x1, x2) {return x2[1] - x1[1];});

		var result = [landings[0][0], landings[1][0], landings[2][0]];
		result = result.map(function(x) { 
			x = '0' + x;
			return x.substring(x.length - 2);
		});

		var expected = [10, 15, 24];
		expected = expected.map(function(x) { 
			x = '0' + x;
			return x.substring(x.length - 2);
		});


		return { result: result.join(''), expected: expected.join('') };
	};

	function cChest(curSquare) {
		var roll = rand(16);
		if (roll === 0) {
			return squares.JAIL;
		}
		if (roll === 1) {
			return squares.GO;
		}

		return curSquare;
	}

	var chanceDestinations = [squares.JAIL, squares.GO, squares.C1, squares.E3, squares.H2, squares.R1];
	function chance(curSquare) {
		var roll = rand(16);
		var i = chanceDestinations.length;
		if(roll < i) {
			return chanceDestinations[roll];
		}
		if(roll === ++i) {  //no chance square <= 2
			return curSquare-3;
		}
		if(roll < (i+=2)) {
			//next railroad
			var rRoads = [squares.R1, squares.R2, squares.R3, squares.R4];
			for(var j = 0, max = rRoads.length; j < max; ++j) {
				if(curSquare < rRoads[j]) {
					return rRoads[j];
				}
			}
			return rRoads[0];
		}
		if(roll === ++i) {
			//next utility
			if(curSquare < squares.U1) {
				return squares.U1;
			}
			if(curSquare < squares.U2) {
				return squares.U2;
			}
			return squares.U1;
		}

		return curSquare;
	}

	function rand(n) {
		return (Math.random()*n) | 0;
	}

	function rollDice() {
		return [rand(diceHeads) + 1, rand(diceHeads) + 1];
	}
})(eulerProblems);
