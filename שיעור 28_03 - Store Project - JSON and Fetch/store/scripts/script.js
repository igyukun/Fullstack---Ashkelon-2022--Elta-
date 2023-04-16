document.addEventListener('DOMContentLoaded', () => {
	document.querySelector('#nav-home').addEventListener('click', () => fetchData());
	document.querySelector('#nav-search').addEventListener('click', () => search_items());
	document.querySelector('#nav-cart').addEventListener('click', displayCartModal);
    document.querySelector('#btnDisplayCartModal').addEventListener('click', displayCartModal);
});

const   DATA_URL        = "./storage/products.json";
const   PRODUCTS_KEY    = 'products';
const   CART_KEY        = 'cart';
const   ADD_ITEM        = 0;
const   REMOVE_ITEM     = 1;
const   INCREMENT_ITEMS = 2;
const   DECREMENT_ITEMS = 3;

let     products_obj    = {};


fetchData();


/* ========================================================== */
/*        Display the main page with item boxes               */
/* ========================================================== */
function fetchData () {
    fetch(DATA_URL)
    .then((response) => response.json())
    .then((data) => {
        products_obj = data.products;
        drawCardsBox();
    })
    .catch((error) => {
        console.log(error);
    });    
}


function drawCardsBox() {
    let cardBox = document.querySelector('#cardsBox');
    cardBox.innerHTML = '';

	products_obj.forEach((item) => {        
		cardBox.appendChild(showItemCard(item));
		document
			.querySelector(`#btn-card-${item.id}`)
			.addEventListener('click', () => addRemoveCartItem(item.id, ADD_ITEM));
	});
    drawCartBadge(getCartItemsNumber());
}


function showItemCard(item) {
    let cardHtml = buildItemCard(item);
    let itemCard = document.createElement('div');
    itemCard.innerHTML = cardHtml;
    return itemCard;
}


function buildItemCard(item) {
    return `
    <div class="cardItem" id="${item.id}">
                <div class="imageSection">
                    <img src="${item.image}" class="cardImg" alt="${item.name} image">
                </div>
                <div class="cardBody">
                    <h5 class="cardTitle">${item.name}</h5>
                    <p class="cardText">${
											item.description.length > 80 ? `${item.description.substr(0, 80)}...` : item.description
										}</p>
                    <p class="cardCategory"><b>Category:</b>  ${item.category}</p>
                    <p class="cardPrice">$${item.price.toLocaleString('en')}</p>
                </div>
                <div class="cardFooter bg-dark ">
                    <button class="btn btn-outline-warning btn-sm add-to-cart-button" 
                    id="btn-card-${item.id}">Add to Cart</button>
                </div>
            </div>
    `;
}


// /* ========================================================== */
// /*        Manage the store using the local storage            */
// /* ========================================================== */
// function syncLocalStorage(products_obj) {
// 	let productsStorage = localStorage.getItem('products');
//     debugger;
// 	if (productsStorage !== null) {
//         let updatedStorage = checkAndUpdateStorageByJSON(JSON.parse(productsStorage), products_obj);
// 		localStorage.setItem(PRODUCTS_KEY, JSON.stringify(updatedStorage));
// 	} else {
// 		localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products_obj));
// 	}
// }

// function checkAndUpdateStorageByJSON(productsStorage, products_obj) {
//     if (productsStorage.length !== products_obj.length) {
//         products_obj.forEach((item) => {
//             let isItemFound = false;
//             for (let i=0; i < productsStorage.length; i++) {
//                 if (item == productsStorage[i]) {
//                     isItemFound = true;   
//                     break;
//                 }
//             } 
//             if (!isItemFound) productsStorage.push(item);
//         });
//     }
//     return productsStorage;
// }

/* ========================================================== */
/*        Manage the cart using the local storage             */
/* ========================================================== */
function addRemoveCartItem (itemId, operation) {
    let cartMapObj = getStorageValueByKeyAsMap(CART_KEY);
    
    if (operation === ADD_ITEM) {
        cartMapObj = addArrayItem(cartMapObj, itemId);
    } else if (operation === REMOVE_ITEM) {
        cartMapObj = removeArrayItem(cartMapObj, itemId);
    } 
    localStorage.setItem(CART_KEY, JSON.stringify(Object.fromEntries(cartMapObj)));
    drawCartBadge(getCartItemsNumber());
}

