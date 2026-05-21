const images = [
    { src: "https://placehold.co/800x500/1abc9c/white?text=Phong+canh+1", alt: "Phong cảnh thiên nhiên 1" },
    { src: "https://placehold.co/800x500/3498db/white?text=Phong+canh+2", alt: "Phong cảnh thiên nhiên 2" },
    { src: "https://placehold.co/800x500/9b59b6/white?text=Phong+canh+3", alt: "Phong cảnh thiên nhiên 3" },
    { src: "https://placehold.co/800x500/e67e22/white?text=Phong+canh+4", alt: "Phong cảnh thiên nhiên 4" },
    { src: "https://placehold.co/800x500/e74c3c/white?text=Phong+canh+5", alt: "Phong cảnh thiên nhiên 5" }
];

const commands = [
    { name: "Mở cài đặt hệ thống", action: () => alert("Đang mở Cài đặt...") },
    { name: "Đổi giao diện Sáng/Tối", action: () => alert("Đã chuyển đổi giao diện!") },
    { name: "Tạo tài liệu mới", action: () => alert("Tạo tài liệu thành công.") },
    { name: "Xem hồ sơ cá nhân", action: () => alert("Đang tải hồ sơ...") },
    { name: "Đăng xuất khỏi tài khoản", action: () => alert("Đã đăng xuất.") }
];

const galleryContainer = document.getElementById("gallery");
const imageModal = document.getElementById("imageModal");
const modalImage = document.getElementById("modalImage");
const modalCaption = document.getElementById("modalCaption");
const closeGallery = document.getElementById("closeGallery");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const playBtn = document.getElementById("playBtn");

const commandPalette = document.getElementById("commandPalette");
const paletteInput = document.getElementById("paletteInput");
const paletteList = document.getElementById("paletteList");

let currentIndex = 0;
let isPlaying = false;
let playInterval;
let isGalleryOpen = false;
let isPaletteOpen = false;

let selectedCommandIndex = 0;
let filteredCommands = [...commands];

function renderGallery() {
    images.forEach((img, index) => {
        const el = document.createElement("img");
        el.src = img.src;
        el.alt = img.alt;
        el.className = "gallery-item";
        el.tabIndex = 0; 
        el.setAttribute("aria-label", `Mở ảnh ${index + 1}: ${img.alt}`);
        
        el.addEventListener("click", () => openGallery(index));
        el.addEventListener("keydown", (e) => {
            if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                openGallery(index);
            }
        });
        galleryContainer.appendChild(el);
    });
}

function openGallery(index) {
    if (index < 0 || index >= images.length) return;
    currentIndex = index;
    modalImage.src = images[currentIndex].src;
    modalImage.alt = images[currentIndex].alt;
    modalCaption.textContent = `Ảnh ${currentIndex + 1} trên ${images.length}`;
    
    imageModal.removeAttribute("hidden");
    isGalleryOpen = true;
    closeGallery.focus();
}

function closeGalleryModal() {
    imageModal.setAttribute("hidden", "true");
    isGalleryOpen = false;
    stopSlideshow();
    const items = galleryContainer.querySelectorAll(".gallery-item");
    if (items[currentIndex]) items[currentIndex].focus();
}

function showNext() {
    openGallery((currentIndex + 1) % images.length);
}

function showPrev() {
    openGallery((currentIndex - 1 + images.length) % images.length);
}

function toggleSlideshow() {
    isPlaying = !isPlaying;
    playBtn.textContent = isPlaying ? "Dừng (Space)" : "Phát (Space)";
    if (isPlaying) {
        playInterval = setInterval(showNext, 2000);
    } else {
        clearInterval(playInterval);
    }
}

function stopSlideshow() {
    isPlaying = false;
    playBtn.textContent = "Phát (Space)";
    clearInterval(playInterval);
}

closeGallery.addEventListener("click", closeGalleryModal);
nextBtn.addEventListener("click", showNext);
prevBtn.addEventListener("click", showPrev);
playBtn.addEventListener("click", toggleSlideshow);

function renderCommands() {
    paletteList.innerHTML = "";
    filteredCommands.forEach((cmd, index) => {
        const li = document.createElement("li");
        li.textContent = cmd.name;
        li.className = "palette-item";
        li.id = `cmd-${index}`;
        li.setAttribute("role", "option");
        li.setAttribute("aria-selected", index === selectedCommandIndex);
        
        li.addEventListener("click", () => {
            closePaletteModal();
            cmd.action();
        });
        
        li.addEventListener("mousemove", () => {
            if (selectedCommandIndex !== index) {
                selectedCommandIndex = index;
                updateCommandSelection();
            }
        });
        
        paletteList.appendChild(li);
    });
}

function updateCommandSelection() {
    const items = paletteList.querySelectorAll(".palette-item");
    items.forEach((item, index) => {
        item.setAttribute("aria-selected", index === selectedCommandIndex);
    });
}

function openPalette() {
    commandPalette.removeAttribute("hidden");
    isPaletteOpen = true;
    paletteInput.value = "";
    filteredCommands = [...commands];
    selectedCommandIndex = 0;
    renderCommands();
    paletteInput.focus();
}

function closePaletteModal() {
    commandPalette.setAttribute("hidden", "true");
    isPaletteOpen = false;
}

paletteInput.addEventListener("input", (e) => {
    const query = e.target.value.toLowerCase();
    filteredCommands = commands.filter(c => c.name.toLowerCase().includes(query));
    selectedCommandIndex = 0;
    renderCommands();
});

paletteInput.addEventListener("keydown", (e) => {
    if (filteredCommands.length === 0) return;

    if (e.key === "ArrowDown") {
        e.preventDefault();
        selectedCommandIndex = (selectedCommandIndex + 1) % filteredCommands.length;
        updateCommandSelection();
        document.getElementById(`cmd-${selectedCommandIndex}`).scrollIntoView({ block: "nearest" });
    } else if (e.key === "ArrowUp") {
        e.preventDefault();
        selectedCommandIndex = (selectedCommandIndex - 1 + filteredCommands.length) % filteredCommands.length;
        updateCommandSelection();
        document.getElementById(`cmd-${selectedCommandIndex}`).scrollIntoView({ block: "nearest" });
    } else if (e.key === "Enter") {
        e.preventDefault();
        closePaletteModal();
        filteredCommands[selectedCommandIndex].action();
    }
});

document.addEventListener("keydown", (e) => {
    if (e.ctrlKey && e.key === "k") {
        e.preventDefault();
        isPaletteOpen ? closePaletteModal() : openPalette();
        return;
    }

    if (e.key === "Escape") {
        if (isPaletteOpen) {
            closePaletteModal();
            e.preventDefault();
        } else if (isGalleryOpen) {
            closeGalleryModal();
            e.preventDefault();
        }
        return;
    }

    if (isPaletteOpen) return;

    if (!isGalleryOpen && e.key >= "1" && e.key <= "9") {
        const index = parseInt(e.key) - 1;
        if (index < images.length) openGallery(index);
    }

    if (isGalleryOpen) {
        if (e.key === "ArrowRight") {
            showNext();
        } else if (e.key === "ArrowLeft") {
            showPrev();
        } else if (e.key === " ") {
            e.preventDefault();
            toggleSlideshow();
        }
    }
});

renderGallery();