# ⚙️ 01. Stack Tecnológico

Define las tecnologías, dependencias y herramientas para el desarrollo de la aplicación web.

---

## 1. Núcleo Tecnológico
- **Frontend Core:** HTML5 + Vanilla TypeScript
- **Estilos:** TailwindCSS
- **Gestor de Paquetes:** pnpm
- **Runtime / Entorno:** Node.js LTS
- **Despliegue / Hosting:** GitHub Pages (repositorio público `Mordaft/anaxagoras-ia-tr` con GitHub Actions)
- **Capacidades Offline & Móvil:** Progressive Web App (PWA) con Service Worker versionado y soporte de actualizaciones automáticas
- **Internacionalización:** Estándar `i18next` con diccionarios modulares en JSON (Castellano, Català, Galego, Euskera, Valencià)

---

## 2. Librerías y Dependencias Permitidas
- **Iconografía:** Heroicons (SVGs optimizados)
- **Fuentes tipográficas:** Google Fonts (*Plus Jakarta Sans*, *Outfit*, *Inter*)
- **Internacionalización:** `i18next`
- **Animaciones:** CSS Transitions nativas / Motion
- **Gestión de Formularios / Estado:** Nativo + Eventos reactivos
- **Flujos de utilización de IA:** LangGraph / Inferencia OpenAI estándar (Local Ollama / Cloud)
- **Calendarios:** Integración con Google Calendar API (OAuth 2.0)
- **Archivos:** Integración con Google Drive API (OAuth 2.0)
- **Autenticación:** Google Authentication OAuth 2.0
- **Almacenamiento Local:** IndexedDB con `dexie.js`

---

## 3. Entorno de Ejecución Local y Despliegue
- **Comando de inicio local:** `pnpm run dev`
- **Puerto por defecto:** 8086
- **Requisitos de build:** `pnpm run build`
- **Flujo CI/CD:** `.github/workflows/deploy.yml` automático en push a `main` hacia GitHub Pages

---

## 4. Restricciones Técnicas
- *Utilizar IndexedDB con librería dexie.js para almacenamiento de datos locales.*
- *Carga incremental de módulos, bundles optimizados y rutas relativas compatibles con GitHub Pages.*
- *No almacenar datos sensibles, credenciales, claves API en repositorios.*
- *Todas las cadenas visibles al usuario deben residir en las tablas de traducción de i18n.*
- *El Service Worker debe notificar actualizaciones sin forzar recargas destructivas de datos.*