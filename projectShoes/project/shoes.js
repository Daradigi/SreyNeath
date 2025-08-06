const navLinks = document.querySelectorAll(".nav-link");
const navMenu = document.querySelector('.nav-menu');
const menuOpenButton = document.querySelector("#menu-open-button");
const menuCloseButton = document.querySelector("#menu-close-button");

menuOpenButton.addEventListener("click", ()=>{
    //toggle mobile visibility
    document.body.classList.toggle("show-mobile-menu");
})

//close menu when the close button is clicked
menuCloseButton.addEventListener("click",()=> menuOpenButton.click());

//close menu when the nav link is clicked
navLinks.forEach(link => {
  link.addEventListener("click", () => menuOpenButton.click());
})


 // Modal gallery functions
function changeImage(element) {
    const mainImage = document.getElementById('mainProductImage');
    mainImage.src = element.src;
    
    // Update active thumbnail
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


const swiper = new Swiper('.slider-wrapper', {
  loop: true,
  grapCursor: true,
  spaceBetween: 25,
  autoplay: {
    delay: 3000,
  },
            
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
    dynamicBullets: true,
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },

  //responsive breakpoints
  breakpoints:{
    0: {
      slidesPerView: 1
    },
    768: {
      slidesPerView: 2
    },
    1024: {
      slidesPerView: 3
    },

  }
});

const productItems = document.querySelectorAll('.product-item');
const modal = document.getElementById('productModal');
const modalName = document.getElementById('modalProductName');
const modalDesc = document.getElementById('modalProductDescription');
const modalPrice = document.getElementById('modalProductPrice');
const modalClose = document.getElementById('modalClose');

productItems.forEach(item => {
  item.addEventListener('click', () => {
    modalName.textContent = item.dataset.name;
    modalDesc.textContent = item.dataset.description;
    modalPrice.textContent = item.dataset.price;
    modal.classList.remove('hidden');
  });
});

modalClose.addEventListener('click', () => {
  modal.classList.add('hidden');
});

// Optional: Close modal when clicking outside content
modal.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.classList.add('hidden');
  }
});










