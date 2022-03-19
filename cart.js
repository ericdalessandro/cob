// Ensure body has loaded before script can run.
if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
}else{
    ready()
}

function ready() {
    // Hide cart on load.
    document.getElementsByClassName('cart')[0].style.display = 'none'

    // Show products, hide cart.
    var showProductsBtn = document.getElementsByClassName('show-products')[0]
    showProductsBtn.addEventListener('click', function() {
        store = document.getElementsByClassName('store')[0]
        cart = document.getElementsByClassName('cart')[0]
        if (store.style.display != 'block') {
            store.style.display = 'block'
        }
        if (cart.style.display != 'none') {
            cart.style.display = 'none'
        }
    })

    // Show cart, hide products.
    var showCartBtn = document.getElementsByClassName('show-cart')[0]
    showCartBtn.addEventListener('click', function() {
        store = document.getElementsByClassName('store')[0]
        cart = document.getElementsByClassName('cart')[0]
        if (cart.style.display != 'block') {
            cart.style.display = 'block'
        }
        if (store.style.display != 'none') {
            store.style.display = 'none'
        }
    })
    
    // Functionality for the 'Remove' button in the cart.
    var removeItemFromCartBtn = document.getElementsByClassName('remove_item_btn')
    for (var i=0; i<removeItemFromCartBtn.length; i++){
        var button = removeItemFromCartBtn[i]
        button.addEventListener('click', removeCartItem)
    }

    // Functionality for the 'Quantity' element in the cart.
    var quantityInputs = document.getElementsByClassName('cart-quantity-input')
    for (var i=0; i<quantityInputs.length; i++){
        var input = quantityInputs[i]
        input.addEventListener('change', quantityChanged)
    }

    // Functionality for the 'Add to Cart' button on the products page.
    var addToCartBtn = document.getElementsByClassName('add_to_cart')
    for (var i=0; i<addToCartBtn.length; i++){
        var button = addToCartBtn[i]
        button.addEventListener('click', addToCartClicked)
    }

    // Functionality for Submit Order button.
    var sumbitBtn = document.getElementsByClassName('submitButton')[0]
    sumbitBtn.addEventListener('click', function(){
        alert("Thank you for your order!")
    })
    
}

function removeCartItem(event) {
    console.log('item removed')
    var buttonClicked = event.target
    buttonClicked.parentElement.parentElement.remove()
    updateCartTotal()
}

function quantityChanged(event){
    var input = event.target
    if (isNaN(input.value) || input.value <= 0){
        input.value = 1
    }
    updateCartTotal()
}

function addToCartClicked(event){
    var button = event.target
    var shopItem = button.parentElement
    var title = shopItem.getElementsByClassName('shop-item-title')[0].textContent
    var price = shopItem.getElementsByClassName('shop-item-price')[0].textContent
    var imageSrc = shopItem.getElementsByClassName('fish')[0].src
    addItemToCart(title, price, imageSrc)
    updateCartTotal()
}

function addItemToCart(title, price, imageSrc){
    var cartRow = document.createElement('div')
    cartRow.classList.add('cart-row')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    var cartItemNames = document.getElementsByClassName('cart-item-title')
    for (var i=0; i<cartItemNames.length; i++){
        if(cartItemNames[i].innerText == title){
            alert("This item is already in your cart.")
            return
        }
    }

    var cartRowContents = `
                        <div class="cart-row">
                            <div class="cart-item cart-column">
                                <img class="cart-item-image" src="${imageSrc}" width="100" height="100">
                                <span class="cart-item-title">${title}</span>
                            </div>
                            <span class="cart-price cart-column">${price}</span>
                            <div class="cart-quantity cart-column">
                                <input class="cart-quantity-input" type="number" value="1">
                                <button class="remove_item_btn" type="button">REMOVE</button>
                            </div>
                        </div>
                        `
    cartRow.innerHTML = cartRowContents
    cartItems.append(cartRow)
    console.log("adding")
    cartRow.getElementsByClassName('remove_item_btn')[0].addEventListener('click', removeCartItem)
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged)
}

function updateCartTotal() {
    console.log("Calling updateCartTotal")
    var cartItemContainer = document.getElementsByClassName('cart-items')[0]
    var cartRows = cartItemContainer.getElementsByClassName('cart-row')
    var total = 0
    var errorYN = false
    // Total price of all elements currently in cart.
    try{
        for (var i=0; i<cartRows.length; i+=2){
            console.log(i)
            var cartRow = cartRows[i]
            var priceElement = cartRow.getElementsByClassName('cart-price')[0]
            var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
            console.log(priceElement)
            var price = parseFloat(priceElement.textContent.replace('$', ''))
            var quantity = quantityElement.value
            total = total + (price * quantity)
            console.log(total)
        }
    }catch (error) {
        total = 0
        console.log(error)
        errorYN = true
    }
    // Prevent more than 2 decimal values in total.
    total = Math.round(total * 100) / 100
    // Update total price on page.
    if (!errorYN) {
        document.getElementsByClassName('cart-total-price')[0].textContent = '$' + total
    }else{
        document.getElementsByClassName('cart-total-price')[0].textContent = ''
    }
}