function updateCartItemAmmount (itemId, amount) {
    let cartMapObj = getStorageValueByKeyAsMap(CART_KEY);
    if (amount <= 0) {

    }


}


function getStorageValueByKeyAsMap(keyName) {
	let storageVal = localStorage.getItem(keyName);
	if (storageVal === null) return new Map();
	else return new Map(Object.entries(JSON.parse(storageVal)));
}


function getCartItemsNumber() {
	return getStorageValueByKeyAsMap(CART_KEY).size;
}


function addArrayItem (cartMapObj, itemId) {
    console.log(`Adding item with ID: ${itemId} into the cart ${cartMapObj}`);
    let strId = String(itemId);
    if (cartMapObj.has(strId)) {
        cartMapObj.set(strId, Number(cartMapObj.get(strId)) + 1 );
    } else {
        cartMapObj.set(strId, 1);
    }
    return cartMapObj;
}


function removeArrayItem(cartMapObj, itemId) {
    debugger;
	if (cartMapObj.has(String(itemId))) {
        cartMapObj.delete(String(itemId));
	}
	return cartMapObj;
}


function readKeyFromLocalStorage (key) {
    return localStorage.getItem(key);
}


function drawCartBadge(itemsNum) {
    const badgeElement = document.querySelector('#cart-badge');
    if (itemsNum) {
        badgeElement.innerHTML = itemsNum;
        badgeElement.style.display = 'inline';
    } else {
		badgeElement.style.display = 'none';
    }
}


function displayCartModal() {
    const modal = document.querySelector('#myModal');
    console.log('Modal is opened');
    modal.style.display = 'flex';

    document.querySelector('.btn-close-modal').addEventListener('mouseup', (event)=> {
        modal.style.display = 'none';
    });

    window.addEventListener('mouseup', (event)=> {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    }, true);
    populateCartList();
}


function populateCartList() {
	let cartMapObj = getStorageValueByKeyAsMap(CART_KEY);
    clearCartList();
    for (const[key,value] of cartMapObj) drawCartItem(key, value);
}


function clearCartList() {
    document.querySelector('.cartList').innerHTML = '';
}

function updatedStorage() {}


function drawCartItem (id, amount) {
    let item = products_obj.find(item => item.id == Number(id));
    let itemElement = document.createElement ('div');
    itemElement.innerHTML = `<p class="list-item-name ps-1">${item.name}</p>
                            <div class='input-group input-group-sm'>
                                <button class='btn btn-outline-warning' id='btnCartDecrement${item.id}'><i class="fa-solid fa-arrow-left"></i></button>
                                <input class='form-control bg-dark' disabled id='listItemAmmount${item.id}' value='${amount}'>
                                <button class='btn btn-outline-warning' id='btnCartIncrement${item.id}'><i class="fa-solid fa-arrow-right"></i></button>
                            </div>
                            <button class="list-item-btn bg-dark ms-2" id='deleteCartItemBtn${item.id}'><i class="fa-solid fa-trash-can"></i></button>   
                            `;
    itemElement.className = `cart-item-${item.id}`;
    document.querySelector('.cartList').appendChild(itemElement);
    document.querySelector(`#deleteCartItemBtn${item.id}`).addEventListener('mouseup', () => {
        addRemoveCartItem (item.id, REMOVE_ITEM);
        drawCartBadge(getCartItemsNumber());
        populateCartList();
    });
    document.querySelector(`#btnCartDecrement${item.id}`).addEventListener('click', () => {
        changeItemAmmount(item.id, DECREMENT_ITEMS);
    });
    document.querySelector(`#btnCartIncrement${item.id}`).addEventListener('click', () => {
        changeItemAmmount(item.id, INCREMENT_ITEMS);
    });
}


function changeItemAmmount(itemId, action) {
    const amountField = document.querySelector(`#listItemAmmount${itemId}`);
    if (action === INCREMENT_ITEMS)
        amountField.value = String(Number(amountField.value)++);
    else {
        if (Number(amountField.value) <= 0) {
            addRemoveCartItem (itemId, REMOVE_ITEM);
        } else {
            amountField.value = String(Number(amountField.value)--);
        }
    }
}