// ============================================
// CONTACT-FORM.JS - Validación y simulación de envío
// ============================================

(function() {
  'use strict';

  const form = document.getElementById('contact-form');
  if (!form) return;

  const submitBtn = form.querySelector('button[type="submit"]');
  const submitBtnText = submitBtn.querySelector('.btn-text');
  const submitBtnSpinner = submitBtn.querySelector('.btn-spinner');

  // ----- Reglas de validación -----
  const validators = {
    nombre: (val) => {
      if (!val.trim()) return 'El nombre es obligatorio';
      if (val.trim().length < 3) return 'El nombre debe tener al menos 3 caracteres';
      return null;
    },
    email: (val) => {
      if (!val.trim()) return 'El email es obligatorio';
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!regex.test(val)) return 'Ingresa un email válido';
      return null;
    },
    telefono: (val) => {
      if (!val.trim()) return 'El teléfono es obligatorio';
      const cleaned = val.replace(/[\s+\-()]/g, '');
      if (!/^[0-9]{8,15}$/.test(cleaned)) return 'Ingresa un teléfono válido (8-15 dígitos)';
      return null;
    },
    tipoEvento: (val) => {
      if (!val) return 'Selecciona el tipo de evento';
      return null;
    },
    fechaEvento: (val) => {
      if (!val) return 'Selecciona la fecha del evento';
      const selected = new Date(val);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selected < today) return 'La fecha debe ser futura';
      return null;
    },
    mensaje: (val) => {
      if (!val.trim()) return 'El mensaje es obligatorio';
      if (val.trim().length < 10) return 'El mensaje debe tener al menos 10 caracteres';
      return null;
    }
  };

  // ----- Validar un campo -----
  const validateField = (field) => {
    const name = field.name;
    const value = field.value;
    const validator = validators[name];
    if (!validator) return true;

    const error = validator(value);
    const errorEl = field.parentElement.querySelector('.form-error');
    const errorMsg = error || '';

    if (error) {
      field.classList.add('error');
      if (errorEl) {
        errorEl.textContent = errorMsg;
        errorEl.classList.remove('hidden');
      }
      return false;
    } else {
      field.classList.remove('error');
      if (errorEl) {
        errorEl.textContent = '';
        errorEl.classList.add('hidden');
      }
      return true;
    }
  };

  // ----- Validar todo el formulario -----
  const validateForm = () => {
    let isValid = true;
    form.querySelectorAll('input, select, textarea').forEach(field => {
      if (field.name && validators[field.name]) {
        if (!validateField(field)) isValid = false;
      }
    });
    return isValid;
  };

  // ----- Mostrar toast de notificación -----
  const showToast = (message, type = 'success') => {
    let toast = document.querySelector('.toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.className = 'toast';
      document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.style.background = type === 'success'
      ? 'linear-gradient(135deg, #7c3aed, #ec4899)'
      : 'linear-gradient(135deg, #ef4444, #dc2626)';
    toast.classList.add('show');

    setTimeout(() => {
      toast.classList.remove('show');
    }, 4000);
  };

  // ----- Mostrar mensaje de éxito en el formulario -----
  const showSuccessMessage = () => {
    const successDiv = document.createElement('div');
    successDiv.className = 'card-neon text-center py-12';
    successDiv.innerHTML = `
      <div class="text-6xl mb-4">✓</div>
      <h3 class="text-2xl font-bold text-white mb-4">¡Mensaje enviado con éxito!</h3>
      <p class="text-gray-300 mb-6">Gracias por contactarnos. Te responderemos en menos de 24 horas.</p>
      <button type="button" id="reset-form" class="btn-outline-neon">Enviar otro mensaje</button>
    `;
    form.parentElement.replaceChild(successDiv, form);

    document.getElementById('reset-form').addEventListener('click', () => {
      location.reload();
    });
  };

  // ----- Event listeners -----
  form.querySelectorAll('input, select, textarea').forEach(field => {
    if (field.name && validators[field.name]) {
      // Validación en blur
      field.addEventListener('blur', () => validateField(field));
      // Limpiar error al escribir
      field.addEventListener('input', () => {
        if (field.classList.contains('error')) {
          validateField(field);
        }
      });
    }
  });

  // ----- Submit -----
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      showToast('Por favor corrige los errores en el formulario', 'error');
      // Scroll al primer error
      const firstError = form.querySelector('.error');
      if (firstError) {
        firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
        firstError.focus();
      }
      return;
    }

    // Deshabilitar botón y mostrar spinner
    submitBtn.disabled = true;
    if (submitBtnText) submitBtnText.classList.add('hidden');
    if (submitBtnSpinner) submitBtnSpinner.classList.remove('hidden');

    // Simular envío al servidor
    await new Promise(resolve => setTimeout(resolve, 1800));

    // Obtener datos del formulario (para posible uso futuro)
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    // En una implementación real, aquí harías fetch('/api/contacto', ...)
    console.log('Datos del formulario:', data);

    // Mostrar éxito
    showSuccessMessage();
    showToast('¡Consulta enviada con éxito!');
  });

})();