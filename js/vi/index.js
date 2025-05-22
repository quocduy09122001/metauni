AOS.init({
    duration: 1000,
    once: true,
    offset: 100
});
// Simple JavaScript for interactive elements
document.addEventListener('DOMContentLoaded', function () {
    // Mobile search toggle
    const searchToggle = document.querySelector('.navbar-toggler');
    const searchBox = document.querySelector('.search-box');

    if (searchToggle && searchBox) {
        searchToggle.addEventListener('click', function () {
            if (window.innerWidth < 992) {
                searchBox.classList.toggle('d-none');
            }
        });
    }

    // Handle window resize
    window.addEventListener('resize', function () {
        if (window.innerWidth >= 992 && searchBox) {
            searchBox.classList.remove('d-none');
        }
    });

    // Course hover effect
    const courseCards = document.querySelectorAll('.course-card');
    courseCards.forEach(card => {
        card.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-5px)';
        });

        card.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0)';
        });
    });
});
// Partner logos infinite scroll
const partnersTrack = document.querySelector('.partners-track');
if (partnersTrack) {
    const partnerLogos = partnersTrack.querySelectorAll('.partner-logo');
    const totalWidth = Array.from(partnerLogos).reduce((width, logo) => width + logo.offsetWidth, 0);
    
    // Clone logos for seamless loop
    partnerLogos.forEach(logo => {
        const clone = logo.cloneNode(true);
        partnersTrack.appendChild(clone);
    });
}
// Partner logos hover effect
const partnerLogos = document.querySelectorAll('.partner-logo img');
partnerLogos.forEach(logo => {
    logo.addEventListener('mouseenter', function() {
        // this.style.filter = 'grayscale(0%)';
        this.parentElement.style.transform = 'translateY(-5px)';
    });
    
    logo.addEventListener('mouseleave', function() {
        // this.style.filter = 'grayscale(100%)';
        this.parentElement.style.transform = 'translateY(0)';
    });
});
// Partner logos animation control
if (partnersTrack) {
    partnersTrack.addEventListener('mouseenter', function() {
        this.style.animationPlayState = 'paused';
    });
    
    partnersTrack.addEventListener('mouseleave', function() {
        this.style.animationPlayState = 'running';
    });
}

