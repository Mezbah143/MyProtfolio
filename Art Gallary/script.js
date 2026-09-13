document.addEventListener('DOMContentLoaded', () => {
    const galleryGrid = document.querySelector('.gallery-grid');
    const searchInput = document.getElementById('search');
    const filterSelect = document.getElementById('filter');
    const images = [
        {src:'pic1.jpeg',caption:'Artwork 1',artist:'Artist A',category:'modern'},
        {src:'pic2.jpg',caption:'Artwork 2',artist:'Artist B',category:'classic'},
        {src:'pic3.jpg',caption:'Artwork 3',artist:'Artist C',category:'abstract'},
        {src:'pic4.jpg',caption:'Artwork 4',artist:'Artist D',category:'modern'},
        {src:'pic5.jpg',caption:'Artwork 5',artist:'Artist E',category:'classic'},
        {src:'pic6.jpg',caption:'Artwork 6',artist:'Artist F',category:'abstract'}
    ];
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const closeLightbox = () => { lightbox.style.display = 'none'; };
    const showLightbox = (image) => { lightbox.style.display = 'block'; lightboxImg.src = image.src; lightboxImg.alt = image.caption; lightboxCaption.textContent = `${image.caption} · ${image.artist}`; };
    const displayImages = (items) => {
        galleryGrid.innerHTML = '';
        items.forEach((image) => { const piece = document.createElement('button'); piece.type = 'button'; piece.className = 'art-piece'; piece.innerHTML = `<img src="${image.src}" alt="${image.caption} by ${image.artist}" loading="lazy">`; piece.addEventListener('click', () => showLightbox(image)); galleryGrid.appendChild(piece); });
    };
    const filterImages = () => { const query = searchInput.value.toLowerCase(); const category = filterSelect.value; displayImages(images.filter((image) => (image.caption.toLowerCase().includes(query) || image.artist.toLowerCase().includes(query)) && (category === 'all' || image.category === category))); };
    searchInput.addEventListener('input', filterImages); filterSelect.addEventListener('change', filterImages); document.querySelector('.lightbox .close')?.addEventListener('click', closeLightbox); lightbox?.addEventListener('click', (event) => { if (event.target === lightbox) closeLightbox(); }); document.addEventListener('keydown', (event) => { if (event.key === 'Escape') closeLightbox(); }); displayImages(images);
});
