# 📖 Bitácora de Iteraciones - Anaxagoras AI

Registro cronológico de los avances, decisiones y construcciones del proyecto.

---

| Iteración | Fecha | Objetivo Principal | Entregables / Archivos | Estado | Observaciones / Próximo paso |
| :---: | :---: | :--- | :--- | :---: | :--- |
| **00** | 12/10/2026 | Configuración del entorno y arquitectura de prompts | Estructura en `prompts/`, git init, README | ✅ Completado | Separación técnica y funcional establecida. |
| **01** | 12/10/2026 | Prototipo base de Anaxagoras AI (Agenda, Estudio, Trabajos, Google Auth, Config IA) | Scaffold Vite + Vanilla TS + Tailwind, Dexie DB, vistas modulares, servicios base | ✅ Completado | Servidor dev activo en puerto 8086. |
| **02** | 12/10/2026 | Refinamiento técnico: GitHub Pages, PWA con ciclo de updates e i18n estándar | Workflow deploy.yml, manifest, sw.js, pwa-service, i18next + 5 lenguas completas en la UI | 🚀 En curso | Implementación técnica en curso. |

---

## Detalle de Ciclos

### Iteración 01: Prototipo Base de Anaxagoras AI
- **Resumen:** Implementación del diseño inicial con estética moderna para la nueva generación, persistencia local con Dexie.js, integración Google y motor socrático.

### Iteración 02: GitHub Pages, PWA e i18n Estándar
- **Objetivos:**
  1. Configuración de despliegue a **GitHub Pages** mediante GitHub Actions (`deploy.yml`) y rutas base relativas en Vite.
  2. Implementación de **PWA completa**: `manifest.webmanifest`, `sw.js` con soporte offline y servicio `pwa-service.ts` con toast reactivo para notificar y aplicar nuevas versiones.
  3. Adopción del estándar **i18n con `i18next`**: Diccionarios completos en `src/locales/` para Castellano (ES), Catalán (CA), Gallego (GA), Euskera (EU) y Valenciano (VA), adaptando todos los componentes y textos de la UI.
