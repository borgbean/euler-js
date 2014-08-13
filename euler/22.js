(function(eulerProblems) {
	"use strict";
	eulerProblems[22] = function() {
		var names_file = new XMLHttpRequest();
		names_file.ontimeout = function() {
			alert("Timed out");
		};
		try {
			names_file.open("GET", "euler/files/names.txt", false);
			names_file.send();
		} catch(NetworkError) {
			return { result: "Failed to read input!", expected: "Not failing" };
		}
		if(names_file.status != 200) {
			return { result: "Failed to read input!", expected: "Not failing" };
		}
		var input = JSON.parse(names_file.responseText).names.sort();
		var total_sum = 0;
		var a_ord = "A".charCodeAt(0) - 1; //(so that a - this == 1)
		for(var i = input.length - 1; i >= 0; --i) {
			var name = input[i];
			var sum = 0;
			for(var j = name.length - 1; j >= 0; --j) {
				sum += name.charCodeAt(j) - a_ord;
			}
			total_sum += sum * (i+1);
		}
		return { result: total_sum, expected: 871198282 };
	};
})(eulerProblems);
