// ============================================
// MAIN.JS - Funcionalidades globales
// Navbar, animaciones de scroll, menú móvil, WhatsApp FAB
// ============================================

(function() {
  'use strict';

  // ----- Navbar: cambio al hacer scroll -----
  const navbar = document.getElementById('navbar');
  if (navbar) {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Ejecutar al inicio
  }

  // ----- Menú móvil -----
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileMenuClose = document.getElementById('mobile-menu-close');

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  }

  if (mobileMenuClose && mobileMenu) {
    mobileMenuClose.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      document.body.style.overflow = '';
    });
  }

  // Cerrar menú móvil al hacer clic en un enlace
  if (mobileMenu) {
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  // ----- Animaciones de entrada (IntersectionObserver) -----
  const setupRevealObserver = () => {
    const revealElements = document.querySelectorAll('.reveal:not(.active), .reveal-left:not(.active), .reveal-right:not(.active), .reveal-scale:not(.active)');
    if (revealElements.length === 0) return;

    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          revealObserver.unobserve(entry.target);
        }
      });
    }, observerOptions);

    revealElements.forEach(el => revealObserver.observe(el));
  };

  // Exponer globalmente para que pueda llamarse tras inyectar contenido dinámico
  window.setupRevealObserver = setupRevealObserver;

  // Ejecutar al inicio
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupRevealObserver);
  } else {
    setupRevealObserver();
  }

  // ----- Año automático en el footer -----
  const yearElements = document.querySelectorAll('[data-current-year]');
  yearElements.forEach(el => {
    el.textContent = new Date().getFullYear();
  });

  // ----- Smooth scroll para anclas internas -----
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#' || href === '#!') return;

      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const offset = 80;
        const targetPos = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({
          top: targetPos,
          behavior: 'smooth'
        });
      }
    });
  });

  // ----- Botón flotante WhatsApp (si no está en el HTML) -----
  if (!document.querySelector('.whatsapp-fab')) {
    const whatsappBtn = document.createElement('a');
    whatsappBtn.href = `https://wa.me/${djData.contacto.whatsapp}?text=${encodeURIComponent('Hola! Me gustaría información sobre sus servicios.')}`;
    whatsappBtn.target = '_blank';
    whatsappBtn.rel = 'noopener noreferrer';
    whatsappBtn.className = 'whatsapp-fab';
    whatsappBtn.setAttribute('aria-label', 'Contactar por WhatsApp');
    whatsappBtn.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="white">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
    `;
    document.body.appendChild(whatsappBtn);
  }

  // ----- Mostrar año fundación en estadísticas si está presente -----
  // (solo referencia, no se usa directamente aquí)

})();

// ============================================
// COMPONENTES COMPARTIDOS - Navbar y Footer HTML
// (Se inyectan vía funciones para mantener consistencia)
// ============================================

/**
 * Devuelve el HTML del navbar para la página actual.
 * @param {string} paginaActual - nombre del archivo sin extensión
 */
function getNavbarHTML(paginaActual = '') {
  const links = [
    { href: 'index.html', label: 'Inicio', key: 'index' },
    { href: 'sobre-nosotros.html', label: 'Sobre Nosotros', key: 'sobre-nosotros' },
    { href: 'servicios.html', label: 'Servicios', key: 'servicios' },
    { href: 'galeria.html', label: 'Galería', key: 'galeria' },
    { href: 'precios.html', label: 'Precios', key: 'precios' },
    { href: 'contacto.html', label: 'Contacto', key: 'contacto' }
  ];

  const linksHTML = links.map(link => {
    const isActive = link.key === paginaActual;
    const activeClass = isActive
      ? 'text-white font-semibold'
      : 'text-gray-300 hover:text-white';
    return `<a href="${link.href}" class="nav-link ${activeClass} transition-colors duration-200">${link.label}</a>`;
  }).join('\n            ');

  return `
  <nav id="navbar" class="navbar fixed top-0 left-0 w-full z-40 transition-all duration-300">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-20">
        <!-- Logo -->
        <a href="index.html" class="flex items-center gap-3 group">
          <div class="w-10 h-10 rounded-full bg-gradient-neon flex items-center justify-center text-white font-bold text-xl group-hover:scale-110 transition-transform">
            N
          </div>
          <div class="hidden sm:block">
            <div class="text-white font-bold text-lg tracking-wider">NEON BEATS</div>
            <div class="text-gray-400 text-xs">Productora de Eventos</div>
          </div>
        </a>

        <!-- Links desktop -->
        <div class="hidden lg:flex items-center gap-8">
          ${linksHTML}
        </div>

        <!-- CTA desktop -->
        <div class="hidden lg:flex items-center gap-4">
          <a href="contacto.html" class="btn-neon text-sm">
            Reservar Fecha
          </a>
        </div>

        <!-- Botón menú móvil -->
        <button id="mobile-menu-btn" class="lg:hidden text-white p-2" aria-label="Abrir menú">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </div>
  </nav>

  <!-- Menú móvil -->
  <div id="mobile-menu" class="mobile-menu fixed top-0 right-0 h-full w-72 bg-gray-900 z-50 shadow-2xl lg:hidden">
    <div class="flex justify-between items-center p-6 border-b border-gray-800">
      <span class="text-white font-bold text-lg">Menú</span>
      <button id="mobile-menu-close" class="text-white p-2" aria-label="Cerrar menú">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
    <div class="flex flex-col gap-2 p-6">
      ${links.map(link => {
        const isActive = link.key === paginaActual;
        const activeClass = isActive
          ? 'text-white font-semibold border-l-2 border-pink-500 bg-purple-900/20'
          : 'text-gray-300 hover:text-white';
        return `<a href="${link.href}" class="${activeClass} py-3 px-4 rounded transition-colors">${link.label}</a>`;
      }).join('\n      ')}
      <a href="contacto.html" class="btn-neon text-center mt-4">Reservar Fecha</a>
    </div>
  </div>
  `;
}

/**
 * Devuelve el HTML del footer.
 */
function getFooterHTML() {
  return `
  <footer class="bg-gray-950 border-t border-gray-800 pt-16 pb-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
        <!-- Columna 1: Logo + descripción -->
        <div class="md:col-span-2">
          <div class="flex items-center gap-3 mb-4">
            <div class="w-10 h-10 rounded-full bg-gradient-neon flex items-center justify-center text-white font-bold text-xl">
              N
            </div>
            <div>
              <div class="text-white font-bold text-lg tracking-wider">NEON BEATS</div>
              <div class="text-gray-400 text-xs">Productora de Eventos</div>
            </div>
          </div>
          <p class="text-gray-400 mb-6 max-w-md">
            Producción de eventos que encienden la noche. Más de 10 años creando experiencias inolvidables en Chile.
          </p>
          <!-- Redes sociales -->
          <div class="flex gap-4">
            <a href="${djData.contacto.redes.instagram}" target="_blank" rel="noopener noreferrer" class="w-10 h-10 rounded-full bg-gray-900 hover:bg-gradient-neon flex items-center justify-center transition-all" aria-label="Instagram">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
            </a>
            <a href="${djData.contacto.redes.facebook}" target="_blank" rel="noopener noreferrer" class="w-10 h-10 rounded-full bg-gray-900 hover:bg-gradient-neon flex items-center justify-center transition-all" aria-label="Facebook">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
            </a>
            <a href="${djData.contacto.redes.tiktok}" target="_blank" rel="noopener noreferrer" class="w-10 h-10 rounded-full bg-gray-900 hover:bg-gradient-neon flex items-center justify-center transition-all" aria-label="TikTok">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg>
            </a>
            <a href="${djData.contacto.redes.youtube}" target="_blank" rel="noopener noreferrer" class="w-10 h-10 rounded-full bg-gray-900 hover:bg-gradient-neon flex items-center justify-center transition-all" aria-label="YouTube">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
            </a>
          </div>
        </div>

        <!-- Columna 2: Navegación -->
        <div>
          <h4 class="text-white font-semibold mb-4">Navegación</h4>
          <ul class="space-y-2">
            <li><a href="index.html" class="footer-link">Inicio</a></li>
            <li><a href="sobre-nosotros.html" class="footer-link">Sobre Nosotros</a></li>
            <li><a href="servicios.html" class="footer-link">Servicios</a></li>
            <li><a href="galeria.html" class="footer-link">Galería</a></li>
            <li><a href="precios.html" class="footer-link">Precios</a></li>
            <li><a href="contacto.html" class="footer-link">Contacto</a></li>
          </ul>
        </div>

        <!-- Columna 3: Legal + Contacto -->
        <div>
          <h4 class="text-white font-semibold mb-4">Legal y Contacto</h4>
          <ul class="space-y-2 mb-6">
            <li><a href="politica-de-privacidad.html" class="footer-link">Política de Privacidad</a></li>
            <li><a href="terminos-y-condiciones.html" class="footer-link">Términos y Condiciones</a></li>
          </ul>
          <h4 class="text-white font-semibold mb-4">Contacto</h4>
          <ul class="space-y-2 text-gray-400 text-sm">
            <li>${djData.contacto.email}</li>
            <li>${djData.contacto.telefono}</li>
            <li>${djData.contacto.direccion}</li>
          </ul>
        </div>
      </div>

      <!-- Separador -->
      <div class="border-t border-gray-800 pt-8">
        <div class="flex flex-col md:flex-row justify-between items-center gap-4">
          <p class="text-gray-500 text-sm">
            &copy; <span data-current-year>${new Date().getFullYear()}</span> NEON BEATS. Todos los derechos reservados.
          </p>
          <p class="text-gray-600 text-xs">
            Hecho con 💜 en Chile
          </p>
        </div>
      </div>
    </div>
  </footer>
  `;
}

/**
 * Inyecta el navbar y footer en la página actual.
 * @param {string} paginaActual - clave de la página activa
 */
function injectLayout(paginaActual = '') {
  const navbarContainer = document.getElementById('navbar-container');
  const footerContainer = document.getElementById('footer-container');

  if (navbarContainer) {
    navbarContainer.innerHTML = getNavbarHTML(paginaActual);
    // Re-bind event listeners después de inyectar
    rebindGlobalEvents();
  }
  if (footerContainer) {
    footerContainer.innerHTML = getFooterHTML();
  }
}

/**
 * Re-vincula los eventos globales después de inyectar HTML dinámico.
 */
function rebindGlobalEvents() {
  // Re-aplicar observer para nuevos elementos reveal
  if (typeof window.setupRevealObserver === 'function') {
    // Pequeño delay para asegurar que el DOM se actualizó
    setTimeout(() => window.setupRevealObserver(), 50);
  }

  // Navbar scroll
  const navbar = document.getElementById('navbar');
  if (navbar) {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    };
    window.removeEventListener('scroll', handleScroll);
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
  }

  // Menú móvil
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileMenuClose = document.getElementById('mobile-menu-close');

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  }

  if (mobileMenuClose && mobileMenu) {
    mobileMenuClose.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      document.body.style.overflow = '';
    });
  }

  // Cerrar menú al hacer clic en link
  if (mobileMenu) {
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  // Año dinámico
  document.querySelectorAll('[data-current-year]').forEach(el => {
    el.textContent = new Date().getFullYear();
  });
}

// Exponer funciones globalmente
window.injectLayout = injectLayout;
window.djData = djData;