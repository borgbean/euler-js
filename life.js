"use strict";

var calc = angular.module('life', []);

calc.controller('GameOfLife', ['$scope', '$filter', function ($scope, $filter) {
	$scope.dragging = false;

	// var $scope.settings.cols = 60;
	// var $scope.settings.rows = 60;
	var chanceInhabited = .30;
	// var $scope.settings.speed = 250;


	function initGrid() {
		$scope.cells = [];
		for(var row = 0; row < $scope.settings.rows; ++row) {
			var curRow = [];
			$scope.cells.push(curRow);
			for(var col = 0; col < $scope.settings.cols; ++col) {
				curRow.push({inhabited: Math.random() < chanceInhabited});
			}
		}
		$scope.start();
	}
	$scope.$watchCollection('[settings.rows, settings.cols]', initGrid);


	var ticker;
	var triggerTick = function(first) {
		tick($scope.cells);
		!first && $scope.$digest();
		ticker = setTimeout(function(){triggerTick(false)}, $scope.settings.speed);
	};

	$scope.start = function() {
		$scope.stop();
		triggerTick(true);
	}
	$scope.stop = function() {
		clearTimeout(ticker);
	}
	$scope.clear = function() {
		$scope.stop();
		for(var row = 0; row < $scope.settings.rows; ++row) {
			var curRow = $scope.cells[row];
			for(var col = 0; col < $scope.settings.cols; ++col) {
				curRow[col].inhabited = false;
			}
		}
	}

	var draggingInhabit, dragging;
	$scope.draggingStarted = function(cell) {
		dragging = true;
		draggingInhabit = !cell.inhabited;
		cell.inhabited = draggingInhabit;
		document.addEventListener("mouseup", function() {
			dragging = false;
		});
	}

	$scope.drag = function(cell) {
		if(dragging) {
			cell.inhabited = draggingInhabit;
		}
	}


}]);

var cellsDelta = [];
function tick(cells) {
	var cellsDeltaPosition = 0;
	for(var row = 0, maxRow = cells.length; row < maxRow; ++row) {
		var curRow = cells[row];
		for(var col = 0, maxCol = curRow.length; col < maxCol; ++col) {
			var livingNeighbors = 0;
			for(var nRow = ((row - 1) >= 0 ? row-1 : row), maxNRow = ((row + 1) < maxRow ? row+1 : row); nRow <= maxNRow; ++nRow) {
				for(var nCol = ((col - 1) >= 0 ? col-1 : col), maxNCol = ((col + 1) < maxCol ? col+1 : col); nCol <= maxNCol; ++nCol) {
					if(nRow === row && nCol === col) { continue; }
					if(!cells[nRow][nCol]) {
					// if(typeof cells[nRow][nCol] === undefined) {
						debugger;
					}
					if(cells[nRow][nCol].inhabited) {
						++livingNeighbors;
					}
					if(livingNeighbors > 3) {break;}
				}
				if(livingNeighbors > 3) {break;}
			}
			if(curRow[col].inhabited) {
				if(livingNeighbors < 2 || livingNeighbors > 3) {
					cellsDelta[cellsDeltaPosition++] = [row, col];
				}
			} else {
				if(livingNeighbors === 3) {
					cellsDelta[cellsDeltaPosition++] = [row, col];
				}
			}
		}
	}

	for(var i = 0; i < cellsDeltaPosition; ++i) {
		var cell = cells[cellsDelta[i][0]][cellsDelta[i][1]];
		cell.inhabited = !cell.inhabited;
	}
}


