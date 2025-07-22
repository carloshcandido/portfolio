// ==================================================
// LÓGICA DO MENU HAMBÚRGUER
// ==================================================
const menuToggle = document.getElementById('menu-toggle');
const navMenu = document.getElementById('nav-menu');
const navLinks = navMenu.querySelectorAll('a');

// Abre/Fecha o menu ao clicar no ícone
menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Fecha o menu ao clicar em um dos links (útil para one-page)
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});


// ==================================================
// LÓGICA DO CARROSSEL DE IMAGENS E GALERIA LIGHTBOX
// ==================================================

// --- 1. Lógica do Carrossel Automático ---
const imageContainers = document.querySelectorAll('.project-image-container');

imageContainers.forEach(container => {
    const images = container.dataset.images.split(',').map(item => item.trim());
    const imgElement = container.querySelector('.project-image');
    let currentIndex = 0;

    if (images.length > 1) {
        setInterval(() => {
            currentIndex = (currentIndex + 1) % images.length;
            imgElement.src = images[currentIndex];
        }, 2000); 
    }
});


// --- 2. Lógica da Galeria Lightbox ---
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const closeBtn = document.querySelector('.lightbox-close');
const prevBtn = document.querySelector('.lightbox-prev');
const nextBtn = document.querySelector('.lightbox-next');

let currentLightboxIndex;
let currentImageList;

function openLightbox(container) {
    currentImageList = container.dataset.images.split(',').map(item => item.trim());
    const currentImageSrc = container.querySelector('.project-image').src;
    
    const currentFileName = currentImageSrc.split('/').pop();
    currentLightboxIndex = currentImageList.findIndex(img => img.endsWith(currentFileName));

    if (currentLightboxIndex === -1) currentLightboxIndex = 0;

    updateLightboxImage();
    lightbox.classList.add('active');
}

function updateLightboxImage() {
    lightboxImg.src = currentImageList[currentLightboxIndex];
}

function closeLightbox() {
    lightbox.classList.remove('active');
}

function showNextImage() {
    currentLightboxIndex = (currentLightboxIndex + 1) % currentImageList.length;
    updateLightboxImage();
}

function showPrevImage() {
    currentLightboxIndex = (currentLightboxIndex - 1 + currentImageList.length) % currentImageList.length;
    updateLightboxImage();
}

imageContainers.forEach(container => {
    container.addEventListener('click', () => openLightbox(container));
});

closeBtn.addEventListener('click', closeLightbox);
nextBtn.addEventListener('click', showNextImage);
prevBtn.addEventListener('click', showPrevImage);

lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        closeLightbox();
    }
});

document.addEventListener('keydown', (e) => {
    if (lightbox.classList.contains('active')) {
        if (e.key === 'Escape') {
            closeLightbox();
        } else if (e.key === 'ArrowRight') {
            showNextImage();
        } else if (e.key === 'ArrowLeft') {
            showPrevImage();
        }
    }
});