document.addEventListener('DOMContentLoaded', () => {
    const galleryGrid = document.querySelector('.gallery-grid');
    const searchInput = document.getElementById('search');
    const filterSelect = document.getElementById('filter');
    
    const images = [
        { src: 'images/art1.jpg', caption: 'Artwork 1', artist: 'Artist A', category: 'modern' },
        { src: 'images/art2.jpg', caption: 'Artwork 2', artist: 'Artist B', category: 'classic' },
        { src: 'images/art3.jpg', caption: 'Artwork 3', artist: 'Artist C', category: 'abstract' },
        // Add more images with artist and category
        { src: 'images/art4.jpg', caption: 'Artwork 4', artist: 'Artist D', category: 'modern' },
        { src: 'images/art5.jpg', caption: 'Artwork 5', artist: 'Artist E', category: 'classic' }
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


document.addEventListener('DOMContentLoaded', () => {
    const galleryGrid = document.querySelector('.gallery-grid');
    const searchInput = document.getElementById('search');
    const filterSelect = document.getElementById('filter');
    
    let images = [
        { src: 'images/art1.jpg', caption: 'Artwork 1', artist: 'Artist A', category: 'modern' },
        { src: 'images/art2.jpg', caption: 'Artwork 2', artist: 'Artist B', category: 'classic' },
        { src: 'images/art3.jpg', caption: 'Artwork 3', artist: 'Artist C', category: 'abstract' },
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

    // Handle upload form submission
    const uploadForm = document.getElementById('upload-form');
    const uploadImage = document.getElementById('upload-image');
    const uploadCaption = document.getElementById('upload-caption');
    const uploadArtist = document.getElementById('upload-artist');
    const uploadCategory = document.getElementById('upload-category');

    uploadForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const file = uploadImage.files[0];
        const reader = new FileReader();

        reader.onload = function(event) {
            const newImage = {
                src: event.target.result,
                caption: uploadCaption.value,
                artist: uploadArtist.value,
                category: uploadCategory.value
            };
            images.push(newImage);
            filterImages();  // Refresh the gallery to include the new image
        };

        reader.readAsDataURL(file);
        
        uploadForm.reset();  // Reset the form fields after submission
    });

    // Initial display of images
    displayImages(images);
});
