// function sieve(max) {
// 	return sieve_from_unaltered(sieve_unaltered(max));
// }

function fill_segment(start, size, sqrt_max, list, primes) {
	var real_start = (start<<1)|1;
	for(var i = 0, max = primes.length; i < max; ++i) {
		var prime = primes[i];
		if(prime > sqrt_max) {
			break;
		}
		var prime_start_rem = real_start % prime;
		var prime_start = 0;
		if(prime_start_rem !== 0) { 
			prime_start = prime - prime_start_rem;
		}
		var real_prime_start = real_start + prime_start;
		if((real_prime_start & 1) === 0) {
			prime_start += prime;
		}
		if(real_prime_start < (prime*prime)) {
			prime_start = prime*prime - real_start;
		}
		for(var j = prime_start>>1; j < size; j += prime) {
			list[j] = false;
		}
	}
	for(var i = 0; i < size; ++i) {

		if(list[i] === false) {
			continue;
		}
		var prime = real_start + (i << 1);
		primes.push(prime);
		if(prime <= sqrt_max) {
			var prime_start = ((prime*prime) >> 1) - start;
			for(var composite = prime_start; composite < size; composite += prime) {
				list[composite] = false;
			}
		}
	}
}

function sieve(limit) {
	var sqrt_max = Math.sqrt(limit) | 0;
	var list_size = sqrt_max >> 1;

	var list = new Array(list_size);
	var primes = [];

	for(var i = 0; i < list_size; ++i) {
		list[i] = true;
	}

	fill_segment(1, list_size - 1, sqrt_max, list, primes);

	for(var start = list_size, max = limit>>1; start < max; start += list_size) {
		//re-init list
		for(var i = 0; i < list_size; ++i) {
			list[i] = true;
		}
		var size = list_size;
		if(list_size > ((limit>>1) - start)) {
			size = (limit>>1) - start;
		};
		fill_segment(start, size, sqrt_max, list, primes);
	}

	primes.unshift(2);
	return primes;
}


function isPrime(primes, num) {
	return primes[binarySearch(0, primes.length, num, primes)] === num;
}


function sieve_from_unaltered(sieve) {
	var final_numbers = [2];
	var max = sieve.length;
	for(var i = 0; i < max; ++i) {
		sieve[i] && final_numbers.push((i * 2) + 1);
	}
	return final_numbers;
}

function sieve_unaltered(max) {
	max += 1;
	var halfMax = Math.floor(max / 2);
	var numbers = new Array(halfMax);
	var stop = numbers.length;
	for(var i = 0; i < stop; ++i) {
		numbers[i] = true;
	}
	numbers[0] = false;
	var sqrt = Math.floor(Math.sqrt(max));
	for(var i = 3; i <= sqrt; i += 2) {
		var j = Math.floor(i / 2);
		if(!numbers[j]) {continue;}
		for(j += i; j < halfMax; j += i) {
			numbers[j] = false;
		}
	}
	return numbers;
}

function isPalindrome(str) {
	for(var i = str.length - 1, j = 0; i > j; --i, ++j) {
		if(str[i] !== str[j]) {
			return false;
		}
	}
	return true;
}

function old_isPrime(primes, num) {
	if(num === 2) {
		return true;
	}
	if((num & 1) === 0) {
		return false;
	}

	return primes[Math.floor(num/2)];
}

var l10 = Math.log(10);
function isPandigital(num) {
	var digits = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
	var len = Math.ceil(Math.log(num) / l10);
	do {
		var rem = num % 10;
		if(rem === 0 || digits[rem] !== 0 || rem > len) {
			return false;
		}
		digits[rem] = 1;
	} while((num = Math.floor(num/10)) > 0);
	return true;
}

function GET(url) {
	var file = new XMLHttpRequest();
	file.ontimeout = function() {
		throw "Timed out!";
	};
	try {
		file.open("GET", url, false);
		file.send();
	} catch(NetworkError) {
		throw "Failed to read input!";
	}
	if(file.status != 200) {
		throw "Failed to read input";
	}
	return file.responseText;
}

// binary search slice of a list starting at start and ending at end, returning an element greater than your query when possible, if there is not a match.
function binarySearch(start, end, findme, list, cmp) {
	var left = start;
	var right = end;
	var mid = (left + right) >> 1;
	if(!cmp) {
		cmp = function(a, b) { return a - b; };
	}

	while(left < right) {
		//list[mid] > findMe
		var diff = cmp(list[mid], findme);
		if(diff < 0) {
			// too far left
			var left = mid + 1;
			var mid = (mid + right) >> 1;
		} else if(diff > 0){
			//too far right
			var right = mid-1;
			var mid = (left + mid) >> 1;
		} else {return mid;}
	}
	if(mid < right && cmp(list[mid], findme) < 0) {
		++mid;
	}
	return mid;
}
