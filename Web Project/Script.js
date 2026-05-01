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
// ========== SEARCH POPUP FUNCTIONS ==========

function openSearchPopup() {
    const overlay = document.getElementById('searchOverlay');
    if (overlay) {
        overlay.classList.add('show');
        setTimeout(() => {
            const input = document.getElementById('searchPopupInput');
            if (input) input.focus();
        }, 100);
    }
}

function closeSearchPopup() {
    const overlay = document.getElementById('searchOverlay');
    if (overlay) {
        overlay.classList.remove('show');
    }
}

function closeSearchPopupOnOverlay(event) {
    if (event.target === document.getElementById('searchOverlay')) {
        closeSearchPopup();
    }
}

// دالة البحث الرئيسية
function performSearch() {
    const searchTerm = document.getElementById('searchPopupInput').value.toLowerCase().trim();
    
    console.log("Searching for:", searchTerm); // للتأكد من الشغل
    
    // لو مافيش كلمة بحث، أغلق وخلص
    if (searchTerm === '') {
        closeSearchPopup();
        return;
    }
    
    const allProducts = document.querySelectorAll('.products .card');
    
    // لو مش في صفحة المنتجات، حول المستخدم
    if (allProducts.length === 0) {
        closeSearchPopup();
        window.location.href = 'Products.html?search=' + encodeURIComponent(searchTerm);
        return;
    }
    
    // تنقية المنتجات
    let hasVisibleProducts = false;
    
    allProducts.forEach(product => {
        // جلب اسم المنتج (أول عنصر p)
        let productName = "";
        const productNameElement = product.querySelector('p:first-of-type');
        if (productNameElement) {
            productName = productNameElement.innerText.toLowerCase();
        }
        
        // جلب اسم المنتج من عناصر تانية لو لازم
        const productTitle = product.querySelector('h3');
        if (productTitle && productName === "") {
            productName = productTitle.innerText.toLowerCase();
        }
        
        console.log("Product:", productName, "Includes?", productName.includes(searchTerm));
        
        if (productName.includes(searchTerm)) {
            product.style.display = 'block';
            hasVisibleProducts = true;
        } else {
            product.style.display = 'none';
        }
    });
    
    // إظهار رسالة إذا مافيش نتائج
    let noResultsMsg = document.getElementById('noResultsMsg');
    if (!hasVisibleProducts) {
        if (!noResultsMsg) {
            noResultsMsg = document.createElement('div');
            noResultsMsg.id = 'noResultsMsg';
            noResultsMsg.style.textAlign = 'center';
            noResultsMsg.style.padding = '40px';
            noResultsMsg.style.fontSize = '18px';
            noResultsMsg.style.color = '#561C24';
            noResultsMsg.style.background = '#fff';
            noResultsMsg.style.borderRadius = '15px';
            noResultsMsg.style.margin = '30px auto';
            noResultsMsg.style.maxWidth = '500px';
            noResultsMsg.innerHTML = `
                <i class="fas fa-search" style="font-size: 48px; color: #ccc; margin-bottom: 15px; display: block;"></i>
                ❌ No products found matching "<strong style="color:#EE6983">${searchTerm}</strong>"
                <br><br>
                <button onclick="resetSearch()" style="background: #703B3B; color: white; border: none; padding: 10px 25px; border-radius: 25px; cursor: pointer;">Clear Search</button>
            `;
            const productsContainer = document.querySelector('.products');
            if (productsContainer) {
                productsContainer.parentNode.insertBefore(noResultsMsg, productsContainer);
            }
        } else {
            noResultsMsg.innerHTML = `
                <i class="fas fa-search" style="font-size: 48px; color: #ccc; margin-bottom: 15px; display: block;"></i>
                ❌ No products found matching "<strong style="color:#EE6983">${searchTerm}</strong>"
                <br><br>
                <button onclick="resetSearch()" style="background: #703B3B; color: white; border: none; padding: 10px 25px; border-radius: 25px; cursor: pointer;">Clear Search</button>
            `;
            noResultsMsg.style.display = 'block';
        }
    } else if (noResultsMsg) {
        noResultsMsg.style.display = 'none';
    }
    
    closeSearchPopup();
}

// دالة إعادة ضبط البحث
function resetSearch() {
    const allProducts = document.querySelectorAll('.products .card');
    allProducts.forEach(product => {
        product.style.display = 'block';
    });
    
    const noResultsMsg = document.getElementById('noResultsMsg');
    if (noResultsMsg) {
        noResultsMsg.style.display = 'none';
    }
    
    const searchInput = document.getElementById('searchPopupInput');
    if (searchInput) {
        searchInput.value = '';
    }
}

// دالة لإظهار كل المنتجات (للتأكد)
function showAllProducts() {
    const allProducts = document.querySelectorAll('.products .card');
    allProducts.forEach(product => {
        product.style.display = 'block';
    });
    const noResultsMsg = document.getElementById('noResultsMsg');
    if (noResultsMsg) {
        noResultsMsg.style.display = 'none';
    }
}

