
document.addEventListener('DOMContentLoaded', function() {
    var typed = new Typed(".text", {
        strings: ["Frontend Developer", "Web Designer", "Web Developer"],
        typeSpeed: 100,
        backSpeed: 100,
        backDelay: 1000,
        loop: true
    });
});

// Form submission handling
document.querySelector('.contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form values
    const name = this.querySelector('input[type="text"]').value;
    const email = this.querySelector('input[type="email"]').value;
    const message = this.querySelector('textarea').value;
    
    // Here you would typically send the data to a server
    console.log('Form submitted:', { name, email, message });
    
    // Show success message
    alert('Thank you for your message! I will get back to you soon.');
    
    // Reset form
    this.reset();
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});



// Navbar Toggle
const hamburger = document.querySelector('.hamburger');
const navbar = document.querySelector('.navbar');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navbar.classList.toggle('active');
});

// Close navbar when clicking on a link
document.querySelectorAll('.navbar a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navbar.classList.remove('active');
    });
});

// Close navbar when scrolling
window.addEventListener('scroll', () => {
    if (window.innerWidth <= 992) {
        hamburger.classList.remove('active');
        navbar.classList.remove('active');
    }
});

// In your main.js file
document.addEventListener('DOMContentLoaded', function() {
    const navbarLinks = document.querySelectorAll('.navbar a');
    
    navbarLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active from all
            navbarLinks.forEach(item => item.classList.remove('active'));
            
            // Add to clicked
            this.classList.add('active');
            
            // Scroll to section
            const target = document.querySelector(this.getAttribute('href'));
            target.scrollIntoView({ behavior: 'smooth' });
        });
    });
    
    // Highlight current section while scrolling
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        
        document.querySelectorAll('section').forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const id = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                document.querySelector(`.navbar a[href="#${id}"]`)?.classList.add('active');
            } else {
                document.querySelector(`.navbar a[href="#${id}"]`)?.classList.remove('active');
            }
        });
    });
});