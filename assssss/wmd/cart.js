// Cart functionality
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function updateCartCount() {
    document.querySelector(".cart-count").textContent = cart.length;
}

function addToCart(name, price) {
    const existingItem = cart.find(item => item.name === name);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ name, price, quantity: 1 });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    updateCart();
}

function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    updateCart();
}

function updateCart() {
    const cartItems = document.getElementById("cartItems");
    if (!cartItems) return;
    
    cartItems.innerHTML = "";
    let total = 0;
    
    cart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        
        const div = document.createElement("div");
        div.className = "cart-item";
        div.innerHTML = `
            <div class="cart-item-details">
                <span class="cart-item-name">${item.name}</span>
                <span class="cart-item-price">$${item.price}</span>
                <div class="cart-item-quantity">
                    <button onclick="updateQuantity(${index}, ${item.quantity - 1})">-</button>
                    <span>${item.quantity}</span>
                    <button onclick="updateQuantity(${index}, ${item.quantity + 1})">+</button>
                </div>
            </div>
            <button class="remove-btn" onclick="removeFromCart(${index})">Remove</button>
        `;
        cartItems.appendChild(div);
    });

    const totalDiv = document.createElement("div");
    totalDiv.className = "cart-total";
    totalDiv.innerHTML = `<strong>Total: $${total.toFixed(2)}</strong>`;
    cartItems.appendChild(totalDiv);
}

function updateQuantity(index, newQuantity) {
    if (newQuantity < 1) {
        removeFromCart(index);
        return;
    }
    cart[index].quantity = newQuantity;
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCart();
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = "none";
}

function buyNow(name, price) {
    cart = [{ name, price, quantity: 1 }];
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    window.location.href = 'checkout.html';
}

function goToCheckout() {
    closeModal("cartModal");
    window.location.href = 'checkout.html';
}

// Initialize cart count on page load
document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();
    if (document.querySelector(".cart-icon")) {
        document.querySelector(".cart-icon").onclick = () => {
            document.getElementById("cartModal").style.display = "flex";
            updateCart();
        };
    }
}); 