document.addEventListener('DOMContentLoaded', function() {
    var products = [
        { id: 1, name: "Antique Pocket Watch", price: 250 },
        { id: 2, name: "Elegant Pearl Necklace", price: 300 },
        { id: 3, name: "Classic Lipstick", price: 50 },
        { id: 4, name: "Retro Perfume", price: 70 },
        { id: 5, name: "Luxury Sunglasses", price: 80 },
        { id: 6, name: "Chic Handbag", price: 120 }
    ];

    var cart = JSON.parse(localStorage.getItem('cart')) || [];

    function displayProducts(productsToDisplay) {
        var productsContainer = document.getElementById('products');
        productsContainer.innerHTML = '';
        let columns = ['', ''];
        productsToDisplay.forEach(function(product, index) {
            const productHtml = `
                <div class="product">
                    <h3>${product.name}</h3>
                    <p>Price: $${product.price}</p>
                    <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
                </div>
            `;
            columns[index % 2] += productHtml;
        });
        productsContainer.innerHTML = `
            <div class="product-column">${columns[0]}</div>
            <div class="product-column">${columns[1]}</div>
        `;
    }

    function displayCart() {
        var cartItemsContainer = document.getElementById('cart-items');
        cartItemsContainer.innerHTML = '';
        cart.forEach(function(item) {
            cartItemsContainer.innerHTML += `
                <li>
                    ${item.name} - $${item.price} 
                    <input type="number" class="quantity" data-id="${item.id}" value="${item.quantity}" min="1">
                    <button class="remove-from-cart" data-id="${item.id}">Remove</button>
                </li>
            `;
        });
        calculateTotal();
    }

    function calculateTotal() {
        var total = 0;
        var itemCount = 0;
        cart.forEach(function(item) {
            total += item.price * item.quantity;
            itemCount += item.quantity;
        });
        document.getElementById('total-price').textContent = total.toFixed(2);
        document.getElementById('item-count').textContent = itemCount;
    }

    function saveCart() {
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    document.getElementById('products').addEventListener('click', function(event) {
        if (event.target.classList.contains('add-to-cart')) {
            var id = parseInt(event.target.getAttribute('data-id'));
            var product = products.find(p => p.id === id);
            var cartItem = cart.find(item => item.id === id);

            if (cartItem) {
                cartItem.quantity++;
            } else {
                cart.push({ ...product, quantity: 1 });
            }
            displayCart();
            saveCart();
        }
    });

    document.getElementById('cart-items').addEventListener('click', function(event) {
        if (event.target.classList.contains('remove-from-cart')) {
            var id = parseInt(event.target.getAttribute('data-id'));
            cart = cart.filter(item => item.id !== id);
            displayCart();
            saveCart();
        }
    });

    document.getElementById('cart-items').addEventListener('input', function(event) {
        if (event.target.classList.contains('quantity')) {
            var id = parseInt(event.target.getAttribute('data-id'));
            var quantity = parseInt(event.target.value);
            var cartItem = cart.find(item => item.id === id);

            if (cartItem && quantity > 0) {
                cartItem.quantity = quantity;
            }
            displayCart();
            saveCart();
        }
    });

    document.getElementById('clear-cart').addEventListener('click', function() {
        cart = [];
        displayCart();
        saveCart();
    });

    document.getElementById('search-bar').addEventListener('input', function() {
        var searchTerm = document.getElementById('search-bar').value.toLowerCase();
        var filteredProducts = products.filter(function(product) {
            return product.name.toLowerCase().includes(searchTerm);
        });
        displayProducts(filteredProducts);
    });

    displayProducts(products);
    displayCart();

    // Login and Registration Modal Logic
    var loginBtn = document.getElementById('login-btn');
    var registerBtn = document.getElementById('register-btn');
    var loginModal = document.getElementById('login-modal');
    var registerModal = document.getElementById('register-modal');
    var closeButtons = document.getElementsByClassName('close');

    loginBtn.onclick = function() {
        loginModal.style.display = "block";
    }

    registerBtn.onclick = function() {
        registerModal.style.display = "block";
    }

    Array.from(closeButtons).forEach(function(button) {
        button.onclick = function() {
            button.closest('.modal').style.display = "none";
        }
    });

    window.onclick = function(event) {
        if (event.target == loginModal) {
            loginModal.style.display = "none";
        }
        if (event.target == registerModal) {
            registerModal.style.display = "none";
        }
    }

    document.getElementById('login-form').onsubmit = function(e) {
        e.preventDefault();
        // Handle login logic
        loginModal.style.display = "none";
        alert('Logged in!');
    }

    document.getElementById('register-form').onsubmit = function(e) {
        e.preventDefault();
        // Handle registration logic
        registerModal.style.display = "none";
        alert('Registered!');
    }
});
