# 📏 04. Estándares, Buenas Prácticas y Reglas de Código

Pautas de calidad técnica que la IA debe verificar en cada generación de código.

---

## 1. Estándar de Internacionalización (i18n)
- **Cero texto hardcoded:** Toda cadena mostrada al usuario en vistas, botones, mensajes de error o modales debe obtenerse mediante `t('modulo.clave')` de `src/services/i18n.ts`.
- **Estructura semántica de claves:** Organizar las claves por componentes (ej. `nav.*`, `tabs.*`, `agenda.*`, `study.*`, `tasks.*`, `aiModal.*`, `authModal.*`, `pwa.*`).
- **Completitud multilingüe:** Mantener actualizados sincronizadamente los 5 diccionarios oficiales: Castellano (`es`), Catalán (`ca`), Gallego (`ga`), Euskera (`eu`) y Valenciano (`val`).

---

## 2. Progressive Web App (PWA) y Ciclo de Vida
- **Instalabilidad:** Cumplir los criterios de PWA de Google Lighthouse (manifest válido, iconos 192/512px, start_url, display: standalone).
- **Gestión de Actualizaciones:** Cuando se despliegue una nueva versión, el Service Worker detectará la actualización y mostrará un toast interactivo *"Nueva versión disponible [Actualizar]"* sin interrumpir de forma agresiva la actividad en curso.
- **Rutas Relativas:** Todos los enlaces y assets deben ser relativos para permitir que la app funcione sin cambios tanto en subrutas de GitHub Pages (`/anaxagoras-ia-tr/`) como en dominios raíz.

---

## 3. Despliegue en GitHub Pages
- Publicación autónoma mediante el comando `pnpm run deploy` utilizando la herramienta `gh-pages` (`gh-pages -d dist`).
- El build estático generado en `dist/` debe ser autocontenido y no depender de rutas absolutas `/assets/...`.

---

## 4. Semántica, Accesibilidad (a11y) y Calidad
- Jerarquía semántica estricta (`<header>`, `<nav>`, `<main>`, `<section>`).
- Contraste de colores compatible con WCAG AA.
- Manejo estricto de tipos TypeScript sin uso de `any` injustificado.
