let d = new Date();
document.getElementById("date").innerHTML = d.toDateString();
let cart = 0;

// Add to cart
function addToCart(product, price) {
    if (price) {
        cart += price;
    } else {
        cart++;
    }
    document.getElementById("cartCount").innerText = cart;
    // Add animation to button
    let button = event.target;
    button.classList.add('added');
    setTimeout(() => button.classList.remove('added'), 500);
}

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

// Toggle dropdown
function toggleDropdown() {
    document.getElementById("dropdown-content").classList.toggle("show");
}

// Close dropdown when clicking outside
window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        for (var i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}

// Filter on page load based on URL
window.onload = function() {
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('category');
    if (category) {
        filterProducts(category);
    } else {
        filterProducts("all");
    }
}
