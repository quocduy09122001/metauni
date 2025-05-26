
document.querySelectorAll('.cat-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const category = btn.getAttribute('data-filter');
        news_categories_mb_5(category);
    });
});

function news_categories_mb_5(category = "All") {
    let url = "http://127.0.0.1:8000/news/products_1";
    fetch(url)
        .then(response => {
            if (!response.ok) throw new Error("Không thể tải danh sách sản phẩm");
            return response.json();
        })
        .then(data => {
            const container = document.getElementById("data_content");
            container.innerHTML = '';

            if (data.products.length === 0) {
                container.innerHTML = '<div class="text-muted">Chưa có sản phẩm nào.</div>';
                return;
            }

            const cards = data.products.map(p => `
                <div class="col border">
                    <img src="${p.url}" style="width: 100%; height: 50%">
                    <h1 class="fs-5 fw-bold" style="font-size:20px; margin-top: 20px">${p.name}</h1>
                    <p class="small text-justify">${p.content.substring(0, 200)}${p.content.length > 200 ? '...' : ''}</p>
                </div>
                <div class="col border">
                    <img src="${p.url}" style="width: 100%; height: 50%">
                    <h1 class="fs-5 fw-bold" style="font-size:20px">${p.name}</h1>
                    <p class="small text-justify">${p.content.substring(0, 200)}${p.content.length > 200 ? '...' : ''}</p>
                </div>
                <div class="col border">
                    <img src="${p.url}" style="width: 100%; height: 50%">
                    <h1 class="fs-5 fw-bold" style="font-size:20px">${p.name}</h1>
                    <p class="small text-justify">${p.content.substring(0, 200)}${p.content.length > 200 ? '...' : ''}</p>
                </div>
            `).join('');

            container.innerHTML = `<div class="row g-4">${cards}</div>`;
        })
        .catch(err => {
            console.error("Lỗi khi tải danh sách sản phẩm:", err);
            document.getElementById("news_categories_mb_5").innerHTML =
                '<div class="text-danger">Không thể tải nội dung nổi bật</div>';
        });
}

// Load mặc định lúc trang load
news_categories_mb_5("All");

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
