let d = new Date();
document.getElementById("date").innerHTML = d.toDateString();
let cart = 0;

// Add to cart
function addToCart() {
    cart++;
    document.getElementById("cartCount").innerText = cart;
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
