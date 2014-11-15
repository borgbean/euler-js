"use strict";

var calc = angular.module('calc', []);

calc.controller('CalcController', ['$scope', '$filter', function ($scope, $filter) {
	$scope.$watch('calcForm.input', function(calcInput) {
		var result = calculate(calcInput+"");
		if(result instanceof Array) {
			$scope.result = null;
			$scope.error = result;
		} else {
			var fResult = $filter('number')(result);
			if(fResult !== '') {
				result = fResult;
			} else {
				result += '';
			}
			$scope.result = result;
			$scope.error = null;
		}
	});

	$scope.calcForm = null;

	$scope.calc = calculate;
}]);



var unaryOperators = {
	'-' : {unary: true, precedence: 1, fn: function(val) { return -1 * val; }}
}
var binaryOperators = {
	'+': {binary: true, precedence: 1, fn: function(val1, val2) { return val1 + val2; }},
	'-': {binary: true, precedence: 2, fn: function(val1, val2) { return val1 - val2; }},
	'*': {binary: true, precedence: 3, fn: function(val1, val2) { return val1 * val2; }},
	'/': {binary: true, precedence: 4, fn: function(val1, val2) { return val1 / val2; }},
	'^': {binary: true, elevate: true, precedence: 5, fn: function(val1, val2) { return Math.pow(val1, val2); }}
};
function comparePrecedence(op1, op2) {
	if(op1.elevate && !op2.elevate) {
		return 1;
	} else if(op2.elevate && !op1.elevate) {
		return -1;
	}
	if(op1.unary && op2.binary) {
		return 1;
	} else if(op1.binary && op2.unary) {
		return -1;
	} else {
		return op1.precedence - op2.precedence;
	}
}

var sentinel = {precedence: -1};

var calculate = (function() {
	var input, position, length, ast;


	function runAst(node) {
		if(!(node instanceof Node)) {
			return node;
		}
		if(node.op.unary) {
			return node.op.fn(runAst(node.arg1));
		} else {
			return node.op.fn(runAst(node.arg1), runAst(node.arg2));
		}
	}

	function Node(op, arg1, arg2) {
		this.op = op;
		this.arg1 = arg1;
		this.arg2 = arg2;
	}

	function calculate(string) {
		input = string;
		position = 0;
		length = string.length;
		ast = {
			operators: [sentinel],
			operands: [],
			popOperator: function() {
				var t0 = this.operands.pop();
				var t1 = null;
				if(this.operators[this.operators.length - 1].binary) {
					t1 = t0;
					t0 = this.operands.pop();
				}
				var op = this.operators.pop();
				this.operands.push(new Node(op, t0, t1));
			},
			pushOperator: function(op) {
				while(comparePrecedence(this.operators[this.operators.length - 1], op) > 0) {
					this.popOperator();
				}
				this.operators.push(op);
			}
		};

		var out = expression(input);
		if(out !== true) {
			return out;
		}

		return runAst(ast.operands.pop());
	}

	var whitespace = /\s/;
	/**
	 * Consume whitespace, return true if input is not empty.
	 */
	function consumeWhitespace() {
		//remove whitespace
		while(position < length && whitespace.test(input[position])) {
			++position;
		}

		return position !== length;
	}

	function expression(expectClosingParen) {
		var start, out;
		var name = "expression";

		start = position;
		if(!consumeWhitespace() || input[position] === ')') {
			out = [[[start, position], 'Empty expression!']];
			return out;
		}
		start = position;
		out = value();
		if(out !== true) {
			out.push([start, name]);
			return out;
		}


		while(true) {
			if(!consumeWhitespace()) {
				break;  //we're done
			}
			if(expectClosingParen && input[position] === ')') {
				break;
			}
			start = position;
			out = subExpression();
			if(out !== true) {
				out.push([start, name]);
				return out;
			}
		}

		while(ast.operators[ast.operators.length - 1].precedence !== sentinel.precedence) {
			ast.popOperator();
		}


		return true;
	}

	function subExpression() {
		var start, out;
		var name = "sub expression";
		var inPos = position;

		var operator = bOperator();
		if(operator === false) {
			out = [[[inPos, length], "Invalid value (was expecting binary operator)."]];
			return out;
		}

		ast.pushOperator(operator);

		start = position;
		if(!consumeWhitespace()) {
			out = [[[inPos, start], 'Unexpected end of subexpression.']];
			return out;
		}

		out = value();
		if(out !== true) {
			out.push([inPos, name]);
			return out;
		}

		return true;
	}

	function value() {
		var start, out;
		var name = "value";

		start = position;
		if(input[position] === '(') {
			++position;
			ast.operators.push(sentinel);
			out = expression(true);
			if(out !== true) {
				out.push([start, name + '(parens)']);
				return out;
			}
			if(input[position] !== ')') {
				out = [[[start, position], 'expression in parentheses was not closed.']];
				return out;
			}
			++position;
			ast.operators.pop();
			return true;
		}

		var num = number();
		if(num !== false) {
			ast.operands.push(num);
			return true;
		}

		var operator = uOperator();
		if(operator === false) {
			++position;
			out = [[[start, position], 'Invalid value.']];
			return out;
		}
		ast.pushOperator(operator);
		if(!consumeWhitespace()) {
			out = [[[start, position], 'Expected number following unary operator...']];
			return out;
		}
		out = value();
		if(out !== true) {
			out.push([start, name]);
			return out;
		}

		return true;

	}

	var numeric = /[0-9]/;
	/**
	 * Read in a number. Returns false if not a number.
	 */
	function number() {
		if(!numeric.test(input[position]) && input[position] !== '.') {
			return false;
		}
		var startPosition = position;
		var havePoint = false;

		while(position < length) {
			var char = input[position];
			if(char === '.') {
				if(havePoint) {
					var invalid = true;
					break;
				}
				havePoint = true;
			} else if(!numeric.test(char)) {
				break;
			}

			++position;
		}

		var result = parseFloat(input.substring(startPosition, position));
		return result;
	}

	function bOperator() {
		var op = input[position];
		if(binaryOperators[op]) {
			++position;
			return binaryOperators[op];
		}

		return false;
	}

	function uOperator() {
		var op = input[position];
		if(unaryOperators[op]) {
			++position;
			return unaryOperators[op];
		}

		return false;
	}

	return calculate;
})();
