# 🎵 NEON BEATS - Landing Page Template

Template multipágina para DJ / Productora de Eventos. Diseño moderno con estética **neón nocturno**, animaciones fluidas y datos mockeados listos para personalizar.

![Status](https://img.shields.io/badge/Status-Ready%20to%20Use-success)
![HTML5](https://img.shields.io/badge/HTML5-Multipage-orange)
![Tailwind](https://img.shields.io/badge/Tailwind-CDN-blue)
![JS](https://img.shields.io/badge/JS-Native-yellow)

---

## ✨ Características

- 🎨 **Diseño neón moderno** (negro + violeta + magenta)
- 📱 **100% Responsive** (mobile, tablet, desktop)
- ⚡ **Sin build step**: solo HTML, Tailwind CDN y JS nativo
- 🎭 **8 páginas independientes** con navbar y footer consistentes
- ✨ **Animaciones fluidas** con IntersectionObserver
- 🖼️ **Galería interactiva** con lightbox y filtros
- 📧 **Formulario validado** con simulación de envío
- 🗺️ **Mapa de Google Maps** embebido
- 💬 **Botón flotante de WhatsApp**
- 📜 **Páginas legales** completas (Privacidad + Términos)
- 🔍 **SEO básico** con meta tags
- ♿ **Accesibilidad** (ARIA labels, focus visible)

---

## 📁 Estructura de Archivos

```
dj-productora-eventos-01/
├── index.html                       # 🏠 Página de Inicio
├── sobre-nosotros.html              # 👥 Sobre Nosotros
├── servicios.html                   # 🎧 Servicios
├── galeria.html                     # 📸 Galería (con lightbox)
├── precios.html                     # 💰 Precios (4 planes)
├── contacto.html                    # 📧 Contacto (formulario + mapa + horarios)
├── politica-de-privacidad.html      # 🔒 Política de Privacidad
├── terminos-y-condiciones.html      # 📜 Términos y Condiciones
│
├── css/
│   └── styles.css                   # Estilos personalizados (neón, animaciones)
│
├── js/
│   ├── data.js                      # 📊 TODOS los datos mockeados (editar aquí)
│   ├── main.js                      # Layout (navbar/footer), animaciones globales
│   ├── home.js                      # Stats counter animado
│   ├── galeria.js                   # Filtros + lightbox
│   └── contact-form.js              # Validación formulario
│
└── README.md                        # Este archivo
```

---

## 🚀 Cómo Usar

### Opción 1: Abrir directamente
Simplemente abre `index.html` en tu navegador. **No requiere servidor**.

### Opción 2: Servidor local (recomendado)
```bash
# Con Python
python -m http.server 8000

# Con Node.js
npx serve

# Con PHP
php -S localhost:8000
```
Luego abre http://localhost:8000

---

## 🎨 Personalización

### 1️⃣ Cambiar datos de la empresa

Edita **únicamente** el archivo `js/data.js`. Todos los textos de la web se generan desde aquí.

```js
const djData = {
  empresa: {
    nombre: "TU NOMBRE AQUÍ",
    tagline: "Tu tagline",
    descripcionCorta: "...",
    anioFundacion: 2024
  },

  contacto: {
    email: "tu@email.com",
    telefono: "+56 9 1234 5678",
    whatsapp: "56912345678",          // sin el "+"
    direccion: "Tu dirección completa",
    horarios: [
      { dia: "Lunes a Viernes", horario: "10:00 - 20:00 hrs" },
      // ...
    ],
    redes: {
      instagram: "https://instagram.com/tu-cuenta",
      facebook: "https://facebook.com/tu-pagina",
      tiktok: "https://tiktok.com/@tu-cuenta",
      youtube: "https://youtube.com/@tu-canal"
    }
  },

  stats: [
    { valor: 500, sufijo: "+", etiqueta: "Eventos" },
    // ...
  ],

  servicios: [
    {
      icono: "💍",                     // Emoji o icono
      titulo: "DJ para Bodas",
      descripcion: "Descripción del servicio...",
      destacado: true                   // Aparece en home
    },
    // ...
  ],

  planes: [
    {
      nombre: "Básico",
      precio: "CLP$450.000",
      duracion: "3 horas de servicio",
      destacado: false,
      caracteristicas: ["...", "..."],
      ideal: "Fiestas íntimas"
    },
    // ...
  ],

  galeria: [
    { categoria: "bodas", url: "https://...", alt: "Descripción" },
    // categorías: bodas, corporativos, fiestas, conciertos
  ],

  testimonios: [
    {
      nombre: "Cliente",
      evento: "Boda - Marzo 2025",
      comentario: "...",
      rating: 5
    }
  ]
};
```

### 2️⃣ Cambiar colores

Los colores neón están definidos en **3 lugares**:

**a) `css/styles.css` (variables CSS):**
```css
:root {
  --color-neon-pink: #ec4899;
  --color-neon-purple: #a855f7;
  --color-neon-violet: #7c3aed;
}
```

**b) En cada archivo HTML (Tailwind config inline):**
```html
<script>
  tailwind.config = {
    theme: {
      extend: {
        colors: {
          'neon-pink': '#ec4899',
          'neon-purple': '#a855f7',
          'neon-violet': '#7c3aed'
        }
      }
    }
  }
</script>
```

> 💡 **Tip:** Para cambiar colores en todas las páginas, usa "Buscar y reemplazar" en tu editor.

### 3️⃣ Cambiar imágenes de la galería

Edita `js/data.js` → array `galeria`:

```js
galeria: [
  {
    categoria: "bodas",         // bodas | corporativos | fiestas | conciertos
    url: "https://tu-imagen.jpg",
    alt: "Descripción accesible"
  },
  // Agrega todas las que quieras
]
```

Las imágenes actuales vienen de **Unsplash** (URLs externas). Para reemplazarlas:
- Sube tus fotos a un servicio (Cloudinary, ImgBB, etc.)
- Reemplaza la URL
- Mantén el formato `categoria`, `url`, `alt`

### 4️⃣ Cambiar el mapa de Google Maps

En `contacto.html`, busca el `<iframe>` y reemplaza la URL `src` con la de tu ubicación:

```html
<iframe
  src="TU_URL_DE_GOOGLE_MAPS_EMBED_AQUI"
  ...
></iframe>
```

Para obtener la URL embed:
1. Ve a Google Maps → busca tu dirección
2. Click en "Compartir" → "Insertar un mapa"
3. Copia solo el atributo `src` del iframe

### 5️⃣ Configurar el formulario de contacto

El formulario **actualmente NO envía emails** (es una simulación). Para hacerlo funcional necesitas un backend. Opciones:

- **Formspree** (gratis): https://formspree.io
- **EmailJS** (gratis hasta 200/mes): https://emailjs.com
- **Tu propio backend** con PHP/Node/Python

Edita `js/contact-form.js`, función `submit`:
```js
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  // ...validación...

  // Reemplaza la simulación con tu servicio:
  const response = await fetch('https://formspree.io/f/TU_ID', {
    method: 'POST',
    body: new FormData(form),
    headers: { 'Accept': 'application/json' }
  });

  if (response.ok) {
    showSuccessMessage();
  }
});
```

---

## 📞 Botón flotante de WhatsApp

Se crea automáticamente desde `js/main.js`. Usa el número definido en `djData.contacto.whatsapp`.

Para cambiar el mensaje predeterminado:
```js
// js/main.js, busca "whatsapp-fab":
whatsappBtn.href = `https://wa.me/${djData.contacto.whatsapp}?text=${encodeURIComponent('Tu mensaje aquí')}`;
```

---

## 🌐 SEO - Meta Tags

Cada página tiene meta tags básicos. Para mejorar SEO:

1. Edita el `<title>` y `<meta name="description">` en cada archivo HTML
2. Agrega [Open Graph tags](https://ogp.me/) para compartir en redes sociales
3. Genera un `sitemap.xml` y `robots.txt`
4. Agrega Google Analytics en cada página

---

## 🖼️ Reemplazar emojis por iconos

El template usa emojis para los iconos de servicios. Si prefieres iconos SVG profesionales:

1. Usa [Lucide](https://lucide.dev/) o [Heroicons](https://heroicons.com/)
2. Reemplaza en `js/data.js`:
   ```js
   servicios: [
     { icono: '<svg>...</svg>', titulo: "..." }
   ]
   ```

⚠️ **Importante**: si usas SVG, usa `innerHTML` en lugar de `textContent` al renderizar.

---

## 📦 Despliegue

### Hosting gratuito recomendado:

- **Netlify**: drag & drop la carpeta → https://app.netlify.com/drop
- **Vercel**: https://vercel.com (también drag & drop)
- **GitHub Pages**: sube a un repo y activa Pages
- **Cloudflare Pages**: https://pages.cloudflare.com

### Dominio personalizado:
Una vez desplegado, compra un dominio (ej: neonbeats.cl) y conéctalo al hosting.

---

## 🛠️ Stack Técnico

| Tecnología | Uso |
|---|---|
| HTML5 | Estructura semántica |
| Tailwind CSS 3.x | Estilos (vía CDN) |
| JavaScript ES6+ | Interactividad |
| Google Fonts | Tipografías (Outfit + Orbitron) |
| Unsplash | Imágenes de galería |
| Google Maps | Mapa embebido |

**Sin frameworks**: no usa React, Vue, jQuery ni nada similar. JS nativo puro.

---

## 📝 Licencia

Template de uso libre. Puedes modificarlo, venderlo y adaptarlo a tus necesidades.

Las imágenes de Unsplash tienen su propia licencia: https://unsplash.com/license

---

## 🐛 Solución de Problemas

**El menú hamburguesa no abre:**
- Verifica que `js/main.js` se cargue después de `injectLayout()`
- Revisa la consola del navegador (F12) por errores

**El formulario no valida:**
- Asegúrate de que `js/contact-form.js` se cargue **después** de definir el formulario
- Revisa que los `name` de los inputs coincidan con las claves de `validators`

**La galería no muestra imágenes:**
- Verifica que `js/data.js` cargue ANTES de `js/galeria.js`
- Comprueba las URLs de Unsplash (algunas pueden haber cambiado)

**El mapa no se ve:**
- Google Maps embed requiere conexión a internet
- Verifica que el iframe tenga `width="100%"` y `height` adecuado

---

## 💡 Mejoras Futuras Sugeridas

- [ ] Integración con backend real para formulario
- [ ] Sistema de reservas online con calendario
- [ ] Blog/noticias para SEO
- [ ] Multi-idioma (ES/EN)
- [ ] Panel de administración
- [ ] Integración con pasarela de pagos
- [ ] Galería con videos

---

**¿Necesitas ayuda?** Revisa el código comentado en cada archivo JS. Todo está documentado.

**Hecho con 💜 en Chile 🇨🇱**