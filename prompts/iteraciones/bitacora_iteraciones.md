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
| **05** | 12/10/2026 | Diferenciación Curricular 1º ESO vs 2º Bachillerato (Caso Lengua Castellana / Sintaxis) | Modo Demo con Marc Vidal (1º ESO), cuenta con Álvaro Martín (2º Batx), tareas comparadas y tutor socrático adaptado | ✅ Completado | Demostración empírica de adaptación cognitiva según Piaget. |

---

## Detalle de Ciclos

### Iteración 02: GitHub Pages, PWA e i18n Estándar
- **Resumen:** Se añadió CI/CD con GitHub Actions para publicación automática en GitHub Pages, configuración PWA con Service Worker versionado y toast interactivo de actualización, y estandarización con `i18next` en 5 lenguas.

### Iteración 03: Conectores Reales de Google y Modo Demo
- **Resumen:** Conexión OAuth 2.0 real con Google Identity Services (`gsi/client`), llamadas a Calendar API v3 y Drive API v3, manteniendo el Modo Demo para pruebas continuas sin credenciales. Publicación autónoma mediante la herramienta global `gh-pages`.

### Iteración 04: Flujos de Trabajo con IA Local/Cloud y Prompts Estáticos en Markdown
- **Resumen:** Integración de prompts del sistema como ficheros Markdown estáticos en `src/prompts/`, soporte de importación `?raw` en Vite y visor interactivo de transparencia pedagógica en la aplicación.

### Iteración 05: Diferenciación Curricular (1º de ESO vs 2º de Bachillerato)
- **Objetivos y Entregables:**
  1. **Perfil del Alumno en Modo Demo:** Configurado como **Marc Vidal (1º de ESO, 12 años)**, correspondiente al estadio de Operaciones Concretas / Transición de Piaget.
  2. **Perfil del Alumno Conectado / Real:** Configurado como **Álvaro Martín (2º de Bachillerato, 17-18 años)**, correspondiente al estadio de Operaciones Formales de Piaget.
  3. **Caso de Estudio en Lengua Castellana (Análisis Sintáctico):**
     - Oración modelo: *"El tren llegó puntual a la estación"*.
     - **En 1º de ESO:** El complemento verbal se reconoce en bloque como **Complemento Verbal (CV)** que acompaña al predicado, sin exigir subtipos. Tutor socrático con lenguaje cercano y pasos sencillos.
     - **En 2º de Bachillerato:** Es obligatorio indicar la tipología exacta (*puntual* = CPred, *a la estación* = CCL) y justificar con pruebas sintácticas formales (concordancia de género/número con el sujeto: *"Las locomotoras llegaron puntuales"*). Tutor con rigor preuniversitario (PAU).
  4. **Herramientas de Demostración para el Tribunal:** Selector de nivel en Trabajos, Estudio y Modal de Cuenta que permite alternar o contrastar ambos grados con un solo clic.
