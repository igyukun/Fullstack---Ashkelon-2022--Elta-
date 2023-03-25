document.addEventListener ('DOMContentLoaded', function() {
	document.querySelector('#homework-users-btn').addEventListener('click', () => homeworkUsers());
	document.querySelector('#homework-posts-btn').addEventListener('click', () => homeworkPosts());
});

const USER = 0; 	//users scenario constant (Homework ex1)
const POST = 1; 	//posts scenario constant (Homework ex2)
const usersURL = 'https://jsonplaceholder.typicode.com/users'; 	//users list JSON URL
const postsURL = 'https://jsonplaceholder.typicode.com/posts'; 	//posts list JSON URL


/** 
 * Execute exercise 1.	
 * Read JSON and display or hide the list of users 	
*/
function homeworkUsers() {
	const mainUserDiv = document.querySelector('#users-res');
	if (mainUserDiv.className === 'd-none') {
		//users list is not displayed: display 'div' element and fill it with data
		mainUserDiv.className = 'd-block p-3';
		document.querySelector('#homework-users-btn').innerHTML = 'Hide Users';
		fetchAndAppend(usersURL, mainUserDiv, USER);
	} else {
		//users list is displayed: clear and hide 'div' element
		mainUserDiv.className = 'd-none';
		document.querySelector('#homework-users-btn').innerHTML = 'Display Users';
		mainUserDiv.innerHTML = '';
	}
}


/**
 * Create DOM elements for users list and return the topmost element
 * @param {Object} post		JS Object created by users JSON parsing 
 * @returns 				Ready div element populated with users list
 */
function displayUser(user) {
	const usersDiv = document.createElement('div');
	usersDiv.className = `border-bottom border-end border-success mb-3`;
	const h2 = document.createElement('h2');
	h2.innerHTML = user.name;
	const pStreet = document.createElement('p');
	pStreet.innerHTML = `Street: ${user.address.street}`;
	const pPhone = document.createElement('p');
	pPhone.innerHTML = `Phone no.: ${user.phone}`;
	usersDiv.appendChild(h2);
	usersDiv.appendChild(pStreet);
	usersDiv.appendChild(pPhone);
	return usersDiv;
}


/* Execute exercise 2.				 				*/
/* Read JSON and display or hide the list of posts 	*/
function homeworkPosts() {
	const mainUserDiv = document.querySelector('#posts-res');
	if (mainUserDiv.className === 'd-none') {
		mainUserDiv.className = 'd-block p-3';
		document.querySelector('#homework-posts-btn').innerHTML = 'Hide Posts';
		fetchAndAppend(postsURL, mainUserDiv, POST);
	} else {
		mainUserDiv.className = 'd-none';
		document.querySelector('#homework-posts-btn').innerHTML = 'Display Posts';
		mainUserDiv.innerHTML = '';
	}
}


/**
 * Create DOM elements for posts list and return the topmost element
 * @param {Object} post		JS Object created by posts JSON parsing 
 * @returns 				Ready div element populated with posts list
 */
function displayPost(post) {
	const postDiv = document.createElement('details');
	postDiv.className = `border-bottom border-end border-success mb-3`;
	const summary = document.createElement('summary');
	summary.innerHTML = post.title;
	const pContent = document.createElement('p');
	pContent.innerHTML = post.body;
	const pId = document.createElement('p');
	pId.innerHTML = `Post ID: ${post.id}`;
	const pUserId = document.createElement('p');
	pUserId.innerHTML = `User ID: ${post.userId}`;
	postDiv.appendChild(summary);
	postDiv.appendChild(pContent);
	postDiv.appendChild(pId);
	postDiv.appendChild(pUserId);
	return postDiv;
}

/**
 * Fetch and parse JSON and display users or posts list
 * @param {String} urlJSON 		JSON file URL
 * @param {Element} dispDiv 	div element for displaying JSON content
 * @param {Number} scenario 	0 - Users, 1- Posts
 */
function fetchAndAppend(urlJSON, dispDiv, scenario) {
	fetch(urlJSON)
		.then((response) => response.json())
		.then((json) => {
			json.forEach((child) => {
				console.log(scenario);
				if (scenario === USER)
					dispDiv.appendChild(displayUser(child));
				else if (scenario === POST)
					dispDiv.appendChild(displayPost(child));
			});
		});
}