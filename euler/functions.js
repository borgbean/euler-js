function sieve(max) {
	return sieve_from_unaltered(sieve_unaltered(max));
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

function isPrime(primes, num) {
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
	num = num;
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

