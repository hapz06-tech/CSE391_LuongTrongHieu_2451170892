const galleryGrid = document.getElementById('galleryGrid');
const loadingIndicator = document.getElementById('loadingIndicator');
const loadTrigger = document.getElementById('load-trigger');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const closeLightbox = document.getElementById('closeLightbox');
const lightboxSpinner = document.getElementById('lightboxSpinner');

let currentPage = 1;
const limit = 20;
let isLoading = false;
let hasMore = true;

const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            const highResSrc = img.dataset.src;
            
            const tempImage = new Image();
            tempImage.src = highResSrc;
            tempImage.onload = () => {
                img.src = highResSrc;
                img.classList.add('loaded');
            };
            
            observer.unobserve(img);
        }
    });
}, {
    rootMargin: '50px 0px',
    threshold: 0.1
});

const scrollObserver = new IntersectionObserver((entries) => {
    const trigger = entries[0];
    if (trigger.isIntersecting && !isLoading && hasMore) {
        loadPhotos();
    }
}, {
    rootMargin: '200px'
});

async function loadPhotos() {
    if (isLoading || !hasMore) return;
    
    isLoading = true;
    loadingIndicator.classList.remove('hidden');

    try {
        const response = await fetch(`https://picsum.photos/v2/list?page=${currentPage}&limit=${limit}`);
        
        if (!response.ok) throw new Error("Failed to fetch photos");
        
        const photos = await response.json();

        if (photos.length === 0) {
            hasMore = false;
            loadingIndicator.innerHTML = "Đã tải hết ảnh.";
            return;
        }

        photos.forEach(photo => {
            const container = document.createElement('div');
            container.className = 'gallery-item';

            const img = document.createElement('img');
            const lowRes = `https://picsum.photos/id/${photo.id}/20/20`; 
            const highRes = `https://picsum.photos/id/${photo.id}/600/600`; 
            const fullRes = photo.download_url;

            img.src = lowRes; 
            img.dataset.src = highRes; 
            img.dataset.full = fullRes; 
            img.alt = photo.author;

            imageObserver.observe(img);

            container.addEventListener('click', () => {
                openLightbox(fullRes);
            });

            container.appendChild(img);
            galleryGrid.appendChild(container);
        });

        currentPage++;

    } catch (error) {
        console.error(error);
        loadingIndicator.innerHTML = "Lỗi khi tải ảnh. Vui lòng thử lại sau.";
    } finally {
        isLoading = false;
        if (hasMore) {
            loadingIndicator.classList.add('hidden');
        }
    }
}

function openLightbox(imgSrc) {
    lightboxSpinner.classList.remove('hidden');
    lightboxImg.src = ""; 
    lightbox.classList.remove('hidden');
    document.body.style.overflow = 'hidden'; 

    const tempImg = new Image();
    tempImg.src = imgSrc;
    tempImg.onload = () => {
        lightboxImg.src = imgSrc;
        lightboxSpinner.classList.add('hidden');
    };
}

function closeLightboxModal() {
    lightbox.classList.add('hidden');
    document.body.style.overflow = 'auto'; 
    lightboxImg.src = "";
}

closeLightbox.addEventListener('click', closeLightboxModal);

lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        closeLightboxModal();
    }
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !lightbox.classList.contains('hidden')) {
        closeLightboxModal();
    }
});

scrollObserver.observe(loadTrigger);