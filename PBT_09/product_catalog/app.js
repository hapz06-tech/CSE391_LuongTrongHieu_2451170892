const products = [
    { id: 1, name: "iPhone 16", price: 25990000, category: "phone", image: "https://placehold.co/300x300", rating: 4.5, inStock: true },
    { id: 2, name: "MacBook Pro M3", price: 45990000, category: "laptop", image: "https://placehold.co/300x300", rating: 4.8, inStock: true },
    { id: 3, name: "AirPods Pro 2", price: 6990000, category: "accessory", image: "https://placehold.co/300x300", rating: 4.3, inStock: true },
    { id: 4, name: "iPad Air 6", price: 16990000, category: "tablet", image: "https://placehold.co/300x300", rating: 4.6, inStock: false },
    { id: 5, name: "Samsung Galaxy S24", price: 22990000, category: "phone", image: "https://placehold.co/300x300", rating: 4.4, inStock: true },
    { id: 6, name: "Dell XPS 15", price: 35990000, category: "laptop", image: "https://placehold.co/300x300", rating: 4.7, inStock: true },
    { id: 7, name: "Galaxy Buds FE", price: 3490000, category: "accessory", image: "https://placehold.co/300x300", rating: 4.1, inStock: true },
    { id: 8, name: "Xiaomi Pad 6", price: 7990000, category: "tablet", image: "https://placehold.co/300x300", rating: 4.2, inStock: true },
    { id: 9, name: "Google Pixel 9", price: 19990000, category: "phone", image: "https://placehold.co/300x300", rating: 4.6, inStock: true },
    { id: 10, name: "ThinkPad X1 Carbon", price: 32990000, category: "laptop", image: "https://placehold.co/300x300", rating: 4.5, inStock: false },
    { id: 11, name: "Apple Watch S9", price: 10990000, category: "accessory", image: "https://placehold.co/300x300", rating: 4.7, inStock: true },
    { id: 12, name: "Galaxy Tab S9", price: 21990000, category: "tablet", image: "https://placehold.co/300x300", rating: 4.8, inStock: true }
];

let cartQuantity = 0;
let currentSearch = "";
let currentCategory = "all";
let currentSort = "default";

const productGrid = document.getElementById("productGrid");
const modalContainer = document.getElementById("modalContainer");
const searchInput = document.getElementById("searchInput");
const categoryFilters = document.getElementById("categoryFilters");
const sortSelect = document.getElementById("sortSelect");
const darkModeToggle = document.getElementById("darkModeToggle");
const cartBadge = document.getElementById("cartBadge");

function renderProducts() {
    let result = products.filter(p => {
        const matchSearch = p.name.toLowerCase().includes(currentSearch.toLowerCase());
        const matchCategory = currentCategory === "all" || p.category === currentCategory;
        return matchSearch && matchCategory;
    });

    if (currentSort === "price-asc") {
        result.sort((a, b) => a.price - b.price);
    } else if (currentSort === "price-desc") {
        result.sort((a, b) => b.price - a.price);
    } else if (currentSort === "name-asc") {
        result.sort((a, b) => a.name.localeCompare(b.name));
    } else if (currentSort === "rating-desc") {
        result.sort((a, b) => b.rating - a.rating);
    }

    productGrid.innerHTML = "";

    result.forEach(product => {
        const card = document.createElement("div");
        card.className = "product-card";

        const img = document.createElement("img");
        img.src = product.image;
        img.className = "product-image";
        img.addEventListener("click", () => renderModal(product));

        const title = document.createElement("h3");
        title.textContent = product.name;
        title.className = "product-title";
        title.addEventListener("click", () => renderModal(product));

        const price = document.createElement("p");
        price.textContent = product.price.toLocaleString("vi-VN") + "đ";
        price.className = "product-price";

        const btn = document.createElement("button");
        btn.className = "add-btn";
        if (product.inStock) {
            btn.textContent = "Thêm vào giỏ";
            btn.addEventListener("click", () => {
                cartQuantity++;
                cartBadge.textContent = cartQuantity;
            });
        } else {
            btn.textContent = "Hết hàng";
            btn.disabled = true;
        }

        card.appendChild(img);
        card.appendChild(title);
        card.appendChild(price);
        card.appendChild(btn);

        productGrid.appendChild(card);
    });
}

function renderModal(product) {
    modalContainer.innerHTML = "";

    const overlay = document.createElement("div");
    overlay.className = "modal-overlay";

    const content = document.createElement("div");
    content.className = "modal-content";

    const closeBtn = document.createElement("span");
    closeBtn.textContent = "×";
    closeBtn.className = "modal-close";
    closeBtn.addEventListener("click", () => {
        modalContainer.innerHTML = "";
    });

    const img = document.createElement("img");
    img.src = product.image;
    img.style.width = "100%";
    img.style.marginBottom = "15px";

    const title = document.createElement("h2");
    title.textContent = product.name;
    title.style.marginBottom = "10px";

    const rating = document.createElement("p");
    rating.textContent = `Đánh giá: ${product.rating} ⭐`;
    rating.style.marginBottom = "5px";

    const category = document.createElement("p");
    category.textContent = `Danh mục: ${product.category.toUpperCase()}`;
    category.style.marginBottom = "15px";

    const price = document.createElement("p");
    price.textContent = `Giá bán: ${product.price.toLocaleString("vi-VN")}đ`;
    price.className = "product-price";

    content.appendChild(closeBtn);
    content.appendChild(img);
    content.appendChild(title);
    content.appendChild(rating);
    content.appendChild(category);
    content.appendChild(price);

    overlay.appendChild(content);
    modalContainer.appendChild(overlay);

    overlay.addEventListener("click", (e) => {
        if (e.target === overlay) {
            modalContainer.innerHTML = "";
        }
    });
}

searchInput.addEventListener("input", (e) => {
    currentSearch = e.target.value;
    renderProducts();
});

categoryFilters.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {
        document.querySelectorAll("#categoryFilters button").forEach(btn => btn.classList.remove("active"));
        e.target.classList.add("active");
        currentCategory = e.target.dataset.category;
        renderProducts();
    }
});

sortSelect.addEventListener("change", (e) => {
    currentSort = e.target.value;
    renderProducts();
});

darkModeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
});

renderProducts();