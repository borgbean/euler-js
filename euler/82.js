(function(eulerProblems, eulerRequests) {
	"use strict";

	eulerRequests[82] = function() {
		return GET("euler/files/p082_matrix.txt");
	};

	var count;
	eulerProblems[82] = function(input) {
		input = input.trim().split('\n');
		count = input.length;
		var minVal = Infinity;
		for(var row = count - 1; row >= 0; --row) {
			input[row] = input[row].split(',');
			input[row] = input[row].map(function(x) {return parseInt(x, 10);});
			for(var col = count - 1; col >= 0; --col) {
				if(input[row][col] < minVal) {
					minVal = input[row][col];
				}
				input[row][col] = new Vertex(input, row, col);
			}
		}
		var minSum = Infinity;
		for(var i = 0; i < count; ++i) {
			var sum = aStar(input, i, minSum, minVal);
			if(sum < minSum) {
				minSum = sum;
			}
			for(var row = 0; row < count; ++row) {
				for(var col = 0; col < count; ++col) {
					input[row][col].pathSum = -1;
				}
			}
		}
		return { result: minSum, expected: 260324 };
	};

	function Vertex(input, row, col) {
		this.row = row;
		this.col = col;
		this.neighbors = [];
		this.input = input;
		//right
		if(col < (count-1)) {
			this.neighbors.push([row, col+1]);
		}
		//down
		if(row < (count-1)) {
			this.neighbors.push([row+1, col]);
		}
		//up
		if(row > 0) {
			this.neighbors.push([row-1, col]);
		}
		this.cost = input[row][col];
		this.pathSum = -1;
		this.guessedCost = -1;

		this.neighborList = null;

	}
	Vertex.prototype.getNeighbors = function() {
		if(!this.neighborList) {
			var list = [];
			for(var i = this.neighbors.length - 1; i >= 0; --i) {
				list.push(this.input[this.neighbors[i][0]][this.neighbors[i][1]]);
			}
			this.neighborList = list
		}
		return this.neighborList;
	}

	function aStar(input, row, minSum, minVal) {
		var heap = new BinaryHeap(function(vertex) {return vertex.guessedCost;});
		heap.push(input[row][0]);
		input[row][0].pathSum = input[row][0].cost;

		var vertex = false;
		while(vertex === false) {
			vertex = aStarHelper(heap, minSum, minVal);
		}
		if(vertex === null) {
			return Infinity;
		}
		return vertex.pathSum;
	}
	function aStarHelper(heap, minSum, minVal) {
		var vertex = heap.pop();
		if(!vertex) {
			return null;
		}
		if(vertex.col === (count-1)) {
			return vertex;
		}
		if(vertex.pathSum > minSum) {
			return null;
		}

		var neighbors = vertex.getNeighbors();
		for(var i = neighbors.length - 1; i >= 0; --i) {
			var neighbor = neighbors[i];
			var sum = vertex.pathSum + neighbor.cost;
			if(neighbor.pathSum < 0) {
				if(sum > minSum) {
					continue;
				}
				neighbor.pathSum = sum;
				neighbor.guessedCost = sum + minVal * neighbor.col - (count-1);
				heap.push(neighbor);
			} else if(sum < neighbor.pathSum) {
				neighbor.pathSum = sum;

				neighbor.guessedCost = sum + minVal * neighbor.col - (count-1);
				heap.decreaseKey(neighbor);
			}
		}
		return false;
	}
})(eulerProblems, eulerRequests);
