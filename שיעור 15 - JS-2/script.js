document.addEventListener('DOMContentLoaded', function () {
    document.querySelector('#clearbtn').addEventListener('click', hideOL());
	document.querySelector('#runbtn').addEventListener('click', () => {
		showOL();
		var citiesList, countriesList;
		citiesList = getCitiesList(); //q7
		printResults(`#ex7`, `Cities: ${citiesList}`);
		countriesList = getCountriesList(); //q8
		printResults(`#ex8`, `Countries: ${countriesList}`);
		printResults('#ex9', checkCities(citiesList)); //q9
		printResults('#ex10', checkCountries(countriesList)); //q10
		printResults('#ex11', stringManipulations()); //q11
	});
});

function getCitiesList() {
	let citiz = window.prompt('Name 5 cities, separated by comas', 'תל אביב, יפו, חיפה,  באר שבע, ירושלים');
	return citiz.split(',');
}

function getCountriesList() {
	let countriz = window.prompt('Name 3 countries, separated by comas', 'ישראל, אוקראינה, יוון');
	return countriz.split(',');
}

function checkCountries(list) {
	let result = '';

	if (list[0].trim() === 'ישראל') {
		result += 'ישראל הינה המדינה הראשונה ברשימת הערים';
		result += '<br>';
	} else {
		result += `ישראל אינה המדינה הראשונה ברשימה אלא "${list[0].trim()}"`;
		result += '<br>';
	}

	if (list[1].trim() === 'ארהב') {
		result += 'ארהב הינה המדינה השניה ברשימת הערים';
		result += '<br>';
	} else {
		result += `ארהב אינה המדינה השניה ברשימה אלא "${list[1].trim()}"`;
		result += '<br>';
	}

	if (list[2].trim() === 'יוון') {
		result += 'יוון הינה המדינה השלישית ברשימת הערים';
		result += '<br>';
	} else {
		result += `יוון אינה המדינה השלישית ברשימה אלא "${list[2].trim()}"`;
		result += '<br>';
	}

	return result;
}

function checkCities(list) {
	let result = '';
	if (list[0].trim() === 'תל אביב') {
		result += 'תל אביב הינה העיר הראשונה ברשימת הערים';
		result += '<br>';
	} else {
		result += `תל אביב אינה העיר הראשונה ברשימה אלא "${list[0].trim()}"`;
		result += '<br>';
	}

	if (list[1].trim() === 'נתניה') {
		result += 'נתניה הינה העיר השניה ברשימת הערים';
		result += '<br>';
	} else {
		result += `נתניה אינה העיר השניה ברשימה אלא "${list[1].trim()}"`;
		result += '<br>';
	}

	if (list[2].trim() === 'חיפה') {
		result += 'חיפה הינה העיר השלישית ברשימת הערים';
		result += '<br>';
	} else {
		result += `חיפה אינה העיר השלישית ברשימה אלא "${list[2].trim()}"`;
		result += '<br>';
	}

	if (list[3].trim() === 'אילת') {
		result += 'אילת הינה העיר הרביעית ברשימת הערים';
		result += '<br>';
	} else {
		result += `אילת אינה העיר הרביעית ברשימה אלא "${list[3].trim()}"`;
		result += '<br>';
	}

	if (list[4].trim() === 'ירושלים') {
		result += 'ירושלים הינה העיר החמישית ברשימת הערים';
		result += '<br>';
	} else {
		result += `ירושלים אינה העיר החמישית ברשימה אלא "${list[4].trim()}"`;
		result += '<br>';
	}
	return result;
}

function stringManipulations() {
	const stringsList = ['Hello World', 'HELLO EVERYBODY', 'JAVA script IS fUn', 'FuN WiTH JS'];
	let results = '';
	stringsList.forEach((element) => {
        results += `Original string is: <b>${element} </b><br>`;
		results += 'SPLIT: <i>' + splitText(element) + '</i><br>';
		results += 'SLICE: <i>' + sliceText(element) + '</i><br>';
		results += 'SEARCH: <i>' + searchText(element) + '</i><br>';
		results += 'REPLACE: <i>' + replaceText(element) + '</i><br>';
		results += 'INDEXOF: <i>' + indexOfText(element) + '</i><br>';
        results += "<br>";
	});
    results += 'CONCAT: ' + concatText(stringsList);
	return results;
}

function splitText(text) {
	let retVal = '';
	const lst = text.split(' ');
	lst.forEach((element) => {
		retVal += element + ', ';
	});
	return retVal;
}

function sliceText(text) {
	let retVal = '';
	const lst = text.split(' ');
	lst.forEach((element) => {
		retVal += element.slice(0, element.length /2) + " ";
	});
	return retVal;
}

function searchText (text) {
    pos = text.search(" ");
    return `The second word is at position ${pos+1}.`
}

function replaceText(text) {
    let retVal = text.replace(text.split(" ")[0], '<u>Replacement</u>');
    return retVal;
}

function indexOfText(text) {
	let pos = text.indexOf(text.split(' ')[1]);
	return `The second word is at position ${pos}.`;
}

function concatText(lst) {
    let retVal = "<br>";
    retVal += lst[0].toUpperCase().concat(" ").concat(lst[1].toLowerCase()) + "<br>";
    retVal += lst[2].toLowerCase().concat(' ').concat(lst[3].toUpperCase()) + '<br>';
    return retVal;
}


function showOL() {
    document.querySelector('ol').style.display = 'block';
}

function hideOL() {
	document.querySelector('ol').style.display = 'none';
}

function printResults(selectorID, text) {
	document.querySelector(selectorID).innerHTML = text;
}
