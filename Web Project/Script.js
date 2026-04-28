let d = new Date();
const dateElement = document.getElementById("date");
if (dateElement) {
    dateElement.innerHTML = d.toDateString();
}
let cart = [];

// Add to cart
function addToCart(productName, price) {
    console.log("addToCart called with:", productName, price);

    // Check if product already exists in cart
    let existingProduct = cart.find(item => item.name === productName);

    if (existingProduct) {
        existingProduct.quantity++;
    } else {
        cart.push({
            name: productName,
            price: price,
            quantity: 1
        });
    }

    updateCartCount();
    saveCartToLocalStorage();
    alert(productName + " added to cart!");
}

// Update cart count display
function updateCartCount() {
    let totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    let cartCountElements = document.querySelectorAll("#cartCount");
    cartCountElements.forEach(element => {
        element.innerText = totalItems;
    });
}

// Remove item from cart
function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartCount();
    saveCartToLocalStorage();
    displayCart(); // Refresh cart display if on cart page
}

// Update item quantity
function updateQuantity(index, newQuantity) {
    if (newQuantity <= 0) {
        removeFromCart(index);
    } else {
        cart[index].quantity = newQuantity;
        updateCartCount();
        saveCartToLocalStorage();
        displayCart(); // Refresh cart display if on cart page
    }
}

// Calculate total price
function getCartTotal() {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
}

// Save cart to localStorage
function saveCartToLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Load cart from localStorage
function loadCartFromLocalStorage() {
    let savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCartCount();
    }
}

// Display cart items (for cart page)
function displayCart() {
    let cartItemsElement = document.getElementById("cartItems");
    let cartTotalElement = document.getElementById("cartTotal");

    if (!cartItemsElement) return; // Not on cart page

    cartItemsElement.innerHTML = "";

    if (cart.length === 0) {
        cartItemsElement.innerHTML = "<p>Your cart is empty</p>";
        if (cartTotalElement) cartTotalElement.innerText = "0 EGP";
        return;
    }

    cart.forEach((item, index) => {
        let itemElement = document.createElement("div");
        itemElement.className = "cart-item";
        itemElement.innerHTML = `
            <div class="cart-item-details">
                <h3>${item.name}</h3>
                <p>${item.price} EGP each</p>
            </div>
            <div class="cart-item-controls">
                <button onclick="updateQuantity(${index}, ${item.quantity - 1})">-</button>
                <span>${item.quantity}</span>
                <button onclick="updateQuantity(${index}, ${item.quantity + 1})">+</button>
                <button onclick="removeFromCart(${index})" class="remove-btn">Remove</button>
            </div>
            <div class="cart-item-total">
                ${(item.price * item.quantity)} EGP
            </div>
        `;
        cartItemsElement.appendChild(itemElement);
    });

    if (cartTotalElement) cartTotalElement.innerText = getCartTotal() + " EGP";
}

// Checkout function
function checkout() {
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }
    // Redirect to checkout page
    window.location.href = 'Checkout.html';
}

// Initialize cart on page load
document.addEventListener('DOMContentLoaded', function() {
    loadCartFromLocalStorage();
    displayCart();
});

// Filter products
function filterProducts(category) {
    let items = document.getElementsByClassName("card");

    for (let i = 0; i < items.length; i++) {

        if (category === "all") {
            items[i].style.display = "block";
        } 
        else {
            if (items[i].classList.contains(category)) {
                items[i].style.display = "block";
            } else {
                items[i].style.display = "none";
            }
        }
    }
}
