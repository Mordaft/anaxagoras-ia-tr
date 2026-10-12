# 📖 Bitácora de Iteraciones - Anaxagoras AI

Registro cronológico de los avances, decisiones y construcciones del proyecto.

---

| Iteración | Fecha | Objetivo Principal | Entregables / Archivos | Estado | Observaciones / Próximo paso |
| :---: | :---: | :--- | :--- | :---: | :--- |
| **00** | 12/10/2026 | Configuración del entorno y arquitectura de prompts | Estructura en `prompts/`, git init, README | ✅ Completado | Separación técnica y funcional establecida. |
| **01** | 12/10/2026 | Prototipo base de Anaxagoras AI (Agenda, Estudio, Trabajos, Google Auth, Config IA) | Scaffold Vite + Vanilla TS + Tailwind, Dexie DB, vistas modulares, servicios base | ✅ Completado | Servidor dev activo en puerto 8086. |
| **02** | 12/10/2026 | Refinamiento técnico: GitHub Pages, PWA con ciclo de updates e i18n estándar | Workflow deploy.yml, manifest, sw.js, pwa-service, i18next + 5 lenguas completas en la UI | ✅ Completado | PWA instalable, multilingüe y lista para deploy. |
| **03** | 12/10/2026 | Conectores reales a Google (OAuth 2.0 GIS, Calendar API, Drive API) con Modo Demo | Google GIS client, `google-auth.ts`, `google-calendar.ts`, `google-drive.ts`, switch modo demo | ✅ Completado | Conexión real a servicios Google + modo demo funcional. |
| **04** | 12/10/2026 | Flujos de trabajo con modelo Local/Cloud y prompts estáticos como Markdown | Ficheros `.md` en `src/prompts/`, importación Vite raw, modal visor de prompts, flujos de IA en Agenda, Estudio y Trabajos | ✅ Completado | Prompts auditables y flujos de IA integrados. |

---

## Detalle de Ciclos

### Iteración 02: GitHub Pages, PWA e i18n Estándar
- **Resumen:** Se añadió CI/CD con GitHub Actions para publicación automática en GitHub Pages, configuración PWA con Service Worker versionado y toast interactivo de actualización, y estandarización con `i18next` en 5 lenguas.

### Iteración 03: Conectores Reales de Google y Modo Demo
- **Resumen:** Conexión OAuth 2.0 real con Google Identity Services (`gsi/client`), llamadas a Calendar API v3 y Drive API v3, manteniendo el Modo Demo para pruebas continuas sin credenciales. Publicación autónoma mediante la herramienta global `gh-pages`.

### Iteración 04: Flujos de Trabajo con IA Local/Cloud y Prompts Estáticos en Markdown
- **Objetivos y Entregables:**
  1. **Prompts como contenido estático Markdown:** Creados en `src/prompts/` (`agenda_planner.md`, `socratic_tutor.md`, `project_guide.md`, `active_recall_generator.md`).
  2. **Importación estática transparente:** Configurado `src/vite-env.d.ts` para importar los prompts con `?raw` en tiempo de empaquetado, garantizando disponibilidad offline en PWA y rendimiento instantáneo.
  3. **Visor de Prompts en la aplicación:** Implementado `PromptViewerModal` para que alumnos y educadores puedan auditar en cualquier momento las directrices pedagógicas del sistema con un solo clic.
  4. **Integración del cliente LLM estándar (Local/Cloud):** Actualizado `aiClientService` con llamada OpenAI compatible (`/v1/chat/completions`) para modelos locales (Ollama en `http://localhost:11434`) o proveedores Cloud (OpenAI, Groq, etc.), con fallback socrático simulado para modo offline/demo.
  5. **Flujos de trabajo interactivos:**
     - **Agenda:** Botón "🤖 Planificar con IA" para generación asistida de bloques de estudio espaciado y botón para inspeccionar el prompt del planificador.
     - **Estudio/Repaso:** Botones para auditar el prompt socrático y de recall, y generador asistido por IA de nuevos desafíos de Active Recall.
     - **Trabajos:** Botón para auditar el prompt de guía de proyectos por fases.
