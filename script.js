let cartCount = 0;
let cartItems = [];

function addToCart(itemName, itemPrice) {
    cartCount++;
    document.getElementById("cart-count").innerText = cartCount;

    // Check if item already exists in cart
    let existingItem = cartItems.find(item => item.name === itemName);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cartItems.push({ name: itemName, price: itemPrice, quantity: 1 });
    }
    // Update cart display
    updateCartDisplay();
    // Show success message
    alert(`${itemName} has been added to your cart!`);
}

function updateCartDisplay() {
    let cartItemsContainer = document.getElementById("cart-items");
    let modalCartItemsContainer = document.getElementById("modal-cart-items");

    if (cartItems.length === 0) {
        cartItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
        if (modalCartItemsContainer) {
            modalCartItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
        }
    } else {
        let cartHTML = cartItems.map(item => `
            <div class="cart-item">
                <span>${item.name} x ${item.quantity}</span>
                <span>$${(item.price * item.quantity).toFixed(2)}</span>
                <button onclick="removeFromCart('${item.name}')">Remove</button>
            </div>
        `).join('');
        cartHTML += `<div class="cart-total">Total: $${calculateTotal().toFixed(2)}</div>`;
        cartItemsContainer.innerHTML = cartHTML;
        if (modalCartItemsContainer) {
            modalCartItemsContainer.innerHTML = cartHTML;
        }
    }
}

function removeFromCart(itemName) {
    let item = cartItems.find(item => item.name === itemName);
    if (item) {
        cartCount -= item.quantity;
        cartItems = cartItems.filter(item => item.name !== itemName);
        document.getElementById("cart-count").innerText = cartCount;
        updateCartDisplay();
    }
}

function calculateTotal() {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
}

function proceedToCheckout() {
    if (cartItems.length === 0) {
        alert("Your cart is empty!");
        return;
    }
    alert("Proceeding to checkout!");
}

function toggleCartModal() {
    const modal = document.getElementById("cart-modal");
    if (modal.style.display === "block") {
        modal.style.display = "none";
    } else {
        updateCartDisplay();
        modal.style.display = "block";
    }
}

// Event listener for closing the modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById("cart-modal");
    if (event.target === modal) {
        modal.style.display = "none";
    }
}
