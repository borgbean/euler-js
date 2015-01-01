(function(eulerProblems, eulerRequests) {
	"use strict";

	eulerRequests[54] = function() {
		return GET("euler/files/poker.txt");
	};


	var ranks = { 2: 1, 3: 2, 4: 3, 5: 4, 6: 5, 7: 6, 8: 7, 9: 8, T: 9, J: 10, Q: 11, K: 12, A: 13 };
	eulerProblems[54] = function(input) {
		var hands = populateHands();

		var p1Wins = 0;
		var p2Wins = 0;
		var numHands = hands.length;

		input = JSON.parse(input).split("\n");

		for(var lineIdx = input.length - 1; lineIdx >= 0; --lineIdx) {
			var line = input[lineIdx].split(" ");

			var p1 = line.slice(0, 5);
			var p2 = line.slice(5);

			var hand1 = [];
			var hand2 = [];
			for(var i = 0; i < 5; ++i) {
				var card = ranks[p1[i][0]];
				var suit = p1[i][1];
				if(hand1[card]) {
					hand1[card].push(suit);
				} else {
					hand1[card] = [suit];
				}

				card = ranks[p2[i][0]];
				suit = p2[i][1];
				if(hand2[card]) {
					hand2[card].push(suit);
				} else {
					hand2[card] = [suit];
				}
			}
			var tie = true;
			for(var handIdx = 0; handIdx < numHands; ++handIdx) {
				var hand1Res = hands[handIdx](hand1);
				var hand2Res = hands[handIdx](hand2);

				if(hand1Res.length > 0) {
					tie = false;
					if(hand2Res.length > 0) {
						var resLength = hand1Res.length;
						var found = false;
						for(var i = 0; i < resLength; ++i) {
							var resDiff = hand1Res[i] - hand2Res[i];
							if(resDiff === 0) {
								continue;
							} else if(resDiff > 0) {
								++p1Wins;
							} else {
								++p2Wins;
							}
							found = true;
							break;
						}
						if(!found) {
							tie = true;
						}
					} else {
						++p1Wins;
					}
				} else if(hand2Res.length > 0) {
					tie = false;
					++p2Wins;
				} else {
					continue;
				}
				break;
			}

			if(tie) {
				var isTie = tieBreaker(hand1, hand2);
				if(isTie > 0) {
					++p1Wins;
				} else if(isTie < 0) {
					++p2Wins;
				} else {
					continue;
				}
			}
		}

		return {result: p1Wins, expected: 376};
	};

	function tieBreaker(p1, p2) {
		var p1Ranks = [];
		var p2Ranks = [];
		for(var idx in p1) {
			p1Ranks.push(idx);
		}
		for(var idx in p2) {
			p2Ranks.push(idx);
		}
		p1Ranks.sort(function(x, y) {return y - x;});
		p2Ranks.sort(function(x, y) {return y - x;});
		for(var i = 0; i < 5; ++i) {
			if(p2Ranks[i] === p1Ranks[i]) {
				continue;
			}
			return p1Ranks[i] - p2Ranks[i];
		}
		return 0;
	}

	function populateHands() {
		var hands = [];
		//royal flush
		hands.push(function(hand) {
			var kings = hand.K;
			if(!kings || kings.length > 1) {
				return [];
			}
			var suit = kings[0];
			if(hand[ranks.A][0] !== suit || hand[ranks.Q][0] !== suit || hand[ranks.J][0] !== suit || hand[ranks['10']][0] !== suit) {
				return [];
			}
			return [1];
		});
		//straight flush
		hands.push(function(hand) {
			var cards = [];
			var suite = null;
			for(var idx in hand) {
				cards.push(idx);
				if(suite === null) {
					suite = hand[idx][0];
				}
				if(cards[idx] !== suite) {
					return [];
				}
			}
			if(cards.length < 5) {
				return [];
			}
			cards.sort(function(x, y) {return x-y;});
			for(var i = cards.length - 1; i > 0; --i) {
				if((cards[i] - cards[i-1]) !== 1) {
					return [];
				}
			}
			return [1];
		});
		//four of a kind
		hands.push(function(hand) {
			var found = false;
			var other = null;
			for(var idx in hand) {
				if(hand[idx].length === 4) {
					found = true;
				}
				other = idx;
			}
			if(found) {
				return [other];
			}
			return [];

		});
		//full house
		hands.push(function(hand) {
			var three = false;
			var pair = false;
			for(var idx in hand) {
				if(hand[idx].length === 3) {
					three = idx;
				} else if(hand[idx].length === 2) {
					pair = idx;
				} else {
					return [];
				}
			}
			if(three !== false && pair !== false) {
				return [three, pair];
			}
		});
		//flush
		hands.push(function(hand) {
			var suite = null;
			for(var idx in hand) {
				var cards = hand[idx];
				for(var i = cards.length - 1; i >= 0; --i) {
					if(suite === null) {
						suite = cards[i];
					} else {
						if(cards[i] !== suite) {
							return [];
						}
					}
				}
			}
			return [1]; // we check for highest card if we're against another flush, this works
		});
		//straight
		hands.push(function(hand) {
			var indices = [];
			var highest = 0;
			for(var idx in hand) {
				indices.push(parseInt(idx, 10));
			}
			if(indices.length < 5) {
				return [];
			}
			indices.sort(function(x, y) {return x - y;});
			highest = indices[indices.length - 1];
			for(var i = indices.length - 1; i > 0; --i) {
				if((indices[i] - indices[i-1]) !== 1) {
					return [];
				}
			}
			return [highest];
		});
		//three of a kind
		hands.push(function(hand) {
			for(var idx in hand) {
				if(hand[idx].length === 3) {
					return idx;
				}
			}

			return [];
		});
		//two pairs
		hands.push(function(hand) {
			var pair = false;
			for(var idx in hand) {
				if(hand[idx].length === 2) {
					if(pair === false) {
						pair = idx;
					} else {
						if(idx > pair) {
							return [idx, pair];
						}
						return [pair, idx];
					}
				}
			}

			return [];
		});
		//one pair
		hands.push(function(hand) {
			for(var idx in hand) {
				if(hand[idx].length === 2) {
					return [idx];
				}
			}

			return [];
		});
		return hands;
	}
})(eulerProblems, eulerRequests);
