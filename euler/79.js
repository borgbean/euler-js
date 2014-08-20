//TODO: clean this shit up
(function(eulerProblems, eulerRequests) {
	"use strict";

	eulerRequests[79] = function() {
		return GET("euler/files/p079_keylog.txt");
	};

	var graph;
	var len;
	var min;
	eulerProblems[79] = function(input) {
		graph = [];
		len = 0;
		min = null;
		input = input.split("\n");
		for(var i = input.length - 1; i >= 0; --i) {
			var cur = input[i].split("");
			cur[cur.length - 1] = parseInt(cur[cur.length - 1], 10);
			for(var j = cur.length - 1; j > 0; --j) {
				cur[j-1] = parseInt(cur[j-1], 10);
				if(typeof graph[cur[j]] === 'undefined') {
					graph[cur[j]] = [];
					++len;
				}
				if(typeof graph[cur[j-1]] === 'undefined') {
					graph[cur[j-1]] = [];
					++len;
				}
				graph[cur[j-1]].push(cur[j]);
			}
		}

		for(var node in graph) {
			graph[node].sort();
			var newNode = [];
			for(var i = graph[node].length - 1; i > 0; --i) {
				newNode.push(graph[node][i]);
				while(i > 0 && graph[node][i] === graph[node][i-1]) --i;
			}
			graph[node] = newNode;
		}

		for(var node in graph) {
			for(var nextNode in graph[node]) {
				dfs([[node, nextNode]], graph[node][nextNode], 2);
			}
		}

		//reconstruct
		var path = [min[0][0]];
		for(var i = 1; i < min.length; ++i) {
			path.push(min[i][0]);
		}
		path.push(graph[min[min.length - 1][0]][min[min.length - 1][1]]);


		return { result: path.join(""), expected: 73162890 };
	};

	function dfs(path, start, uniq) {
		var nextNodes = graph[start];
		if(min !== null && (path.length+1) >= min.length) {
			return;
		}

		for(var nextNodeIdx = nextNodes.length - 1; nextNodeIdx >= 0; --nextNodeIdx) {
			var seenThisNode = false;
			var seenThisDigit = false;

			if(path[0][0] === graph[start][nextNodeIdx]) {
				seenThisDigit = true;
			}
			if(start === 0 && nextNodeIdx === 0) {
				continue;
			}
			for(var j = path.length - 1; j >= 0; --j) {
				var curLast = path[j];
				if(curLast[0] === start && curLast[1] === nextNodeIdx) {
					seenThisNode = true;
					break;
				}
				if(graph[curLast[0]][curLast[1]] === graph[start][nextNodeIdx]) {
					seenThisNode = true;
				}
				var curLastNode = graph[curLast[0]][curLast[1]];
			}

			if(seenThisNode) {
				continue;
			}
			var curUniq = uniq;
			if(!seenThisDigit) {
				++curUniq;
			}
			if(curUniq === len) {
				path.push([start, nextNodeIdx]);
				if(min === null || min.length > path.length) {
					min = path;
				}
				return;
			}
			var tempPath = path.slice(0);
			tempPath.push([start, nextNodeIdx]);
			dfs(tempPath, graph[start][nextNodeIdx], curUniq);
		}
	}

})(eulerProblems, eulerRequests);
