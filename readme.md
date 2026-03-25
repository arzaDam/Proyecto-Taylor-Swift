# 🎵 Taylor Swift Fan Page — The Eras Collection

> Fan page educativa dedicada al universo de Taylor Swift.  
> Proyecto de desarrollo web · Buenos Aires, Argentina · 2026

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)](https://developer.mozilla.org/es/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)](https://developer.mozilla.org/es/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6-F7DF1E?style=flat&logo=javascript&logoColor=black)](https://developer.mozilla.org/es/docs/Web/JavaScript)
[![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3-7952B3?style=flat&logo=bootstrap&logoColor=white)](https://getbootstrap.com)

---

## 🌐 Demo en vivo

**[👉 Ver el sitio](https://tusitio.com)**

---

## 📁 Estructura

```
Proyecto-Taylor-Swift/
├── index.html              # Página principal
├── security.js             # Seguridad: XSS, validación, rate limit
├── styles/style.css        # CSS único para todo el sitio
├── pages/
│   ├── jointhefanclub.html # Las 11 eras + sobre Taylor
│   ├── oficialstore.html   # Tienda oficial de merch
│   ├── toursmemories.html  # Fechas del Eras Tour + galería
│   ├── swifties.html       # Contacto con validación segura
│   ├── memories.html       # Galería de momentos históricos
│   └── fans.html           # Fotos, likes, historias, AI chat
└── asset/                  # Imágenes y audio
```

---

## ✨ Features

### 🎨 Diseño
- Fondo rotativo con 5 imágenes de Taylor (fade suave cada 6s)
- Glassmorphism — nav y cards con backdrop-filter blur
- Responsive mobile/tablet/desktop
- Fuentes: Shadows Into Light · Playfair Display · Lato
- Paleta: Verde agua `#2ECEC7` + naranja `#FF6B35`

### 🎵 Reproductor
- Flotante y animado (CSS keyframes)
- Múltiples canciones ⏮ ▶⏸ ⏭
- Barra de progreso clickeable + volumen

### 📄 Páginas
| Página | Contenido |
|--------|-----------|
| Inicio | Hero, stats, era pills, productos destacados |
| Join The Fan Club | 11 eras con cards coloridas, stats, misión |
| Official Store | Merch con filtros por categoría |
| Tours & Memories | Fechas 2026, galería de shows |
| Swifties | Formulario de contacto validado |
| Memories | Galería con lightbox + stats del tour |
| Fans | Fotos, likes, historias, AI chat, donaciones |

### 🔒 Seguridad (security.js)
- `sanitize()` — prevención XSS
- `validateForm()` — validación con reglas configurables
- `checkRateLimit()` — anti-spam por sesión
- `getCSRFToken()` — token CSRF

### ♿ Accesibilidad WCAG AA
- Skip link para teclado
- `role="main"`, `aria-label`, `aria-required`
- Botones táctiles mínimo 44×44px
- `aria-live` en mensajes dinámicos

### 🔍 SEO On-Page
- Title y meta description únicos por página
- Open Graph + Twitter Card en todas las páginas
- Schema.org JSON-LD (WebSite, AboutPage, EventPage...)
- `lang="es"` + canonical en cada página

### 🤖 IA + Interactividad
- Swiftie AI Chatbot — responde sobre eras, canciones y tours
- Muro de ideas con votos de fans
- Sistema de likes en fotos
- Subida de fotos drag & drop con preview
- Lightbox en galerías

---

## 🚀 Ejecutar localmente

```bash
git clone https://github.com/arzaDam/Proyecto-Taylor-Swift.git
```

Luego: clic derecho en `index.html` → **Open with Live Server** en VS Code.

---

## 🎵 Agregar música

```javascript
// En cada HTML, editá este array:
var songs = [
  { title: "Cruel Summer",  src: "../asset/cruel_summer.mp3"  },
  { title: "Anti-Hero",     src: "../asset/anti_hero.mp3"     },
  { title: "Shake It Off",  src: "../asset/shake_it_off.mp3"  }
];
```

---

## 📦 Tecnologías

HTML5 · CSS3 · JavaScript ES6 · Bootstrap 5.3 · Google Fonts · Font Awesome 6.5 · Schema.org JSON-LD

---

## 👤 Autor

**Damián** — Estudiante de Desarrollo Web · Buenos Aires, Argentina · 2026  
[![GitHub](https://img.shields.io/badge/GitHub-arzaDam-181717?style=flat&logo=github)](https://github.com/arzaDam)

---

*Proyecto educativo sin fines de lucro. Contenido de Taylor Swift pertenece a sus respectivos dueños.*  
*Made with ❤️ by a Swiftie developer*
