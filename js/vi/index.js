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