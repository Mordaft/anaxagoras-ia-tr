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
| **06** | 12/10/2026 | Separación de Agendas, Retirada de Filtro Artificial y Prompts Curriculares vía API Educativa Mock | Agendas independientes con coincidencia única en Castellano, Trabajos filtrado por perfil natural, `educational-api.ts`, prompts en `src/prompts/curriculares/` | ✅ Completado | Arquitectura desacoplada: Prompts de Sección vs Directrices Curriculares Departamentales de la Entidad Educativa. |

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

### Iteración 06: Segregación Orgánica de Perfiles y Separación Arquitectónica de Prompts (API Educativa Mock)
- **Objetivos y Entregables:**
  1. **Agendas Segregadas por Nivel:** Las agendas semanales de 1º de ESO y 2º de Bachillerato son completamente diferentes y adaptadas al curso escolar, coincidiendo únicamente en la tarea compartida de Lengua Castellana (análisis oracional). El resto de bloques (Ciencias Naturales, Matemáticas, Ciencias Sociales y Lectura en 1º ESO vs Historia de España, Matemáticas II, Filosofía y Química en 2º Batx) son propios de cada grado.
  2. **Apartado Trabajos Desacoplado de Filtros Artificiales:** Eliminación completa del banner con botones de filtrado artificial en `Trabajos`. La vista se adapta orgánicamente según el alumno conectado (`Marc Vidal` o `Álvaro Martín`), filtrando las entregas y recursos de Drive de manera natural. Se incorporó además un botón de alternancia rápida en la cabecera (`🔄 1º ESO` / `🔄 2º Batx`).
  3. **Separación de Prompts (Sección vs Asignatura/Grado):**
     - **Prompts de Sección:** (`socratic_tutor.md`, `project_guide.md`, `agenda_planner.md`, `active_recall_generator.md`): Exclusivamente dedicados a la metodología transversal de la herramienta (andamiaje socrático, planificación espaciada, 4 fases de proyectos y auditoría de autoría).
     - **Prompts Curriculares Específicos por Asignatura y Grado:** Ficheros Markdown independientes ubicados en `src/prompts/curriculares/` (`lengua_castellana_1eso.md` y `lengua_castellana_2batx.md`).
  4. **Servicio Mock de API Educativa Institucional (`educationalApiService`):**
     - Mockea la integración con la API del Departament d'Educació / Esfer@ (`https://api.educacio.gencat.cat/v1/curriculum/guardrails`).
     - Inyecta dinámicamente en tiempo de ejecución las directrices curriculares y rúbricas correspondientes al estudiante conectado en las llamadas al motor de IA (`aiClientService`).
     - Visores transparentes en Agenda, Estudio y Trabajos mediante el botón `🏛️ Directriz API Educativa`, permitiendo a docentes y tribunales auditar qué directriz institucional rige la sesión.

