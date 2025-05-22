document.addEventListener('DOMContentLoaded', function() {
    // Initialize Bootstrap tooltips
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    const tooltipList = tooltipTriggerList.map(function(tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });

    // Sticky navbar functionality
    const navbar = document.querySelector('.navbar');
    const navbarHeight = navbar.offsetHeight;
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > navbarHeight) {
            navbar.classList.add('fixed-top', 'shadow');
        } else {
            navbar.classList.remove('fixed-top', 'shadow');
        }
    });

    // Course carousel configuration
    const courseCarousel = document.querySelector('#courseCarousel');
    if (courseCarousel) {
        const carousel = new bootstrap.Carousel(courseCarousel, {
            interval: false, // Don't auto-rotate like Udemy
            wrap: true,
            touch: true
        });
        
        // Add hover effects to carousel navigation
        const carouselPrev = courseCarousel.querySelector('.carousel-control-prev');
        const carouselNext = courseCarousel.querySelector('.carousel-control-next');
        
        // Show/hide navigation on mouse enter/leave for desktop
        if (window.innerWidth >= 992) {
            carouselPrev.style.opacity = '0';
            carouselNext.style.opacity = '0';
            
            courseCarousel.addEventListener('mouseenter', function() {
                carouselPrev.style.opacity = '1';
                carouselNext.style.opacity = '1';
            });
            
            courseCarousel.addEventListener('mouseleave', function() {
                carouselPrev.style.opacity = '0';
                carouselNext.style.opacity = '0';
            });
        }
        
        // Add responsive behavior
        function adjustCarousel() {
            if (window.innerWidth < 768) {
                // On mobile, adjust the carousel to show one card at a time
                document.querySelectorAll('#courseCarousel .col-sm-6').forEach(col => {
                    col.classList.add('col-12');
                });
            } else {
                // On desktop, restore grid columns
                document.querySelectorAll('#courseCarousel .col-12').forEach(col => {
                    col.classList.remove('col-12');
                });
            }
        }
        
        // Call once on load and add resize listener
        adjustCarousel();
        window.addEventListener('resize', adjustCarousel);
    }

    // Course tabs functionality
    const courseTabs = document.querySelectorAll('#courseTabs button');
    
    courseTabs.forEach(tab => {
        tab.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('data-bs-target');
            
            // Remove active class from all tabs and hide all tab content
            document.querySelectorAll('#courseTabs button').forEach(t => {
                t.classList.remove('active');
            });
            
            document.querySelectorAll('#courseTabsContent .tab-pane').forEach(content => {
                content.classList.remove('show', 'active');
            });
            
            // Add active class to clicked tab and show corresponding content
            this.classList.add('active');
            document.querySelector(targetId).classList.add('show', 'active');
        });
    });

    // Mobile search toggle
    const mobileSearchBtn = document.querySelector('.navbar-toggler');
    const mobileSearchForm = document.querySelector('.search-container');
    
    if (mobileSearchBtn && mobileSearchForm) {
        mobileSearchBtn.addEventListener('click', function() {
            mobileSearchForm.classList.toggle('d-none');
        });
    }

    // Course card hover effect for ratings
    const courseCards = document.querySelectorAll('.card');
    
    courseCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const rating = this.querySelector('.rating');
            if (rating) {
                rating.style.color = '#f69c08';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            const rating = this.querySelector('.rating');
            if (rating) {
                rating.style.color = '';
            }
        });
    });

    // Simulate loading more courses
    const exploreButtons = document.querySelectorAll('.btn-outline-dark');
    
    exploreButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            this.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Loading...';
            
            // Simulate loading time
            setTimeout(() => {
                this.innerHTML = 'Explore Web Development';
            }, 1500);
        });
    });
}); 