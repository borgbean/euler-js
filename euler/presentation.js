"use strict"

var euler = angular.module('eulerProblems', []);

var problemCount = 85;
var exclude = [];  // euler problems I skipped
var otherProblems = [87, 89, 96, 97, 99, 102, 104, 112, 187, 197, 204, 206, 243];  // other problems
var eulerProblems = [];
var eulerRequests = [];
euler.controller('problemController', ['$scope', function ($scope) {
	$scope.runProblem = function(problem, addToElapsed) {
		return problem.runProblem().then(function() {
			if(addToElapsed) {
				$scope.problemsElapsed += problem.elapsed;
			}
			$scope.$apply();
		}).catch(function() {
			$scope.$apply();
		});
	};

	$scope.Math = Math;
	$scope.problemsElapsed = 0;
	$scope.problemsDone = 0;
	var progressBar = $("#progressbar");
	function runNext(i) {
		if(i >= problems.length) {
			return;
		}
		var problem = $scope.runProblem(problems[i], true);
		progressBar.progressbar({value:100*(i+1) / problems.length});
		problem.then(function() {
			if(problems[i].correct) {
				$scope.problemsDone++;
				$scope.$apply();
			}
		});
		window.setTimeout(function() { runNext(i+1); }, 25);
	}

	$scope.runAll = function() {
		$scope.problemsElapsed = 0;
		$scope.problemsDone = 0;
		progressBar.progressbar({value:.001});
		runNext(0);
	};

	progressBar.progressbar();
	var progressBarValue = $('.ui-progressbar-value').addClass('ui-corner-right');


	$scope.problems = [];
	var problems = $scope.problems;

	for(var i = 1; i <= problemCount; ++i) {
		if (exclude.indexOf(i) != -1) {
			continue;
		}
		problems.push(new Problem(i));
	}
	for(var i = 0; i < otherProblems.length; ++i) {
		problems.push(new Problem(otherProblems[i]));
	}
}]);

euler.factory('eulerProblemFactory', function(number) {
	var problem = new Problem(number);

	return problem;
})


function Problem(number) {
	this.number = number;
	this.loaded = false;
	this.loading = false;
	this.elapsed = null;
	this._result = null;
	this._error = null;
	this.correct = null;

	Object.defineProperties(this, {
		result: {
			get: function() {
				return this._result;
			},
			set: function(result) {
				this._error = null;
				this._result = result;
			}
		},
		error: {
			get: function() {
				return this._error;
			},
			set: function(error) {
				this.correct = false;
				this._result = null;
				this._error = error;
			}
		}
	});
}

Problem.prototype.loadProblem = function(preload) {
	this.loading = true;
	var script = document.createElement("script");
	script.src = "euler/" + this.number + ".js";
	script.type = "text/Javascript";
	script.async = true;

	var problem = this;
	var promise = new Promise(function(resolve, reject) {
		script.onload = function() { //TODO delete a script or something and see what happens
			this.loading = false;
			problem.loaded = true;

			if(!preload) {
				problem.runProblem().then(resolve).catch(reject);
			} else {
				resolve();
			}
		};
		script.onerror = function(e) {
			problem.loading = false;
			problem.correct = false;
			problem.error = "Failed to load script";
			reject();
		};
		document.body.appendChild(script);
	});
	return promise;
}

Problem.prototype.runProblem = function() {
	var problem = this;
	if(!this.loaded) {
		if(!this.loading) {
			return this.loadProblem();
		}
	} else {
		return new Promise(function(resolve, reject) {
			try {
				problem._execute();
				resolve();
			} catch(Exception) {
				problem.error = Exception;
				reject();
			}
		});
	}
}

Problem.prototype._execute = function() {
	this.correct = false;
	var start;
	if(eulerRequests[this.number]) {
		var blockingRequestData = eulerRequests[this.number]();
		start = new Date().getTime();
		this.result = eulerProblems[this.number](blockingRequestData);
	} else {
		start = new Date().getTime();
		this.result = eulerProblems[this.number]();
	}
	this.elapsed = new Date().getTime() - start;
	this.correct = this.result.result == this.result.expected;
	return this.result;
}
