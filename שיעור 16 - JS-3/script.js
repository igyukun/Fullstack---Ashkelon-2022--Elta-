document.addEventListener('DOMContentLoaded', function () {
	// document.querySelector('#clearbtn').addEventListener('click', hideOL());
	document.querySelector('#runbtn').addEventListener('click', () => {
		showOL();

		const ex1_res = ex1();
		printResults(1, ex1_res);

		const ex2_res = ex2(ex1_res);
		printResults(2, ex2_res);

		const ex3_res = ex3(ex1_res);
		printResults(3, ex3_res);

		const ex4_res = ex4();
		printResults(4, ex4_res[0] + ' and ' + ex4_res[1]);

		printResults(5, ex5(ex4_res[0], ex4_res[1]));

		printResults(6, ex6(ex4_res[0], ex4_res[1]));

		let bool = false;
		printResults(7, bool);

		printResults (8, ex8(bool));

		return false;
	});

	return false;
});


function ex1() {
	return prompt('Enter your name', 'John Lennon');
}

function ex2(text) {
	return text.length;
}

function ex3(text) {
	return text[text.indexOf(' ') + 1];
}

function ex4() {
	input_arr = [];
	input_arr.push(window.prompt('Enter the 1st number', 10));
	input_arr.push(window.prompt('Enter the 2nd number', 5));
	return input_arr;
}

/*
	<li>if num1 > num2 OR num1*2 > num2</li>\
	<li>if num2 > num1 AND num1 > 0</li>\
	<li>if num2 > num1 OR num1 > 0 then if num2 > num1 then print msg else if num1 > 0 then print msg</li>\
	<li>if either of num1 or num2 = 0 then print msg</li>\
*/
function ex5(num1, num2) {
	let output = '<ol>';
	if (num1 > num2 || num1 * 2 > num2) output += '<li>"num1 > num2 OR num1*2 > num2" is TRUE</li>';
	else output += '<li>"num1 > num2 OR num1*2 > num2" is FALSE</li>';

	if (num2 > num1 && num1 > 0) output += '<li>"num2 > num1 AND num1 > 0" is TRUE</li>';
	else output += '<li>"num2 > num1 AND num1 > 0" is FALSE</li>';

	if (num2 > num1 || num1 > 0)
		if (num2 > num1 && num1 <= 0) output += '<li>only "num2 > num1" is TRUE</li>';
		else if (num1 > 0 && num2 <= num1) output += '<li>only "num1 > 0" is TRUE</li>';
		else output += '<li>both "num2 > num1" and "num1 > 0" are TRUE</li>';

	if (num1 == 0) output += '<li>"num1 = 0"</li>';
	else output += '<li>"num1 != 0"</li>';

	if (num2 == 0) output += '<li>"num2 = 0"</li>';
	else output += '<li>"num2 != 0"</li>';

	output += '</ol>';
	return output;
}

/* Print the results to the arithmetical actions on num1 and num2: *, +, -, %, /, ^ */
function ex6 (num1, num2) {
	let output = "<ul>";
	num1 = Number(num1);
	num2 = Number (num2);
	output += `<li>Multipplication <${num1} * ${num2}>: ${num1 * num2} </li>\
				<li>Addition <${num1} + ${num2}>: ${num1 + num2} </li>\
				<li>Subtraction <${num1} - ${num2}>: ${num1 - num2} </li>\
				<li>Modulo <${num1} % ${num2}>: ${num1 % num2} </li>\
				<li>Division <${num1} / ${num2}>: ${num1 / num2} </li>\
				<li>Power <${num1} ^ ${num2}>: ${num1 ** num2} </li>`;
	output += '</ul>';

	return output;
}


function ex8 (bool) {
	let output = "<ol>";
	if (!bool == true)
		output += '<li>"bool" is false</li>';
	else
		output += '<li>"bool" is true</li>';

	if (bool == 1 && bool !=0)
		output += '<li>"bool" euqals 1 and does not equal 0</li>';
	else
		output += '<li>"bool" does not euqals 1 or equals 0</li>';

	return output;
}


function showOL() {
	document.querySelector('ol').style.display = 'block';
}


function hideOL() {
	//document.querySelector('ol').style.display = 'none';
	// location.reload(true);
}

function printResults(ex_number, text) {
	document.querySelector(`#task${ex_number}`).innerHTML = exercizeStory(ex_number);
	document.querySelector(`#res${ex_number}`).innerHTML = text;
}

function exercizeStory(exNum) {
	let story = '';
	switch (exNum) {
		case 1: {
			story = 'Create a variable to store the name provided by user.';
			break;
		}
		case 2: {
			story = 'Create a variable to store the length of the string received in the task #1.';
			break;
		}
		case 3: {
			story = 'Print the first letter of the second name without creating an array but using only indeces';
			break;
		}
		case 4: {
			story = 'Create two variables to hold two numbers entered by a user.';
			break;
		}
		case 5: {
			story =
				'Create a logical block:<ol>\
				<li>if num1 > num2 OR num1*2 > num2</li>\
				<li>if num2 > num1 AND num1 > 0</li>\
				<li>if num2 > num1 OR num1 > 0 then if num2 > num1 then print msg else if num1 > 0 then print msg</li>\
				<li>if either of num1 or num2 = 0 then print msg</li>\
				</ol>';
			break;
		}
		case 6: {
			story = 'Print results of the arithmetical operations on num1 and num2: *, +, -, %, /, ^';
			break;
		}
		case 7: {
			story = 'Create variable named "bool" and assign value "true" or "false".';
			break;
		}
		case 8: {
			story = 
				'Create a logical block:<ol>\
				<li>if NOT bool = true</li>\
				<li>if bool = 1 AND bool != 0</li>\
				</ol>';
			break;
		}
		default: {
			story = '';
			break;
		}
	}
	return story;
}