// البحث عند الضغط على Enter
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchPopupInput');
    if (searchInput) {
        searchInput.addEventListener('keypress', function(event) {
            if (event.key === 'Enter') {
                event.preventDefault();
                performSearch();
            }
        });
    }
    
    // لو في search query في الرابط (مثلاً Products.html?search=gloss)
    const urlParams = new URLSearchParams(window.location.search);
    const searchQuery = urlParams.get('search');
    if (searchQuery && document.getElementById('searchPopupInput')) {
        document.getElementById('searchPopupInput').value = searchQuery;
        setTimeout(() => {
            performSearch();
        }, 300);
    }
});
// ========== NEWSLETTER SUBSCRIPTION ==========
function subscribeNewsletter(event) {
    event.preventDefault();
    const email = document.getElementById('newsletterEmail').value;
    
    if (email) {
        showToast(`📧 Thanks for subscribing! Check your inbox.`);
        document.getElementById('newsletterEmail').value = '';
    }
}
// ========== SCROLL TO OFFERS SECTION ==========
function scrollToOffers() {
    const offersSection = document.querySelector('.hero-slider');
    if (offersSection) {
        offersSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}
// ========== LOGIN & SIGNUP MODALS ==========
function openLoginModal() {
    document.getElementById('loginModal').classList.add('show');
}

function closeLoginModal() {
    document.getElementById('loginModal').classList.remove('show');
}

function openSignupModal() {
    document.getElementById('signupModal').classList.add('show');
}

function closeSignupModal() {
    document.getElementById('signupModal').classList.remove('show');
}

// إغلاق المودال إذا ضغط المستخدم خارجها
window.onclick = function(event) {
    const loginModal = document.getElementById('loginModal');
    const signupModal = document.getElementById('signupModal');
    if (event.target === loginModal) {
        closeLoginModal();
    }
    if (event.target === signupModal) {
        closeSignupModal();
    }
}

// التحقق من صحة الإيميل
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// تسجيل الدخول (يطلب الاسم + الإيميل + كلمة المرور)
function loginUser(event) {
    event.preventDefault();
    const name = document.getElementById('loginName').value.trim();
    const email = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value;
    
    // التحقق من صحة الإيميل
    if (!isValidEmail(email)) {
        showNewsletterMessage('❌ Please enter a valid email address (e.g., name@example.com)', 'error');
        return;
    }
    
    // التحقق من وجود المستخدم
    const users = JSON.parse(localStorage.getItem('auraUsers')) || [];
    const user = users.find(u => u.name === name && u.email === email && u.password === password);
    
    if (user) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        showToast(`Welcome back, ${user.name}! ✨`);
        closeLoginModal();
        updateAuthButtons(user.name);
        // تفريغ الحقول
        document.getElementById('loginName').value = '';
        document.getElementById('loginEmail').value = '';
        document.getElementById('loginPassword').value = '';
    } else {
        showNewsletterMessage('❌ Invalid name, email, or password', 'error');
    }
}

// إنشاء حساب جديد
function signupUser(event) {
    event.preventDefault();
    const name = document.getElementById('signupName').value.trim();
    const email = document.getElementById('signupEmail').value.trim();
    const password = document.getElementById('signupPassword').value;
    
    // التحقق من صحة الإيميل
    if (!isValidEmail(email)) {
        showNewsletterMessage('❌ Please enter a valid email address (e.g., name@example.com)', 'error');
        return;
    }
    
    let users = JSON.parse(localStorage.getItem('auraUsers')) || [];
    
    // التحقق إذا الإيميل موجود
    if (users.find(u => u.email === email)) {
        showNewsletterMessage('❌ Email already registered!', 'error');
        return;
    }
    
    // التحقق إذا الاسم موجود
    if (users.find(u => u.name === name)) {
        showNewsletterMessage('❌ Username already taken!', 'error');
        return;
    }
    
    // إضافة المستخدم الجديد
    const newUser = { name, email, password };
    users.push(newUser);
    localStorage.setItem('auraUsers', JSON.stringify(users));
    localStorage.setItem('currentUser', JSON.stringify(newUser));
    
    showToast(`🎉 Welcome to AURA, ${name}!`);
    closeSignupModal();
    updateAuthButtons(name);
    
    // تفريغ الحقول
    document.getElementById('signupName').value = '';
    document.getElementById('signupEmail').value = '';
    document.getElementById('signupPassword').value = '';
}

// تحديث أزرار Log In/Sign Up بعد التسجيل
function updateAuthButtons(userName) {
    const loginBtn = document.querySelector('.auth-link.login');
    const signupBtn = document.querySelector('.auth-link.signup');
    
    if (loginBtn && signupBtn) {
        loginBtn.innerHTML = `👤 ${userName}`;
        loginBtn.href = "#";
        loginBtn.onclick = () => showToast(`✅ Logged in as ${userName}`);
        
        signupBtn.innerHTML = "Logout";
        signupBtn.classList.remove('signup');
        signupBtn.classList.add('login');
        signupBtn.onclick = () => logout();
    }
}

// تسجيل الخروج
function logout() {
    localStorage.removeItem('currentUser');
    showToast('👋 You have been logged out');
    setTimeout(() => {
        location.reload();
    }, 500);
}

// التحقق من وجود مستخدم مسجل عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser && currentUser.name) {
        updateAuthButtons(currentUser.name);
    }
});

// Toast message function (إذا مش موجودة)
function showToast(message) {
    let toast = document.querySelector('.toast-notification');
    if (toast) toast.remove();
    
    toast = document.createElement('div');
    toast.className = 'toast-notification';
    toast.innerHTML = message;
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.opacity = '0';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}