# 📖 Bitácora de Iteraciones - Anaxagoras AI

Registro cronológico de los avances, decisiones y construcciones del proyecto.

---

| Iteración | Fecha | Objetivo Principal | Entregables / Archivos | Estado | Observaciones / Próximo paso |
| :---: | :---: | :--- | :--- | :---: | :--- |
| **00** | 12/10/2026 | Configuración del entorno y arquitectura de prompts | Estructura en `prompts/`, git init, README | ✅ Completado | Separación técnica y funcional establecida. |
| **01** | 12/10/2026 | Prototipo base de Anaxagoras AI (Agenda, Estudio, Trabajos, Google Auth, Config IA) | Scaffold Vite + Vanilla TS + Tailwind, Dexie DB, vistas modulares, servicios base | ✅ Completado | Servidor dev activo en puerto 8086. |
| **02** | 12/10/2026 | Refinamiento técnico: GitHub Pages, PWA con ciclo de updates e i18n estándar | Workflow deploy.yml, manifest, sw.js, pwa-service, i18next + 5 lenguas completas en la UI | ✅ Completado | PWA instalable, multilingüe y lista para deploy. |
| **03** | 12/10/2026 | Conectores reales a Google (OAuth 2.0 GIS, Calendar API, Drive API) con Modo Demo | Google GIS client, `google-auth.ts`, `google-calendar.ts`, `google-drive.ts`, switch modo demo | 🚀 En curso | Implementación de conectores y modo demo. |

---

## Detalle de Ciclos

### Iteración 02: GitHub Pages, PWA e i18n Estándar
- **Resumen:** Se añadió CI/CD con GitHub Actions para publicación automática en GitHub Pages, configuración PWA con Service Worker versionado y toast interactivo de actualización, y estandarización con `i18next` en 5 lenguas.

### Iteración 03: Conectores Reales de Google y Modo Demo
- **Objetivos:**
  1. Conexión OAuth 2.0 real con Google Identity Services (`gsi/client`) y persistencia segura de token de sesión.
  2. Implementación de llamadas reales a la **Google Calendar API v3** para lectura y creación de eventos en el calendario principal.
  3. Implementación de llamadas reales a la **Google Drive API v3** para lectura y vinculación de documentos escolares del alumno.
  4. Preservación del **Modo Demo** como alternativa inmediata sin credenciales para evaluación y pruebas continuas.
