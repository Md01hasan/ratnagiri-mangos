document.addEventListener("DOMContentLoaded", () => {
    updateCartUI();
});

// Get cart from localStorage
function getCartItems() {
    return JSON.parse(localStorage.getItem("cart")) || [];
}

// Save cart to localStorage
function saveCartItems(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
}

// Update Cart UI
function updateCartUI() {
    const cartItemsContainer = document.getElementById("cart-items");
    const totalAmount = document.getElementById("total-amount");
    const cartCount = document.getElementById("cart-count");

    if (!cartItemsContainer || !totalAmount || !cartCount) {
        console.error("Cart elements not found in the DOM.");
        return;
    }

    let cart = getCartItems();
    cartItemsContainer.innerHTML = "";

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
        totalAmount.textContent = "0";
        cartCount.textContent = "0";
        return;
    }

    let total = 0;

    cart.forEach((item, index) => {
        const cartItem = document.createElement("div");
        cartItem.classList.add("cart-item");

        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="cart-item-img" style="width: 80px; height: 80px;">
            <div class="cart-item-details">
                <h3>${item.name}</h3>
                <p>Price: ₹${item.price}</p>
                <div class="quantity">
                    <button class="decrease" onclick="updateQuantity(${index}, -1)">-</button>
                    <span>${item.quantity}</span>
                    <button class="increase" onclick="updateQuantity(${index}, 1)">+</button>
                </div>
                <button class="remove-item" onclick="removeFromCart(${index})">Remove</button>
            </div>
        `;

        cartItemsContainer.appendChild(cartItem);
        total += item.price * item.quantity;
    });

    totalAmount.textContent = total;
    cartCount.textContent = cart.length;
}

// Add item to cart
function addToCart(id, name, price, image) {
    let cart = getCartItems();
    let existingItem = cart.find(item => item.id === id);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ id, name, price, image, quantity: 1 });
    }

    saveCartItems(cart);
    updateCartUI();
}

// Update quantity
function updateQuantity(index, change) {
    let cart = getCartItems();

    if (cart[index]) {
        cart[index].quantity += change;

        if (cart[index].quantity <= 0) {
            cart.splice(index, 1);
        }
    }

    saveCartItems(cart);
    updateCartUI();
}

// Remove item from cart
function removeFromCart(index) {
    let cart = getCartItems();
    cart.splice(index, 1);
    saveCartItems(cart);
    updateCartUI();
}

// Proceed to Payment
document.addEventListener("click", (event) => {
    if (event.target.id === "proceed-to-payment") {
        window.location.href = "checkout.html";
    }
});
document.addEventListener("DOMContentLoaded", () => {
    updateCartUI();
    updateCartCount(); // Ensure cart count updates across all pages
});

// Update cart count in the navbar
function updateCartCount() {
    const cartCount = document.getElementById("cart-count");
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    if (cartCount) {
        cartCount.textContent = cart.reduce((total, item) => total + item.quantity, 0);
    }
}

// Modify addToCart function to update count
function addToCart(id, name, price, image) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let existingItem = cart.find(item => item.id === id);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ id, name, price, image, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartUI();
    updateCartCount(); // Update count immediately
}

// Modify removeFromCart function to update count
function removeFromCart(index) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));

    updateCartUI();
    updateCartCount(); // Update count after removing
}

// Modify updateQuantity function to update count
function updateQuantity(index, change) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    if (cart[index]) {
        cart[index].quantity += change;
        if (cart[index].quantity <= 0) {
            cart.splice(index, 1);
        }
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartUI();
    updateCartCount(); // Update count after quantity change
}
let testItem = `
    <div class="cart-item">
        <img src="banana.jpg" alt="Banana">
        <div class="item-details">
            <h3>Organic Bananas</h3>
            <p class="product-price">₹60</p>
        </div>
        <div class="product-controls">
            <button class="quantity-btn">-</button>
            <input type="number" class="quantity" value="1" min="1">
            <button class="quantity-btn">+</button>
            <button class="remove-btn">Remove</button>
        </div>
    </div>`;
document.getElementById("cart-items").innerHTML += testItem;
