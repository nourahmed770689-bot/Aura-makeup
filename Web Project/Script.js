let cart = [];
const CART_STORAGE_KEY = 'auraCart';

function loadCartFromLocalStorage() {
    const storedCart = localStorage.getItem(CART_STORAGE_KEY);
    cart = storedCart ? JSON.parse(storedCart) : [];
}

function saveCartToLocalStorage() {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
}

function updateCartCount() {
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    document.querySelectorAll('#cartCount').forEach(el => {
        el.innerText = count;
    });
}

function getCartTotal() {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
}

function addToCart(product, price, button) {
    loadCartFromLocalStorage();

    const existingItem = cart.find(item => item.name === product && item.price === price);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ name: product, price: price, quantity: 1 });
    }

    saveCartToLocalStorage();
    updateCartCount();

    if (button) {
        button.classList.add('added');
        setTimeout(() => button.classList.remove('added'), 500);
    }
}

function renderCartItems() {
    loadCartFromLocalStorage();
    const cartContainer = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');

    if (!cartContainer || !cartTotal) return;

    cartContainer.innerHTML = '';

    if (cart.length === 0) {
        cartContainer.innerHTML = '<p>Your cart is empty. Add products to continue shopping.</p>';
        cartTotal.innerText = '0 EGP';
        return;
    }

    cart.forEach((item, index) => {
        const itemRow = document.createElement('div');
        itemRow.className = 'cart-item';
        itemRow.innerHTML = `
            <div class="cart-item-info">
                <span class="cart-item-name">${item.name}</span>
                <span class="cart-item-price">${item.price} EGP</span>
            </div>
            <div class="cart-item-controls">
                <button onclick="changeQuantity(${index}, -1)">-</button>
                <span>${item.quantity}</span>
                <button onclick="changeQuantity(${index}, 1)">+</button>
                <button onclick="removeCartItem(${index})">Remove</button>
            </div>
        `;
        cartContainer.appendChild(itemRow);
    });

    cartTotal.innerText = getCartTotal() + ' EGP';
}

function checkout() {
    loadCartFromLocalStorage();
    if (cart.length === 0) {
        alert('Your cart is empty. Add items before checkout.');
        return;
    }
    window.location.href = 'Checkout.html';
}

function changeQuantity(index, delta) {
    loadCartFromLocalStorage();
    if (!cart[index]) return;

    cart[index].quantity += delta;
    if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
    }

    saveCartToLocalStorage();
    updateCartCount();
    renderCartItems();
}

function removeCartItem(index) {
    loadCartFromLocalStorage();
    if (!cart[index]) return;
    cart.splice(index, 1);
    saveCartToLocalStorage();
    updateCartCount();
    renderCartItems();
}

function filterProducts(category, type) {
    let items = document.getElementsByClassName('card');
    for (let i = 0; i < items.length; i++) {
        const matchesCategory = category === 'all' || items[i].classList.contains(category);
        const matchesType = !type || items[i].dataset.type === type;
        if (matchesCategory && matchesType) {
            items[i].style.display = 'block';
        } else {
            items[i].style.display = 'none';
        }
    }
}

function toggleDropdown() {
    const dropdown = document.getElementById('dropdown-content');
    if (dropdown) {
        dropdown.classList.toggle('show');
    }
}

window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {
        const dropdowns = document.getElementsByClassName('dropdown-content');
        for (let i = 0; i < dropdowns.length; i++) {
            const openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
};

window.addEventListener('DOMContentLoaded', function() {
    loadCartFromLocalStorage();
    updateCartCount();
    renderCartItems();

    const dateElement = document.getElementById('date');
    if (dateElement) {
        const d = new Date();
        dateElement.innerText = d.toDateString();
    }

    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('category');
    const type = urlParams.get('type');
    const price = urlParams.get('price');
    if (price === 'over200') {
        filterProducts('over200');
    } else if (category) {
        filterProducts(category, type);
    } else if (document.querySelector('.products')) {
        filterProducts('all');
    }
});

// Hero Slider Functionality
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
const totalSlides = slides.length;

function showSlide(index) {
    const slidesContainer = document.querySelector('.slides-container');
    slidesContainer.style.transform = `translateX(-${index * 33.333}%)`;

    slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === index);
    });

    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
    });
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    showSlide(currentSlide);
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    showSlide(currentSlide);
}

function goToSlide(index) {
    currentSlide = index;
    showSlide(currentSlide);
}

function resetSlideInterval() {
    clearInterval(slideInterval);
    slideInterval = setInterval(nextSlide, 4000);
}

// Auto slide every 4 seconds
let slideInterval = setInterval(nextSlide, 4000);

// Dot click handlers
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        goToSlide(index);
        resetSlideInterval();
    });
});

const prevArrow = document.querySelector('.slider-arrow.prev');
const nextArrow = document.querySelector('.slider-arrow.next');

if (prevArrow) {
    prevArrow.addEventListener('click', () => {
        prevSlide();
        resetSlideInterval();
    });
}

if (nextArrow) {
    nextArrow.addEventListener('click', () => {
        nextSlide();
        resetSlideInterval();
    });
}

// Initialize
if (slides.length > 0) {
    showSlide(0);
}
function toggleFaceSubcategories() {
    const panel = document.getElementById('face-subcategories');

    if (!panel) return;

    panel.classList.toggle('hidden');

    if (!panel.classList.contains('hidden')) {
        panel.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}
document.addEventListener("DOMContentLoaded", function () {

    function createStars(rate) {
        let starsHTML = "";

        for (let i = 1; i <= 5; i++) {
            if (rate >= i) {
                starsHTML += `<i class="fas fa-star"></i>`;
            } else if (rate >= i - 0.5) {
                starsHTML += `<i class="fas fa-star-half-alt"></i>`;
            } else {
                starsHTML += `<i class="far fa-star"></i>`;
            }
        }

        return starsHTML;
    }

    document.querySelectorAll(".rating").forEach(rating => {
        let rate = parseFloat(rating.dataset.rate);
        let starsBox = rating.querySelector(".stars");

        starsBox.innerHTML = createStars(rate);

        // hover rating (تغيير اللون/التفاعل)
        let stars = starsBox.querySelectorAll("i");

        stars.forEach((star, index) => {
            star.addEventListener("mouseover", () => {
                stars.forEach((s, i) => {
                    s.style.color = i <= index ? "#850E35" : "#ccc";
                });
            });

            star.addEventListener("mouseout", () => {
                stars.forEach(s => {
                    s.style.color = "#850E35";
                });
            });
        });
    });

});

