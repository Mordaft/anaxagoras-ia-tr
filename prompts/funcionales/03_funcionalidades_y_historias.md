# 📋 03. Funcionalidades e Historias de Usuario - Anaxagoras AI

Requisitos funcionales centrados en la autonomía del estudiante, crecimiento cognitivo y conectividad.

---

## 1. Módulos y Funcionalidades Requeridas (Iteración 04)

| Módulo / Componente | Descripción funcional | Prioridad |
| :--- | :--- | :---: |
| **Flujos de Trabajo con IA (Local/Cloud)** | Integración con modelo Local (Ollama) o Cloud (OpenAI API standard) mediante prompts de sistema especializados para cada sección. | P1 |
| **Prompts Estáticos en Markdown** | Cada sección dispone de su prompt oficial embebido como fichero markdown estático (`agenda_planner.md`, `socratic_tutor.md`, `project_guide.md`, `active_recall_generator.md`). | P1 |
| **Auditoría e Inspección de Prompts** | Modal interactivo para que educadores y alumnos puedan inspeccionar en cualquier momento las instrucciones y reglas pedagógicas que guían a la IA en cada sección. | P1 |
| **Planificador de Estudio IA (Agenda)** | Generación autónoma de bloques de estudio espaciados con objetivos activos e inserción directa en el calendario. | P1 |
| **Generador de Desafíos Active Recall** | Creación bajo demanda de tarjetas de recuperación activa para comprobar la comprensión sin respuestas fáciles. | P1 |
| **Google Connectors (Real & Demo)** | Doble modalidad: **Modo Demo** (entorno precargado inmediato para evaluación) y **Conector Real Google** con Google Identity Services (GIS), Client ID configurable y tokens OAuth 2.0. | P1 |
| **Google Calendar Real API** | Sincronización real vía REST API (`/calendar/v3/calendars/primary/events`) para crear bloques de estudio en el calendario personal del alumno y leer eventos lectivos. | P1 |
| **Google Drive Real API** | Consulta real vía REST API (`/drive/v3/files`) para listar documentos de trabajo (Google Docs, Sheets, Slides, PDFs) con enlaces directos para visualización y trabajo autónomo. | P1 |
| **Configurador de Inferencia IA** | Selector de backend: Modelo Local (Ollama / vLLM / OpenAI standard endpoint) o Cloud (OpenAI / compatible), test de conexión y ajuste socrático. | P1 |
| **Módulo Agenda** | Visualización de eventos, fechas de exámenes y planificación de bloques de estudio con sincronización a Google Calendar. | P1 |
| **Módulo Estudio / Repaso** | Interfaz socrática con IA: plantea pistas y preguntas reflexivas, flashcards de active recall y comprobación de comprensión sin dar respuestas directas. | P1 |
| **Módulo Trabajos** | Gestor de proyectos escolares: desglose en hitos, checklist de autonomía, vinculación de archivos desde Google Drive y revisión crítica de contenidos. | P1 |
| **Internacionalización Completa (i18n)** | Soporte dinámico en Castellano, Català, Galego, Euskera y Valencià con `i18next`. | P1 |
| **Soporte PWA & Offline** | Web App Manifest, Service Worker versionado y notificación de actualización. | P1 |

---

## 2. Historias de Usuario Clave

### HU-01: Acceso a Cuenta Google Real y Modo Demo
- **Como** evaluador o estudiante,
- **Quiero** poder probar la plataforma inmediatamente en "Modo Demo" o vincular mi cuenta real de Google mediante OAuth 2.0 y mi Client ID,
- **Para** experimentar el flujo completo sin barreras o trabajar con mis calendarios y documentos reales de clase.
- **Criterios de Aceptación:**
  - Selector visible en el modal de cuenta: "Modo Demo Activo" vs. "Conectar Cuenta Google Real".
  - En modo real, se inicializa el cliente GIS (`google.accounts.oauth2.initTokenClient`), se obtiene el `access_token` y se recuperan el perfil, eventos de Google Calendar y ficheros de Google Drive reales.
  - En modo demo, se simula con datos realistas garantizando 100% de interactividad sin requerir credenciales externas.

### HU-02: Creación Real de Eventos en Google Calendar
- **Como** estudiante de secundaria,
- **Quiero** que al pulsar "Sincronizar Todo con Calendar" los bloques se creen como eventos en mi Google Calendar real,
- **Para** recibir recordatorios en mi teléfono móvil y reloj inteligente antes de cada sesión de estudio.
- **Criterios de Aceptación:**
  - Llamada HTTP `POST https://www.googleapis.com/calendar/v3/calendars/primary/events` con el resumen, descripción y horas de inicio y fin.
  - Confirmación visual de sincronización exitosa en la tarjeta del bloque.

### HU-03: Vinculación de Archivos Reales de Google Drive en Trabajos
- **Como** estudiante que elabora una monografía,
- **Quiero** explorar y adjuntar mis documentos reales de Google Docs de Drive,
- **Para** organizar mis fuentes y acceder a ellos directamente desde el asistente de tareas.
- **Criterios de Aceptación:**
  - Llamada HTTP `GET https://www.googleapis.com/drive/v3/files` para obtener archivos del usuario.
  - Los archivos adjuntos muestran título real, tipo de archivo y enlace directo para abrirlos.

### HU-04: Diferenciación Curricular y Adaptación por Nivel Cognitivo (1º ESO vs 2º Bachillerato)
- **Como** tribunal de evaluación del Treball de Recerca o educador,
- **Quiero** poder contrastar en la aplicación cómo cambia el nivel de exigencia ante un mismo trabajo escolar de Lengua Castellana (Análisis Sintáctico de la oración *"El tren llegó puntual a la estación"*),
- **Para** demostrar empíricamente la hipótesis del TR sobre el cruce de datos del alumno con los *System Prompts* de los departamentos didácticos.
- **Criterios de Aceptación:**
  - En **Modo Demo (1º de ESO - Marc Vidal, 12 años)**:
    - El complemento verbal solo se identifica en bloque como **Complemento Verbal (CV)** para entender la predicación sin clasificar subtipos.
    - El tutor socrático utiliza lenguaje cercano, oraciones breves y analogías cotidianas (operaciones concretas de Piaget).
  - En **Modo Conectado / 2º de Bachillerato (Álvaro Martín, 17-18 años)**:
    - Se exige la tipificación obligatoria de los complementos verbales (CPred vs CCL) y justificación mediante pruebas sintácticas formales (concordancia con el sujeto).
    - El tutor socrático aplica rigor preuniversitario (PAU) y terminología formal de la RAE (operaciones formales de Piaget).
  - Selector y comparador visual en Trabajos, Estudio y Modal de Cuenta para alternar perfiles en un solo clic durante la presentación.
