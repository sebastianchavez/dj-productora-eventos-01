// ============================================
// DATOS MOCKEADOS - NEON BEATS
// DJ / Productora de Eventos - Santiago, Chile
// ============================================

const djData = {
  // Información de la empresa
  empresa: {
    nombre: "NEON BEATS",
    tagline: "Producción de eventos que encienden la noche",
    descripcionCorta: "Somos una productora de eventos y DJ profesional con más de 10 años creando experiencias inolvidables en bodas, fiestas privadas y eventos corporativos en Chile.",
    descripcionLarga: "NEON BEATS nació en 2014 en Santiago de Chile, fruto de la pasión de un grupo de DJs y productores de eventos que soñaban con transformar cada celebración en una experiencia única. Con más de una década en la industria, hemos sonorizado más de 500 eventos, desde íntimas bodas hasta grandes fiestas corporativas, consolidándonos como referentes de la escena electrónica nacional.",
    anioFundacion: 2014
  },

  // Información de contacto
  contacto: {
    email: "contacto@neonbeats.cl",
    telefono: "+56 9 8765 4321",
    whatsapp: "56987654321",
    direccion: "Av. Apoquindo 4501, Of. 1203, Las Condes, Santiago, Chile",
    horarios: [
      { dia: "Lunes a Viernes", horario: "10:00 - 20:00 hrs" },
      { dia: "Sábados", horario: "11:00 - 15:00 hrs" },
      { dia: "Domingos", horario: "Cerrado / Solo eventos" }
    ],
    redes: {
      instagram: "https://instagram.com/neonbeats.cl",
      facebook: "https://facebook.com/neonbeatscl",
      tiktok: "https://tiktok.com/@neonbeats.cl",
      youtube: "https://youtube.com/@neonbeatscl",
      spotify: "https://open.spotify.com/user/neonbeats"
    }
  },

  // Estadísticas principales
  stats: [
    { valor: 500, sufijo: "+", etiqueta: "Eventos Realizados" },
    { valor: 10, sufijo: "+", etiqueta: "Años de Experiencia" },
    { valor: 200, sufijo: "+", etiqueta: "Bodas Sonorizadas" },
    { valor: 100, sufijo: "%", etiqueta: "Clientes Felices" }
  ],

  // Servicios ofrecidos
  servicios: [
    {
      icono: "💍",
      titulo: "DJ para Bodas",
      descripcion: "Repertorio personalizado para cada momento: ceremonia, cóctel, banquete y fiesta. Coordinación total con tu wedding planner.",
      destacado: true
    },
    {
      icono: "🏢",
      titulo: "Eventos Corporativos",
      descripcion: "Lanzamientos de marca, fiestas de fin de año, convenciones. Sonido profesional y ambientación acorde a tu empresa.",
      destacado: true
    },
    {
      icono: "🎂",
      titulo: "Fiestas Privadas",
      descripcion: "Cumpleaños, quinceañeras, aniversarios y despedidas. Adaptamos el repertorio a tus gustos y los de tus invitados.",
      destacado: false
    },
    {
      icono: "🎪",
      titulo: "Producción Integral",
      descripcion: "Nos encargamos de TODO: sonido, iluminación, escenario, animación y coordinación. Tú solo disfruta.",
      destacado: true
    },
    {
      icono: "🔊",
      titulo: "Sonido e Iluminación",
      descripcion: "Alquiler de equipos profesionales: consolas Pioneer, cabinas, iluminación LED, láser, máquinas de humo.",
      destacado: false
    },
    {
      icono: "🎤",
      titulo: "Shows en Vivo",
      descripcion: "Bandas en vivo, cantantes, instrumentistas. Combina DJs con presentaciones en directo para eventos únicos.",
      destacado: false
    },
    {
      icono: "🎙️",
      titulo: "Animación y MC",
      descripcion: "Presentadores profesionales que mantienen la energía alta, conducen juegos y dinamizan tu evento.",
      destacado: false
    },
    {
      icono: "🎭",
      titulo: "Fiestas Temáticas",
      descripcion: "Décadas, tropicales, neon party, black & white, disco 80s. Ambientación total con vestuario y decoración.",
      destacado: false
    }
  ],

  // Misión, Visión, Valores
  nosotros: {
    mision: "Crear experiencias musicales y visuales inolvidables que superen las expectativas de nuestros clientes, fusionando talento artístico con tecnología de punta.",
    vision: "Ser la productora de eventos referente en Chile y Latinoamérica, reconocida por la calidad artística, innovación tecnológica y compromiso con cada celebración.",
    valores: [
      { titulo: "Pasión", descripcion: "Amamos lo que hacemos y se nota en cada evento." },
      { titulo: "Profesionalismo", descripcion: "Puntualidad, compromiso y calidad en cada detalle." },
      { titulo: "Innovación", descripcion: "Siempre a la vanguardia en sonido e iluminación." },
      { titulo: "Empatía", descripcion: "Escuchamos tus ideas y las hacemos realidad." }
    ]
  },

  // Planes de precios
  planes: [
    {
      nombre: "Básico",
      precio: "CLP$450.000",
      duracion: "3 horas de servicio",
      destacado: false,
      caracteristicas: [
        "1 DJ profesional",
        "Equipo de sonido estándar (hasta 80 personas)",
        "Iluminación básica LED",
        "Repertorio musical estándar",
        "1 reunión de planificación",
        "Garantía de equipo backup"
      ],
      ideal: "Fiestas íntimas y reuniones familiares"
    },
    {
      nombre: "Premium",
      precio: "CLP$890.000",
      duracion: "5 horas de servicio",
      destacado: true,
      badge: "MÁS POPULAR",
      caracteristicas: [
        "Todo lo del plan Básico",
        "Equipo de sonido profesional (hasta 150 personas)",
        "Iluminación LED + luces móviles",
        "Máquina de humo profesional",
        "Repertorio personalizado",
        "2 reuniones de planificación",
        "Animación y conducción",
        "Set up premium con cabina iluminada"
      ],
      ideal: "Bodas, fiestas grandes y eventos corporativos"
    },
    {
      nombre: "VIP",
      precio: "CLP$1.490.000",
      duracion: "6 horas de servicio",
      destacado: false,
      caracteristicas: [
        "Todo lo del plan Premium",
        "Equipo de sonido line array (hasta 300 personas)",
        "Iluminación profesional + láser",
        "2 DJs sincronizados (tag team)",
        "Pantalla LED + visuales",
        "Coordinación con proveedores",
        "Asesoría completa del evento",
        "Sesión de fotos del recuerdo"
      ],
      ideal: "Eventos premium, grandes y producciones"
    },
    {
      nombre: "Custom",
      precio: "A medida",
      duracion: "Según tus necesidades",
      destacado: false,
      caracteristicas: [
        "Plan 100% personalizado",
        "Múltiples DJs y banda en vivo",
        "Producción completa",
        "Decoración y ambientación",
        "Catering opcional",
        "Servicio de fotografía y video",
        "Cobertura nacional",
        "Asesor dedicado"
      ],
      ideal: "Eventos corporativos y producciones únicas"
    }
  ],

  // Galería de imágenes (Unsplash temáticos)
  galeria: [
    { categoria: "bodas", url: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80", alt: "Boda con DJ en fiesta" },
    { categoria: "bodas", url: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=800&q=80", alt: "Pareja de novios bailando" },
    { categoria: "bodas", url: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&q=80", alt: "Recepción de boda iluminada" },
    { categoria: "corporativos", url: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&q=80", alt: "Evento corporativo con luces" },
    { categoria: "corporativos", url: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&q=80", alt: "Conferencia con escenario" },
    { categoria: "corporativos", url: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80", alt: "Lanzamiento de producto" },
    { categoria: "fiestas", url: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&q=80", alt: "Fiesta con luces neón" },
    { categoria: "fiestas", url: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&q=80", alt: "Multitudes en concierto" },
    { categoria: "fiestas", url: "https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=800&q=80", alt: "Fiesta nocturna con luces" },
    { categoria: "fiestas", url: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=800&q=80", alt: "Personas bailando en fiesta con luces" },
    { categoria: "conciertos", url: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&q=80", alt: "Concierto con escenario iluminado" },
    { categoria: "conciertos", url: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=800&q=80", alt: "DJ en concierto" },
    { categoria: "conciertos", url: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&q=80", alt: "Show en vivo" },
    { categoria: "conciertos", url: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=800&q=80", alt: "Concierto con luces láser" },
    { categoria: "bodas", url: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&q=80", alt: "Decoración de boda" },
    { categoria: "corporativos", url: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&q=80", alt: "Evento de gala" }
  ],

  // Testimonios (opcional, para futuras secciones)
  testimonios: [
    {
      nombre: "Camila y Rodrigo",
      evento: "Boda - Marzo 2025",
      comentario: "NEON BEATS hizo de nuestra boda algo mágico. La música fue perfecta en cada momento. 100% recomendados.",
      rating: 5
    },
    {
      nombre: "Empresa TechCorp",
      evento: "Fiesta Fin de Año 2024",
      comentario: "Profesionalismo absoluto. Coordinaron todo a la perfección con 250 personas. La iluminación fue espectacular.",
      rating: 5
    },
    {
      nombre: "Andrea Salinas",
      evento: "Cumpleaños 30 - Enero 2025",
      comentario: "La mejor fiesta de mi vida. El DJ leyó perfectamente al público. Todos bailamos hasta el final.",
      rating: 5
    }
  ]
};

// Exportar para uso en módulos (si se usa type="module")
if (typeof module !== 'undefined' && module.exports) {
  module.exports = djData;
}