// ============================================
// GALERIA.JS - Filtros y lightbox
// ============================================

(function() {
  'use strict';

  // ----- Renderizar galería -----
  const galeriaGrid = document.getElementById('galeria-grid');
  const filtrosContainer = document.getElementById('galeria-filtros');

  if (galeriaGrid && typeof djData !== 'undefined' && djData.galeria) {
    // Definir filtros
    const filtros = [
      { key: 'todas', label: 'Todas' },
      { key: 'bodas', label: 'Bodas' },
      { key: 'corporativos', label: 'Corporativos' },
      { key: 'fiestas', label: 'Fiestas' },
      { key: 'conciertos', label: 'Conciertos' }
    ];

    // Renderizar botones de filtro
    if (filtrosContainer) {
      filtrosContainer.innerHTML = filtros.map((f, i) => `
        <button class="filter-btn ${i === 0 ? 'active' : ''}" data-filter="${f.key}">
          ${f.label}
        </button>
      `).join('');
    }

    // Renderizar galería
    const renderGaleria = (filtro = 'todas') => {
      const items = filtro === 'todas'
        ? djData.galeria
        : djData.galeria.filter(item => item.categoria === filtro);

      galeriaGrid.innerHTML = items.map((item, index) => `
        <div class="gallery-item reveal-scale" data-categoria="${item.categoria}" data-index="${index}">
          <img src="${item.url}" alt="${item.alt}" loading="lazy" />
        </div>
      `).join('');

      // Re-bind eventos del lightbox
      bindLightboxEvents();

      // Re-bind animaciones reveal
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1 });
      galeriaGrid.querySelectorAll('.reveal-scale').forEach(el => observer.observe(el));
    };

    // Eventos de filtro
    if (filtrosContainer) {
      filtrosContainer.addEventListener('click', (e) => {
        const btn = e.target.closest('.filter-btn');
        if (!btn) return;

        filtrosContainer.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        renderGaleria(btn.dataset.filter);
      });
    }

    // Render inicial
    renderGaleria('todas');
  }

  // ----- Lightbox -----
  let lightbox = null;
  let currentIndex = 0;
  let currentItems = [];

  const createLightbox = () => {
    if (document.getElementById('lightbox')) return;

    lightbox = document.createElement('div');
    lightbox.id = 'lightbox';
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
      <button id="lightbox-close" class="absolute top-6 right-6 text-white text-3xl z-10 hover:text-pink-500 transition-colors" aria-label="Cerrar">&times;</button>
      <button id="lightbox-prev" class="absolute left-6 top-1/2 -translate-y-1/2 text-white text-4xl z-10 hover:text-pink-500 transition-colors" aria-label="Anterior">&#10094;</button>
      <button id="lightbox-next" class="absolute right-6 top-1/2 -translate-y-1/2 text-white text-4xl z-10 hover:text-pink-500 transition-colors" aria-label="Siguiente">&#10095;</button>
      <img id="lightbox-img" src="" alt="" />
      <div id="lightbox-caption" class="absolute bottom-8 left-1/2 -translate-x-1/2 text-white text-center bg-black/60 px-6 py-3 rounded-full"></div>
    `;
    document.body.appendChild(lightbox);

    // Eventos
    document.getElementById('lightbox-close').addEventListener('click', closeLightbox);
    document.getElementById('lightbox-prev').addEventListener('click', () => navigateLightbox(-1));
    document.getElementById('lightbox-next').addEventListener('click', () => navigateLightbox(1));
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightbox();
    });
  };

  const openLightbox = (index) => {
    createLightbox();
    currentIndex = index;
    currentItems = Array.from(document.querySelectorAll('#galeria-grid .gallery-item')).map(item => ({
      src: item.querySelector('img').src,
      alt: item.querySelector('img').alt
    }));
    updateLightboxImage();
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    if (lightbox) {
      lightbox.classList.remove('active');
      document.body.style.overflow = '';
    }
  };

  const updateLightboxImage = () => {
    if (!lightbox) return;
    const item = currentItems[currentIndex];
    if (item) {
      document.getElementById('lightbox-img').src = item.src.replace('w=800', 'w=1600');
      document.getElementById('lightbox-img').alt = item.alt;
      document.getElementById('lightbox-caption').textContent = `${currentIndex + 1} / ${currentItems.length} - ${item.alt}`;
    }
  };

  const navigateLightbox = (direction) => {
    currentIndex = (currentIndex + direction + currentItems.length) % currentItems.length;
    updateLightboxImage();
  };

  const bindLightboxEvents = () => {
    document.querySelectorAll('#galeria-grid .gallery-item').forEach((item, index) => {
      item.addEventListener('click', () => openLightbox(index));
    });
  };

  // Teclado: Esc cerrar, flechas navegar
  document.addEventListener('keydown', (e) => {
    if (!lightbox || !lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') navigateLightbox(-1);
    if (e.key === 'ArrowRight') navigateLightbox(1);
  });

})();