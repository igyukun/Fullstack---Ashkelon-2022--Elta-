document.addEventListener('DOMContentLoaded', () => {
	document.querySelector('#nav-home')
        .addEventListener('click', () => fetchData());
	document.querySelector('#nav-search')
        .addEventListener('click', () => search_items());
	document.querySelector('#nav-cart')
        .addEventListener('click', displayCartModal);
    document.querySelector('#btnDisplayCartModal')
        .addEventListener('click', displayCartModal);
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

function getItemObjById (itemId) {
    for (let item of products_obj) {
        console.log(`item.id = ${item.id}, itemId = ${itemId}`);
        if (item.id === itemId)
            return item;
		}
    return null;
}


function drawCardsBox() {
    let cardBox = document.querySelector('#cardsBox');
    cardBox.innerHTML = '';

	products_obj.forEach((item) => {        
		cardBox.appendChild(showItemCard(item));
        document.querySelector(`#cardItem${item.id}`)
            .addEventListener('mouseup', (event) => {
                if (event.target != document.querySelector(`#btn-card-${item.id}`)) 
                    displayProductModal(item);
            });
		document.querySelector(`#btn-card-${item.id}`)
			.addEventListener('click', () => 
                updateCartItems(item.id, ADD_ITEM));
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
            <div class="cardItem" id="cardItem${item.id}">
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


/* ========================================================== */
/*        Display Product Page As Modal Dialog                */
/* ========================================================== */
function displayProductModal(item) {
    closeAllModals();
    const modal = document.querySelector('#productModal');
    modal.style.display = 'flex';
    // debugger;
    let productPage = document.querySelector('.product-page');
    productPage.innerHTML = '';
    let productContent = document.createElement('div');
    productContent.innerHTML = buildProductPageHtml(item);
    productPage.appendChild(productContent);

    document.querySelector('#btnCloseProductModalX')
        .addEventListener('mouseup', () => {
			modal.style.display = 'none';
		});
    document.querySelector('#btnCloseProductModal')
        .addEventListener('mouseup', () => {
			modal.style.display = 'none';
		});
    window
        .addEventListener('mouseup', (event) => {
            if (event.target == modal) {
                modal.style.display = 'none';
            }
        });
    document.querySelector('#btnProductAddToCart')
        .addEventListener('click', () => updateCartItems(item.id, ADD_ITEM));
}


function buildProductPageHtml (item) {
    return `<div class="modal-content">
                <!-- Modal Header -->
                <div class="modal-header border-bottom">
                    <h4 class="modal-title">Product Details</h4>
                    <button type="button" class="btn btn-close-modal btn-sm btn-outline-warning ps-2 pe-2" id="btnCloseProductModalX"><i class="fa-solid fa-xmark"></i></button>
                </div>
                <div class="modal-body">
                    <div class="product-page row">
                        <div class="col-12 col-sm-4 p-2" id="imgProductPage">
                            <img src="${item.image}" alt="${item.name} image">
                        </div>
                        <div class="col-12 col-sm-8 p-2" id="infoProductPage">
                            <h5 class="cardTitle">${item.name}</h5>
                            <p class="cardText">${item.description}</p>
                            <p class="cardCategory"><b>Category:</b>  ${item.category}</p>
                            <p class="cardPrice">$${item.price.toLocaleString('en')}</p>
                        </div>
                    </div>
                </div>
                <div class="cardFooter bg-dark justify-content-center">
                        <button class="btn btn-outline-warning add-to-cart-button me-2 active" 
                        id="btnProductAddToCart">Add to Cart</button>
                        <button class="btn btn-outline-warning btn-close-modal ms-2" 
                        id="btnCloseProductModal">Close</button>
                </div>    
            </div>
        </div>`;
}

/* ========================================================== */
/*        Manage the cart using the local storage             */
/* ========================================================== */
function updateCartItems (itemId, operation) {
    let cartMapObj = getStorageValueByKeyAsMap(CART_KEY);
    switch (operation) {
        case ADD_ITEM:
            cartMapObj = addArrayItem(cartMapObj, itemId);
            break;
        case INCREMENT_ITEMS:
            cartMapObj = incrementItemsAmmount(cartMapObj, itemId);
            break;
        case DECREMENT_ITEMS:
            cartMapObj = decrementItemsAmmount(cartMapObj, itemId);
            break;
        case REMOVE_ITEM:
            cartMapObj = removeArrayItem(cartMapObj, itemId);
            break;
    }
    localStorage.setItem(CART_KEY, JSON.stringify(Object.fromEntries(cartMapObj)));
    drawCartBadge(getCartItemsNumber());
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
    let strId = String(itemId);
    if (cartMapObj.has(strId)) {
        displayAlertModal(
                    `The item "${
                        getItemObjById(itemId).name
                    }" is already on your shopping list. 
                    Open your cart to update the product items quantity.`);
    } else {
        cartMapObj.set(strId, 1);
        displayAlertModal(
					`The item "${
						getItemObjById(itemId).name
					}" has been added to your shopping list. 
                    Open your cart to update the product items quantity.`
				);
    }
    return cartMapObj;
}

function incrementItemsAmmount(cartMapObj, itemId) {
	let strId = String(itemId);
	if (cartMapObj.has(strId)) {
		cartMapObj.set(strId, Number(cartMapObj.get(strId)) + 1);
	}
	return cartMapObj;
}

function decrementItemsAmmount (cartMapObj, itemId) {
    let strId = String(itemId);
    if (cartMapObj.has(strId)) {
        cartMapObj.set(strId, Number(cartMapObj.get(strId)) - 1);
    } 
    return cartMapObj;
}


function removeArrayItem(cartMapObj, itemId) {
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
    closeAllModals();

    const modal = document.querySelector('#cartModal');
    modal.style.display = 'flex';

    document.querySelector('.btn-close-modal')
        .addEventListener('mouseup', (event)=> {
            modal.style.display = 'none';
        });

    window
        .addEventListener('mouseup', (event)=> {
            if (event.target == modal) {
                modal.style.display = 'none';
            }
        }, true);

    populateCartList();
}


function populateCartList() {
	let cartMapObj = getStorageValueByKeyAsMap(CART_KEY);
    clearCartList();
    for (const[key,value] of cartMapObj) 
        drawCartItem(key, value);
}


function clearCartList() {
    document.querySelector('.cartList').innerHTML = '';
}


function drawCartItem (id, amount) {
    let item = products_obj.find(item => item.id == Number(id));
    let itemElement = document.createElement ('div');
    itemElement.innerHTML = `<p class="list-item-name ps-1" id="cartItemTitle${item.id}">${item.name}</p>
                            <div class='input-group input-group-sm justify-content-center'>
                                <button class='btn btn-outline-warning' id='btnCartIncrement${item.id}'><i class="fa-solid fa-arrow-left"></i></button>
                                <input class='form-control bg-dark text-warning justify-content-center'  id='listItemAmmount${item.id}' value='${amount}'>
                                <button class='btn btn-outline-warning' id='btnCartDecrement${item.id}'><i class="fa-solid fa-arrow-right"></i></button>
                            </div>
                            <button class="list-item-btn bg-dark ms-2" id='deleteCartItemBtn${item.id}'><i class="fa-solid fa-trash-can"></i></button>   
                            `;
    itemElement.className = `cart-item-${item.id}`;
    document.querySelector('.cartList').appendChild(itemElement);

    document.querySelector(`#cartItemTitle${item.id}`)
        .addEventListener('mouseup', () => displayProductModal(item));
        
    document.querySelector(`#deleteCartItemBtn${item.id}`)
        .addEventListener('mouseup', () => {
            updateCartItems (item.id, REMOVE_ITEM);
            drawCartBadge(getCartItemsNumber());
            populateCartList();
        });

    document.querySelector(`#btnCartDecrement${item.id}`)
        .addEventListener('click', () => changeItemAmmount(item.id, DECREMENT_ITEMS));

    document.querySelector(`#btnCartIncrement${item.id}`)
        .addEventListener('click', () => changeItemAmmount(item.id, INCREMENT_ITEMS));
}


function changeItemAmmount(itemId, action) {
    const amountField = document.querySelector(`#listItemAmmount${itemId}`);
    if (action === INCREMENT_ITEMS) {
        amountField.value = String(Number(amountField.value) + 1);
        updateCartItems (itemId, INCREMENT_ITEMS);
    } else if (action === DECREMENT_ITEMS)  {
        if (Number(amountField.value) <= 1) {
            updateCartItems (itemId, REMOVE_ITEM);
        } else {
            amountField.value = String(Number(amountField.value) - 1);
            updateCartItems (itemId, DECREMENT_ITEMS)
        }
    }
    drawCartBadge(getCartItemsNumber());
	populateCartList();
}


/* ===================================== */
/*        ALERT MODAL DIALOG             */
/* ===================================== */
function displayAlertModal(text) {
    closeAllModals();
	const modal = document.querySelector('#alertModal');
	modal.style.display = 'flex';
	document.querySelector('#alertText').innerHTML = text;

	document.querySelector('.btn-close-alert-modal')
        .addEventListener('mouseup', () => {
            modal.style.display = 'none';
        });

	document.querySelector('.btn-discard-alert')
        .addEventListener('mouseup', () => {
            modal.style.display = 'none';
        });

	document.querySelector('.btn-go-to-cart')
        .addEventListener('mouseup', () => {
            modal.style.display = 'none';
            displayCartModal();
        });

	window
        .addEventListener(
            'mouseup',
            (event) => {
                if (event.target == modal) {
                    modal.style.display = 'none';
                }
            },
            true
        );
}


/* ===================================== */
/*        GENRAL MODAL FUNCTIONS         */
/* ===================================== */
function closeAllModals() {
    // debugger;
    const modals = document.getElementsByClassName('modal');
    if (modals.length > 0) {
        for (element of modals) {
            element.style.display = "none";
        }
    }
}