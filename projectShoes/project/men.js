let cart = [];
const cartIcon = document.getElementById("cart-icon");
const modalAddToCartBtn = document.getElementById("modalAddToCart");
const cartModal = document.getElementById("cart-modal");
const closeCartBtn = document.getElementById("close-cart");
const cartItemsContainer = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const cartCount = document.getElementById("cart-count");

function addToCart(product) {
  const existingItem = cart.find(item => item.id === product.id && item.size === product.size);
  if (existingItem) {
    existingItem.quantity += product.quantity;
  } else {
    cart.push(product);
  }
  updateCartCount();
  updateCartUI();
  saveCartToLocalStorage();
  showCartNotification(product.name);
}

function removeFromCart(index) {
  if (index >= 0 && index < cart.length) {
    cart.splice(index, 1);
    updateCartCount();
    updateCartUI();
    saveCartToLocalStorage();
  }
}

if (modalAddToCart) {
  modalAddToCart.addEventListener('click', function() {
    const product = {
      id: document.querySelector('#myModal').dataset.productId || Date.now().toString(),
      name: document.querySelector('.modal h2').textContent,
      price: parseFloat(document.querySelector('.current-price').textContent.replace('After Discount: $', '')),
      image: document.getElementById('mainProductImage').src,
      size: document.querySelector('.btn-group input:checked')?.nextElementSibling.textContent || 'M',
      quantity: parseInt(document.getElementById('quantityInput').value)
    };

    addToCart(product);

    const modal = bootstrap.Modal.getInstance(document.getElementById('myModal'));
    modal.hide();
  });
}

function updateCartCount() {
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
  cartCount.textContent = totalItems;
  cartCount.style.display = totalItems > 0 ? 'inline' : 'none';
}

function updateCartUI() {
  cartItemsContainer.innerHTML = "";
  let total = 0;
  cart.forEach((item, index) => {
    const li = document.createElement("li");
    li.className = "cart-item d-flex align-items-center mb-3";
    li.innerHTML = `
      <div class="flex-shrink-0">
        <img src="${item.image}" alt="${item.name}" width="60" class="img-thumbnail">
      </div>
      <div class="flex-grow-1 ms-3">
        <h6 class="mb-1">${item.name}</h6>
        <small class="text-muted">Size: ${item.size}</small>
        <div class="d-flex justify-content-between align-items-center mt-2">
          <div class="quantity-controls">
            <button class="btn btn-sm btn-outline-secondary decrease-quantity" data-index="${index}">-</button>
            <span class="mx-2">${item.quantity}</span>
            <button class="btn btn-sm btn-outline-secondary increase-quantity" data-index="${index}">+</button>
          </div>
          <div class="price">$${(item.price * item.quantity).toFixed(2)}</div>
        </div>
      </div>
      <button class="btn btn-sm btn-danger remove-item ms-3" data-index="${index}">
        <i class="fas fa-trash"></i>
      </button>
    `;
    cartItemsContainer.appendChild(li);
    total += item.price * item.quantity;
  });
  cartTotal.textContent = total.toFixed(2);

  // Add event listeners to all remove buttons
  document.querySelectorAll('.remove-item').forEach(button => {
    button.addEventListener('click', function() {
      const index = parseInt(this.dataset.index);
      removeFromCart(index);
    });
  });

  // Add event listeners for quantity controls
  document.querySelectorAll('.decrease-quantity').forEach(button => {
    button.addEventListener('click', function() {
      const index = parseInt(this.dataset.index);
      if (cart[index].quantity > 1) {
        cart[index].quantity--;
        updateCartUI();
        saveCartToLocalStorage();
      } else {
        removeFromCart(index);
      }
    });
  });

  document.querySelectorAll('.increase-quantity').forEach(button => {
    button.addEventListener('click', function() {
      const index = parseInt(this.dataset.index);
      cart[index].quantity++;
      updateCartUI();
      saveCartToLocalStorage();
    });
  });
}

function saveCartToLocalStorage() {
  localStorage.setItem('shoppingCart', JSON.stringify(cart));
}

function loadCartFromLocalStorage() {
  const savedCart = localStorage.getItem('shoppingCart');
  if (savedCart) {
    cart = JSON.parse(savedCart);
    updateCartCount();
    updateCartUI();
  }
}

function showCartNotification(productName) {
  const notification = document.createElement('div');
  notification.className = 'cart-notification';
  notification.innerHTML = `
    <span>${productName} added to cart!</span>
    <a href="#" class="view-cart">View Cart</a>
  `;
  document.body.appendChild(notification);
  setTimeout(() => {
    notification.classList.add('fade-out');
    setTimeout(() => notification.remove(),0);
  }, 0);

  notification.querySelector('.view-cart').addEventListener('click', (e) => {
    e.preventDefault();
    updateCartUI();
    cartModal.classList.remove("hidden");
    notification.remove();
  });
}

document.addEventListener('DOMContentLoaded', function() {
  loadCartFromLocalStorage();

  document.querySelectorAll('.product-item .add-to-cart').forEach(button => {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      const productItem = this.closest('.product-item');
      const product = {
        id: productItem.dataset.productId || Date.now().toString(),
        name: productItem.querySelector('.name').textContent,
        price: parseFloat(productItem.dataset.price) || 49.99,
        image: productItem.querySelector('img').src,
        size: 'M',
        quantity: 1
      };
      addToCart(product);
    });
  });

  cartIcon.addEventListener("click", () => {
    updateCartUI();
    cartModal.classList.remove("hidden");
  });

  closeCartBtn.addEventListener("click", () => {
    cartModal.classList.add("hidden");
  });
});


// Mobile menu functionality
const navLinks = document.querySelectorAll(".nav-link");
const navMenu = document.querySelector('.nav-menu');
const menuOpenButton = document.querySelector("#menu-open-button");
const menuCloseButton = document.querySelector("#menu-close-button");

menuOpenButton.addEventListener("click", ()=>{
    document.body.classList.toggle("show-mobile-menu");
})

menuCloseButton.addEventListener("click",()=> menuOpenButton.click());

navLinks.forEach(link => {
  link.addEventListener("click", () => menuOpenButton.click());
})

// Modal gallery functions
function changeImage(element) {
    const mainImage = document.getElementById('mainProductImage');
    mainImage.src = element.src;
    
    document.querySelectorAll('.thumbnail-images .img-thumbnail').forEach(thumb => {
        thumb.classList.remove('active');
    });
    element.classList.add('active');
}

// Quantity selector functions
function increaseQuantity() {
    const quantityInput = document.getElementById('quantityInput');
    let quantity = parseInt(quantityInput.value);
    quantityInput.value = quantity + 1;
}

function decreaseQuantity() {
    const quantityInput = document.getElementById('quantityInput');
    let quantity = parseInt(quantityInput.value);
    if (quantity > 1) {
        quantityInput.value = quantity - 1;
    }
}