// Cart functionality
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Update cart count in the header
function updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    if (cartCount) {
        cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
    }
}

// Add item to cart
function addToCart(product) {
    const existingProduct = cart.find(item => item.id === product.id);
    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    renderCartItems();
}

// Remove item from cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    renderCartItems();
}

// Update item quantity in cart
function updateQuantity(productId, quantity) {
    const product = cart.find(item => item.id === productId);
    if (product) {
        product.quantity = parseInt(quantity, 10);
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    renderCartItems();
}

// Render cart items on the cart page
function renderCartItems() {
    const cartItemsContainer = document.querySelector('.cart-items');
    if (cartItemsContainer) {
        cartItemsContainer.innerHTML = cart.map(item => `
            <div class="cart-item">
                <h3>${item.name}</h3>
                <p>$${item.price}</p>
                <input type="number" value="${item.quantity}" min="1" onchange="updateQuantity(${item.id}, this.value)">
                <button class="remove-btn" data-id="${item.id}">Remove</button>
            </div>
        `).join('');
        const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
        document.getElementById('cart-total').textContent = `$${total}`;
    }
}

// Handle "Add to Cart" button clicks
document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();
    renderCartItems();

    // Add event listeners for "Add to Cart" buttons
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', () => {
            const product = {
                id: button.getAttribute('data-id'),
                name: button.getAttribute('data-name'),
                price: parseFloat(button.getAttribute('data-price'))
            };
            addToCart(product);
        });
    });

    // Handle checkout form submission
    document.getElementById('checkout-form')?.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Order placed successfully!');
        localStorage.removeItem('cart');
        window.location.href = 'index.html';
    });
});

// Event delegation for remove buttons
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('remove-btn')) {
        const productId = e.target.getAttribute('data-id');
        removeFromCart(productId);
    }
});







document.addEventListener("DOMContentLoaded", function () {
    const filterButtons = document.querySelectorAll(".btn-col");
    const collectionItems = document.querySelectorAll(".collection-item");

    filterButtons.forEach(button => {
        button.addEventListener("click", () => {
            const filterValue = button.getAttribute("data-btn");

            collectionItems.forEach(item => {
                if (filterValue === "all" || item.getAttribute("data-item") === filterValue) {
                    item.style.display = "block";
                } else {
                    item.style.display = "none";
                }
            });

            // Optional: Toggle active class for selected button
            filterButtons.forEach(btn => btn.classList.remove("active"));
            button.classList.add("active");
        });
    });
});
