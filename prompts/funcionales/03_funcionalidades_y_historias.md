# 📋 03. Funcionalidades e Historias de Usuario - Anaxagoras AI

Requisitos funcionales centrados en la autonomía del estudiante, crecimiento cognitivo y conectividad.

---

## 1. Módulos y Funcionalidades Requeridas (Iteración 01)

| Módulo / Componente | Descripción funcional | Prioridad |
| :--- | :--- | :---: |
| **Autenticación Google OAuth 2.0** | Conexión segura con la cuenta de Google del usuario para obtener identidad y permisos de Calendar y Drive. | P1 |
| **Configurador de Inferencia IA** | Selector de backend: Modelo Local (Ollama / vLLM / OpenAI standard endpoint) o Cloud (OpenAI / compatible), test de conexión y selección de modelo. | P1 |
| **Módulo Agenda** | Visualización de eventos, fechas de exámenes y planificación de bloques de estudio con sincronización a Google Calendar. | P1 |
| **Módulo Estudio / Repaso** | Interfaz socrática con IA: plantea pistas y preguntas reflexivas, flashcards de active recall y comprobación de comprensión sin dar respuestas directas. | P1 |
| **Módulo Trabajos** | Gestor de proyectos escolares: desglose en hitos, checklist de autonomía, vinculación de archivos desde Google Drive y revisión crítica de contenidos. | P1 |
| **Persistencia Local (Dexie.js / IndexedDB)** | Almacenamiento seguro en el navegador para sesiones, notas, tareas locales y configuraciones sin comprometer credenciales. | P1 |
| **Selector Multi-idioma** | Alternancia fluida entre Castellano, Catalán, Gallego, Euskera y Valenciano. | P2 |

---

## 2. Historias de Usuario Clave

### HU-01: Control Ético y Pedagógico de la IA
- **Como** educador o padre,
- **Quiero** que el tutor de IA nunca dé la respuesta masticada al estudiante cuando este le pregunte dudas de deberes o exámenes,
- **Para** asegurar que el alumno desarrolle pensamiento crítico, autonomía y aprendizaje significativo.
- **Criterios de Aceptación:**
  - El sistema detecta peticiones directas (ej. *"dame la solución al problema 4"*) y responde guiando con pistas socráticas o preguntas intermedias.

### HU-02: Gestión del Tiempo en la Agenda
- **Como** estudiante de secundaria o bachillerato,
- **Quiero** programar mis sesiones de estudio en base a la proximidad de mis exámenes y exportarlas a mi Google Calendar,
- **Para** distribuir mi tiempo sin agobios y no dejar todo para el último día.
- **Criterios de Aceptación:**
  - Puede crear un bloque de estudio con asignatura, objetivo y duración (ej. 45 min).
  - Puede sincronizar el bloque con su cuenta de Google conectada.

### HU-03: Desarrollo Guiado de Trabajos Escolares
- **Como** estudiante,
- **Quiero** estructurar mi trabajo por fases y enlazar mis documentos de Google Drive,
- **Para** avanzar de forma ordenada y recibir feedback sobre la coherencia y fuentes sin que la IA escriba el trabajo por mí.
- **Criterios de Aceptación:**
  - El trabajo se divide en: Planificación, Investigación, Redacción propia y Revisión.
  - El alumno puede adjuntar el enlace o ID de su archivo de Google Drive.

### HU-04: Flexibilidad de Modelos de IA (Local y Cloud)
- **Como** usuario preocupado por la privacidad de los menores,
- **Quiero** poder conectar un modelo local (ej. Ollama con Llama 3 o Gemma) o usar mi propia clave de inferencia OpenAI,
- **Para** tener soberanía sobre mis datos sin depender de servicios de terceros cerrados.
- **Criterios de Aceptación:**
  - Modal accesible con campos: URL del Endpoint (default `http://localhost:11434/v1`), API Key (opcional para local), y Nombre del Modelo.
  - Indicador de estado de conexión (conectado/desconectado).
