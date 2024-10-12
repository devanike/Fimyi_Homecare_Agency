const toggle = document.querySelector(".toggle");
const menu = document.querySelector(".menu");
const menuItems = document.querySelectorAll('.menu .item a');

/* Toggle mobile menu */
function toggleMenu() {
    if (menu.classList.contains("active")) {
        menu.classList.remove("active");
        toggle.querySelector("a").innerHTML = "<i class='fas fa-bars'></i>";
    } else {
        menu.classList.add("active");
        toggle.querySelector("a").innerHTML = "<i class='fas fa-times'></i>";
    }
}
toggle.addEventListener("click", toggleMenu, false);

// NOT WORKING YET
// adding active class to nav items when clicked
menuItems.forEach(item => {
    item.addEventListener('click', () => {
        menuItems.forEach(el => el.classList.remove('active-item'));
        item.classList.add('active-item');
    });
});

// services slide
const carousel = document.querySelector(".carousel");
const arrowBtns = document.querySelectorAll(".wrapper i");
const wrapper = document.querySelector(".wrapper");

const firstCard = carousel.querySelector(".card");
const firstCardWidth = firstCard.offsetWidth;

let isDragging = false,
    startX,
    startScrollLeft,
    timeoutId;

const dragStart = (e) => { 
    isDragging = true;
    carousel.classList.add("dragging");
    startX = e.pageX;
    startScrollLeft = carousel.scrollLeft;
};

const dragging = (e) => {
    if (!isDragging) return;

    const newScrollLeft = startScrollLeft - (e.pageX - startX);

    if (newScrollLeft <= 0 || newScrollLeft >= 
        carousel.scrollWidth - carousel.offsetWidth) {
        
        isDragging = false;
        return;
    }
    carousel.scrollLeft = newScrollLeft;
};

const dragStop = () => {
    isDragging = false; 
    carousel.classList.remove("dragging");
};

const autoPlay = () => {
    if (window.innerWidth < 800) return; 

    const totalCardWidth = carousel.scrollWidth;
    const maxScrollLeft = totalCardWidth - carousel.offsetWidth;

    if (carousel.scrollLeft >= maxScrollLeft) {
        carousel.scrollLeft = 0;
    }

    timeoutId = setTimeout(() => {
        carousel.scrollLeft += firstCardWidth;
        autoPlay();
    }, 2500);
};

carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("mousemove", dragging);
document.addEventListener("mouseup", dragStop);
wrapper.addEventListener("mouseenter", () => 
    clearTimeout(timeoutId));
wrapper.addEventListener("mouseleave", autoPlay);

// quotes slideshow
let slideIndex = 0;
let slides = document.querySelectorAll(".quote-slide");

function showSlides() {
    const isMobile = window.innerWidth <= 768; // Check if mobile view
    const slidesToShow = isMobile ? 1 : 3;

    slides.forEach(slide => slide.classList.remove("active"));

    for (let i = 0; i < slidesToShow; i++) {
        let currentIndex = (slideIndex + i) % slides.length;
        slides[currentIndex].classList.add("active");
    }

    slideIndex += slidesToShow;
    if (slideIndex >= slides.length) {
        slideIndex = 0; 
    }
    
    setTimeout(showSlides, 3000);
}

showSlides();


