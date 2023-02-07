document.addEventListener ('DOMContentLoaded', function() {
    document.querySelector('#ex1').addEventListener('click', () => doEx1());
    document.querySelector('#ex2').addEventListener('click', () => doEx2());
    document.querySelector('#ex3').addEventListener('click', () => doEx3());
    document.querySelector('#ex4').addEventListener('click', () => doEx4());
    document.querySelector('#ex5').addEventListener('click', () => doEx5());
    document.querySelector('#ex6').addEventListener('click', () => doEx1());
    document.querySelector('#ex7').addEventListener('click', () => doEx1());
    document.querySelector('#ex8').addEventListener('click', () => doEx1());
    document.querySelector('#ex9').addEventListener('click', () => doEx9());
});

function doEx1 () {
    exersise_story(1);
    var var1 = 3;
    var var2 = 4;
    var var3 = 7;
    var var4 = 8;
    var var5 = 10;

    print_result(`var1 is ${var1}, var2 is ${var2}, var3 is ${var3}, var4 is ${var2}, var5 is ${var2}`);
}

function doEx2 () {
    exersise_story(2);
    const arr = [3, 4, 7, 8, 10];
		let ex_1_modullo = [];
		for (let i = 0; i < arr.length; i++) {
			for (let y = 0; y < arr.length; y++)
				if (arr[y] % arr[i] === 3) {
					ex_1_modullo = [arr[i], arr[y]];
					break;
				}
			if (ex_1_modullo.length > 0) break;
		}
		print_result (
			` ${ex_1_modullo.length > 0 ? ex_1_modullo : 'no such numbers which modullo is equal 3'}`
		);
}

function doEx3 () {
    exersise_story(3);
    const arr = [3, 4, 7, 8, 10, 15, 22, 33, 37, 48];
    let array_selected = [];
    for (let i = 0; i < 3; i++) 
        array_selected.push (arr [Math.floor(Math.random() * 10 )]);

    const mod = array_selected[0] % array_selected [1] % array_selected[2];
    print_result(` ${array_selected[0]} % ${array_selected[1]} % ${array_selected[2]} = ${mod}`);
}


function doEx4 () {
    exersise_story(4);
    let result = (6 * 5 - 1) * 2;
    print_result (`(6 * 5 - 1) * 2 = ${result}`);
}


function doEx5 () {
    exersise_story(5);
    let out;
	let name = window.prompt('What is your name?');
    if (name === '') 
         out = 'Hello, you, nameless shy guy ;-)';
    else if (name === null)
        out = 'No problem, keep ignoring me...';
    else
	    out = `Hello, ${name}`;
    
    print_result (out);
}

function doEx9 () {
    window.alert("I am ex#9!!!")
}

function exersise_story (ex_num) {
    switch (ex_num) {
			case 1:
				story = 'Create 5 variables which hold 5 values: 3, 4, 7, 8, 10.';
				break;
			case 2:
				story = 'Find two numbers between 3, 4, 7, 8, 10 which modulo will be 3.';
				break;
			case 3:
				story = 'Take 3 random numbers from the list of 3, 4, 7, 8, 10, 15, 22, 33, 37, 48 and calculate their modulo.';
				break;
			case 4:
				story = "Create a variable using 3 operators '[*, - , *]' so the result will be 58.";
				break;
			case 5:
				story = 'Get and print the name of the user.';
				break;
			case 6:
				story = '';
				break;
			case 7:
				story = '';
				break;
			case 8:
				story = '';
				break;
			case 9:
				story = '';
				break;
		}
        document.querySelector('#ex_story').innerHTML = '<b>Exersise #' + ex_num + ':</b> ' + story;
}

function print_result(text) {
    document.querySelector('#result').innerHTML = text;
}