// Efeito do header que já tínhamos (caso ele volte a ser transparente no futuro)
const header = document.querySelector('.main-header');
// Este código pode ser reativado se você mudar o design do header
// window.addEventListener('scroll', () => {
//     if (window.scrollY > 50) { 
//         header.classList.add('header-scrolled');
//     } else {
//         header.classList.remove('header-scrolled');
//     }
// });


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
        // A cada 2 segundos, troca para a próxima imagem
        setInterval(() => {
            currentIndex = (currentIndex + 1) % images.length;
            imgElement.src = images[currentIndex];
        }, 2000); // 2000ms = 2 segundos. 1 segundo é muito rápido, ajustei para 2.
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

// Função para abrir o lightbox
function openLightbox(container) {
    currentImageList = container.dataset.images.split(',').map(item => item.trim());
    const currentImageSrc = container.querySelector('.project-image').src;
    
    // Encontra o nome do arquivo atual para saber o índice
    const currentFileName = currentImageSrc.split('/').pop();
    currentLightboxIndex = currentImageList.findIndex(img => img.endsWith(currentFileName));

    if (currentLightboxIndex === -1) currentLightboxIndex = 0; // Fallback

    updateLightboxImage();
    lightbox.classList.add('active');
}

// Função para atualizar a imagem no lightbox
function updateLightboxImage() {
    lightboxImg.src = currentImageList[currentLightboxIndex];
}

// Função para fechar o lightbox
function closeLightbox() {
    lightbox.classList.remove('active');
}

// Funções para navegar entre as imagens
function showNextImage() {
    currentLightboxIndex = (currentLightboxIndex + 1) % currentImageList.length;
    updateLightboxImage();
}

function showPrevImage() {
    currentLightboxIndex = (currentLightboxIndex - 1 + currentImageList.length) % currentImageList.length;
    updateLightboxImage();
}

// Adiciona os eventos de clique
imageContainers.forEach(container => {
    container.addEventListener('click', () => openLightbox(container));
});

closeBtn.addEventListener('click', closeLightbox);
nextBtn.addEventListener('click', showNextImage);
prevBtn.addEventListener('click', showPrevImage);

// Fecha o lightbox se clicar fora da imagem
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        closeLightbox();
    }
});

// Adiciona navegação pelo teclado (Esc e setas)
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