(function(eulerProblems) {
	"use strict";
	eulerProblems[43] = function() {
		var num = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
		var len = num.length;
		var sum = 0;

		var next = num;
		var cnt = 1;
		while(nextPermutation(next) !== null) {
			++cnt;
			if((next[3] & 1) !== 0) {
				continue;
			}
			var offset = 0;
			if((slice(next, offset, 3) % 17) !== 0) {
				continue;
			}
			if((slice(next, ++offset, 3) % 13) !== 0) {
				continue;
			}
			if((slice(next, ++offset, 3) % 11) !== 0) {
				continue;
			}
			if((slice(next, ++offset, 3) % 7) !== 0) {
				continue;
			}
			if((slice(next, ++offset, 3) % 5) !== 0) {
				continue;
			}
			if((slice(next, ++offset, 3) % 3) !== 0) {
				continue;
			}
			sum += slice(next, 0, next.length);
		}
		return {result: sum, expected: 16695334890};
	};

	function slice(list, offset, len) {
		var ord = 1;
		var sum = 0;
		var end = list.length - 1 - offset - len;
		for(var i = list.length - 1 - offset; i > end; --i) {
			sum += list[i] * ord;
			ord *= 10;
		}
		return sum;
	}


	function nextPermutation(list) {
		var first = 0;
		var last = list.length;

		var i = last - 1;
		while(true) {
			var ii = i--;
			if (list[i] < list[ii]) {
				var j = last;
				while (list[i] >= list[--j]);
				swap(list, i, j);
				reverse(list, ii, last);
				return list;
			}
			if (i == first) {
				reverse(list, first, last);
				return null;
			}
		}
	}
	function swap(arr, a, b) {
		var temp = arr[b];
		arr[b] = arr[a];
		arr[a] = temp;
	}
	function reverse(list, a, b) {
		var i = a;
		var j = b - 1;
		while(i < j) {
			swap(list, i++, j--);
		}
	}
})(eulerProblems);
