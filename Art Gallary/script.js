document.addEventListener('DOMContentLoaded', () => {
    const galleryGrid = document.querySelector('.gallery-grid');
    const searchInput = document.getElementById('search');
    const filterSelect = document.getElementById('filter');
    
    const images = [
        { src: 'images/art1.jpg', caption: 'Artwork 1', artist: 'Artist A', category: 'modern' },
        { src: 'images/art2.jpg', caption: 'Artwork 2', artist: 'Artist B', category: 'classic' },
        // Add more images with artist and category
    ];

    function displayImages(filteredImages) {
        galleryGrid.innerHTML = '';
        filteredImages.forEach(image => {
            const artPiece = document.createElement('div');
            artPiece.classList.add('art-piece');
            const img = document.createElement('img');
            img.src = image.src;
            artPiece.appendChild(img);

            // Add event listener for interaction
            artPiece.addEventListener('click', () => {
                showLightbox(image.src, image.caption);
            });

            galleryGrid.appendChild(artPiece);
        });

        // Add GSAP animations
        gsap.from(".art-piece", { duration: 1, opacity: 0, y: 50, stagger: 0.1, ease: "power3.out" });
    }

    function filterImages() {
        const searchTerm = searchInput.value.toLowerCase();
        const selectedCategory = filterSelect.value;

        const filteredImages = images.filter(image => {
            const matchesSearch = image.caption.toLowerCase().includes(searchTerm) || image.artist.toLowerCase().includes(searchTerm);
            const matchesCategory = selectedCategory === 'all' || image.category === selectedCategory;
            return matchesSearch && matchesCategory;
        });

        displayImages(filteredImages);
    }

    searchInput.addEventListener('input', filterImages);
    filterSelect.addEventListener('change', filterImages);

    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const closeBtn = document.querySelector('.lightbox .close');

    function showLightbox(src, caption) {
        lightbox.style.display = 'block';
        lightboxImg.src = src;
        lightboxCaption.textContent = caption;

        // Add GSAP animation for lightbox
        gsap.from("#lightbox-img", { duration: 1, opacity: 0, scale: 0.5, ease: "elastic.out(1, 0.3)" });
        gsap.from("#lightbox-caption", { duration: 1, opacity: 0, delay: 0.5 });
    }

    closeBtn.addEventListener('click', () => {
        gsap.to("#lightbox", { duration: 0.5, opacity: 0, onComplete: () => {
            lightbox.style.display = 'none';
            gsap.set("#lightbox", { opacity: 1 });  // Reset opacity for next use
        }});
    });

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            gsap.to("#lightbox", { duration: 0.5, opacity: 0, onComplete: () => {
                lightbox.style.display = 'none';
                gsap.set("#lightbox", { opacity: 1 });  // Reset opacity for next use
            }});
        }
    });

    // Initial display of images
    displayImages(images);
});
