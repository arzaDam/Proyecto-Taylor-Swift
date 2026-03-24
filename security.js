/* ================================================================
   TAYLOR SWIFT FAN PAGE — SEGURIDAD + ACCESIBILIDAD
   Incluir en todas las páginas:
   <script src="security.js"></script>          (index)
   <script src="../security.js"></script>        (pages/)
================================================================ */

'use strict';

/* ────────────────────────────────────────────────────────────────
   1. SANITIZACIÓN — previene XSS
   Escapa todos los caracteres peligrosos antes de insertar
   texto en el DOM. Usá sanitize() siempre que muestres
   contenido ingresado por el usuario.
──────────────────────────────────────────────────────────────── */
window.sanitize = function(str) {
  if (typeof str !== 'string') return '';
  return str
    .replace(/&/g,  '&amp;')
    .replace(/</g,  '&lt;')
    .replace(/>/g,  '&gt;')
    .replace(/"/g,  '&quot;')
    .replace(/'/g,  '&#x27;')
    .replace(/\//g, '&#x2F;')
    .replace(/`/g,  '&#x60;')
    .trim();
};

/* ────────────────────────────────────────────────────────────────
   2. VALIDACIÓN DE FORMULARIOS
   validateForm(fields) recibe un array de { id, label, rules }
   Reglas disponibles: required, minLen, maxLen, email, noScript
   Devuelve { valid: bool, errors: [] }
──────────────────────────────────────────────────────────────── */
window.validateForm = function(fields) {
  var errors = [];
  fields.forEach(function(f) {
    var el  = document.getElementById(f.id);
    if (!el) return;
    var val = (el.value || '').trim();
    var r   = f.rules || {};

    if (r.required && !val) {
      errors.push(f.label + ' es obligatorio.');
    }
    if (val && r.minLen && val.length < r.minLen) {
      errors.push(f.label + ' debe tener al menos ' + r.minLen + ' caracteres.');
    }
    if (val && r.maxLen && val.length > r.maxLen) {
      errors.push(f.label + ' no puede superar ' + r.maxLen + ' caracteres.');
    }
    if (val && r.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
      errors.push(f.label + ' no es un email válido.');
    }
    if (val && r.noScript && /<script|javascript:|on\w+=/i.test(val)) {
      errors.push(f.label + ' contiene contenido no permitido.');
    }
  });
  return { valid: errors.length === 0, errors: errors };
};

/* ────────────────────────────────────────────────────────────────
   3. MOSTRAR ERRORES DE VALIDACIÓN
   showErrors(errors, containerId)
──────────────────────────────────────────────────────────────── */
window.showErrors = function(errors, containerId) {
  var el = document.getElementById(containerId);
  if (!el) return;
  if (!errors.length) { el.innerHTML = ''; el.style.display = 'none'; return; }
  el.innerHTML = errors.map(function(e) {
    return '<div role="alert" style="margin-bottom:4px">⚠ ' + sanitize(e) + '</div>';
  }).join('');
  el.style.display = 'block';
  el.setAttribute('aria-live', 'assertive');
  el.focus();
};

/* ────────────────────────────────────────────────────────────────
   4. CSRF TOKEN SIMULADO (client-side)
   Para cuando conectes un backend real, este token
   se incluiría en cada form como campo oculto.
──────────────────────────────────────────────────────────────── */
window.getCSRFToken = function() {
  var token = sessionStorage.getItem('csrf_token');
  if (!token) {
    token = Math.random().toString(36).slice(2) + Date.now().toString(36);
    sessionStorage.setItem('csrf_token', token);
  }
  return token;
};

/* ────────────────────────────────────────────────────────────────
   5. RATE LIMIT SIMPLE (previene spam de formularios)
   checkRateLimit(key, limitMs) → true si puede enviar
──────────────────────────────────────────────────────────────── */
window.checkRateLimit = function(key, limitMs) {
  var last = parseInt(sessionStorage.getItem('rl_' + key) || '0');
  var now  = Date.now();
  if (now - last < limitMs) return false;
  sessionStorage.setItem('rl_' + key, now);
  return true;
};

/* ────────────────────────────────────────────────────────────────
   6. ACCESIBILIDAD — teclado y foco
   Permite cerrar modales/lightboxes con Escape
   y navegar con Tab de forma correcta.
──────────────────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', function() {

  /* Cerrar lightbox con Escape */
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      var lb = document.getElementById('lightbox');
      if (lb) lb.classList.remove('open');
      lb = document.getElementById('lightbox');
      if (lb) lb.style.display = 'none';
    }
    /* Activar botones con Enter/Space */
    if ((e.key === 'Enter' || e.key === ' ') && e.target.classList.contains('like-btn')) {
      e.preventDefault();
      e.target.click();
    }
  });

  /* Añadir role y aria a los botones de like dinámicos */
  document.querySelectorAll('.like-btn').forEach(function(btn) {
    if (!btn.getAttribute('aria-label')) {
      btn.setAttribute('aria-label', 'Me gusta');
      btn.setAttribute('tabindex', '0');
    }
  });

  /* Skip-to-content: si existe el link #skip, hacerlo funcional */
  var skip = document.getElementById('skip-link');
  if (skip) {
    skip.addEventListener('click', function(e) {
      e.preventDefault();
      var main = document.querySelector('main') || document.getElementById('main-content');
      if (main) { main.setAttribute('tabindex', '-1'); main.focus(); }
    });
  }

  /* Indicador de foco visible para navegación por teclado */
  document.body.addEventListener('keydown', function(e) {
    if (e.key === 'Tab') document.body.classList.add('keyboard-nav');
  });
  document.body.addEventListener('mousedown', function() {
    document.body.classList.remove('keyboard-nav');
  });

  /* Anunciar cambios de página a lectores de pantalla */
  var announcer = document.getElementById('sr-announcer');
  if (!announcer) {
    announcer = document.createElement('div');
    announcer.id = 'sr-announcer';
    announcer.setAttribute('aria-live', 'polite');
    announcer.setAttribute('aria-atomic', 'true');
    announcer.style.cssText = 'position:absolute;left:-9999px;width:1px;height:1px;overflow:hidden';
    document.body.appendChild(announcer);
  }
  window.announce = function(msg) { announcer.textContent = msg; };
});