(function(eulerProblems, eulerRequests) {
	"use strict";

	eulerRequests[83] = function() {
		return GET("euler/files/p083_matrix.txt");
	};

	var count;
	var minVal;
	eulerProblems[83] = function(input) {
		input = input.trim().split('\n');
		count = input.length;
		minVal = Infinity;
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
		var sum = aStar(input, 0);
		return { result: sum, expected: 425185 };
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
		//left
		if(col > 0) {
			this.neighbors.push([row, col-1]);
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

	function aStar(input, row) {
		var heap = new BinaryHeap(function(vertex) {return vertex.guessedCost;});
		heap.push(input[row][0]);
		input[row][0].pathSum = input[row][0].cost;

		var vertex = false;
		while(vertex === false) {
			vertex = dijkstrasHelper(heap);
		}
		if(vertex === null) {
			return Infinity;
		}
		return vertex.pathSum;
	}
	function dijkstrasHelper(heap) {
		var vertex = heap.pop();
		if(vertex.col === (count-1) && vertex.row === vertex.col) {
			return vertex;
		}

		var neighbors = vertex.getNeighbors();
		for(var i = neighbors.length - 1; i >= 0; --i) {
			var neighbor = neighbors[i];
			var sum = vertex.pathSum + neighbor.cost;
			if(neighbor.pathSum < 0) {
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
