//Modal part Start
const cart = document.getElementById('cart');
const modal = document.getElementById('modal-container');
const close = document.getElementById('close');

cart.addEventListener('click', () =>{
    modal.classList.add('show');
})

close.addEventListener('click', () =>{
    modal.classList.remove('show');
})
//Modal part End

const productsInCart = [];
const cartParentElement = document.querySelector('#buyItems');
const cartSumPrice = document.querySelector('#sum-prices');

const products = document.querySelectorAll('.item-a');

const countTheSumPrice = function () { // 4
	let sum = 0;
	productsInCart.forEach(item => {
		sum += item.price;
	});
	return sum;
}

const updateShoppingCartHTML = function () {  // 3
	// localStorage.setItem('shoppingCart', JSON.stringify(productsInCart));
	if (productsInCart.length > 0) {
		let result = productsInCart.map(product => {
			console.log(product);
			return `
				<li class="buyItem">
					<img src="${product.image}">
					<div>
						<h5>${product.name}</h5>
						<h6>$${product.price}</h6>
						<div>
							<button class="button-minus" data-id=${product.id}>-</button>
							<span class="countOfProduct">${product.count}</span>
							<button class="button-plus" data-id=${product.id}>+</button>
						</div>
					</div>
				</li><br>`
		});
		console.log(result);
		cartParentElement.innerHTML = result.join(' ');
		// document.querySelector('.checkout').classList.remove('hidden');
		cartSumPrice.innerHTML = '$' + countTheSumPrice();

	}
	else {
		// document.querySelector('.checkout').classList.add('hidden');
		cartParentElement.innerHTML = '<h6 class="empty">Your shopping cart is empty</h6>';
		cartSumPrice.innerHTML = '';
	}
}


console.log(productsInCart.length);
const updateProductsInCart = (product) => {
	// console.log(product);
	for (let i = 0; i < productsInCart.length; i++) {
		if (productsInCart[i].id == product.id) {
			productsInCart[i].count += 1;
			productsInCart[i].price = productsInCart[i].basePrice * productsInCart[i].count;
			return;
		}
	}
	productsInCart.push(product);
	console.log(productsInCart);
}
products.forEach(item => {   // 1
	item.addEventListener('click', (e) => {
        
		if (e.target.classList.contains('addToCart')) {
			const productID = e.target.dataset.productId;
			
			const productName = item.querySelector('.ball').innerHTML;
			const productPrice = item.querySelector('.priceValue').innerHTML;
			const productImage = item.querySelector('img').src;
			let product = {
				name: productName,
				image: productImage,
				id: productID,
				count: 1,
				price: +productPrice,
				basePrice: +productPrice,
			}
			updateProductsInCart(product);
			updateShoppingCartHTML();
		}
	});
});

cartParentElement.addEventListener('click', (e) => { // Last
	const isPlusButton = e.target.classList.contains('button-plus');
	const isMinusButton = e.target.classList.contains('button-minus');
	if (isPlusButton || isMinusButton) {
		for (let i = 0; i < productsInCart.length; i++) {
			if (productsInCart[i].id == e.target.dataset.id) {
				if (isPlusButton) {
					productsInCart[i].count += 1
				}
				else if (isMinusButton) {
					productsInCart[i].count -= 1
				}
				productsInCart[i].price = productsInCart[i].basePrice * productsInCart[i].count;

			}
			if (productsInCart[i].count <= 0) {
				productsInCart.splice(i, 1);
			}
		}
		updateShoppingCartHTML();
	}
});

updateShoppingCartHTML();