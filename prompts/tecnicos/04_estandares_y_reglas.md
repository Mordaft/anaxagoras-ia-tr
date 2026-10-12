# 📏 04. Estándares, Buenas Prácticas y Reglas de Código

Pautas de calidad técnica que la IA debe verificar en cada generación de código.

---

## 1. Semántica y Estructura HTML
- Uso de etiquetas semánticas obligatorias: `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`.
- Jerarquía estricta de encabezados: solo **un único `<h1>` por página**, seguido ordenadamente por `<h2>`, `<h3>`.
- Atributos `alt` obligatorios y descriptivos en todas las imágenes.
- Identificadores únicos (`id="..."`) y descriptivos en elementos interactivos para testing y accesibilidad.

---

## 2. SEO Técnico y Metadatos
- Etiqueta `<title>` descriptiva y atractiva.
- `<meta name="description" content="...">` precisa y persuasiva.
- Metaetiquetas Open Graph básicas (`og:title`, `og:description`, `og:image`).
- `viewport` configurado para dispositivos móviles: `width=device-width, initial-scale=1.0`.

---

## 3. Accesibilidad (a11y)
- Contraste de color mínimo WCAG AA (mínimo 4.5:1 para texto normal).
- Atributos `aria-label` en botones con solo icono.
- Navegación por teclado usable (`:focus-visible` con anillo visible).

---

## 4. Convenciones de Código
- **CSS:** Clases legibles con metodología BEM o utilidades semánticas (`.hero__title`, `.nav-link`, etc.).
- **JavaScript:** Sintaxis moderna ES6+ (`const`/`let`, arrow functions, `async`/`await`), modular y sin variables globales innecesarias.
- **Rendimiento:** Carga asíncrona/defer de scripts no críticos, optimización de fuentes y formatos de imagen modernos.
