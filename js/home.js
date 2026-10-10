// ============================================
// HOME.JS - Animaciones específicas de la página de inicio
// ============================================

(function() {
  'use strict';

  // ----- Stats counter animado -----
  const statNumbers = document.querySelectorAll('.stat-number[data-target]');
  if (statNumbers.length > 0) {
    const animateCounter = (el) => {
      const target = parseInt(el.dataset.target, 10);
      const suffix = el.dataset.suffix || '';
      const duration = 2000; // 2 segundos
      const startTime = performance.now();

      const update = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // Easing: easeOutQuart
        const eased = 1 - Math.pow(1 - progress, 4);
        const current = Math.floor(eased * target);

        el.textContent = current + suffix;

        if (progress < 1) {
          requestAnimationFrame(update);
        } else {
          el.textContent = target + suffix;
        }
      };

      requestAnimationFrame(update);
    };

    const statsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          statsObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });

    statNumbers.forEach(el => statsObserver.observe(el));
  }

  // ----- Título del hero con efecto de palabra por palabra -----
  const heroTitle = document.querySelector('.hero-title-animated');
  if (heroTitle) {
    const text = heroTitle.textContent.trim();
    heroTitle.innerHTML = '';
    const words = text.split(' ');
    words.forEach((word, i) => {
      const span = document.createElement('span');
      span.textContent = word + ' ';
      span.className = 'hero-title-word';
      span.style.animationDelay = `${i * 0.15}s`;
      heroTitle.appendChild(span);
    });
  }

})();