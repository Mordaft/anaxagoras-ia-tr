# 🗺️ 02. Mapa del Sitio y Flujos de Usuario - Anaxagoras AI

Estructura de la aplicación SPA (Single Page Application) para estudiantes y flujos de interacción clave.

---

## 1. Arquitectura de Navegación y Pantallas

```text
[Header Superior Global]
├── Logo & Identidad: Anaxagoras AI (badge de nivel/curso)
├── Selector de Idioma (Castellano, Català, Galego, Euskera, Valencià)
├── Configuración de Modelo IA (Botón modal: Local Ollama / Cloud OpenAI)
└── Conexión Google Account (Avatar de usuario / Botón "Conectar con Google")

[Barra de Navegación Principal (Tabs)]
├── 📅 1. Agenda (Planificación del tiempo y Google Calendar)
├── 💡 2. Estudio / Repaso (Tutor Socrático y consolidación activa)
└── 📝 3. Trabajos (Guía de entregables, Google Drive y esfuerzo autónomo)

[Contenedor de Vistas Principales]
├── VISTA 1: AGENDA
│   ├── Calendario semanal / visualizador de bloques de estudio
│   ├── Próximos exámenes y entregas sincronizadas
│   └── Creador rápido de sesiones de estudio ("Técnica Pomodoro / Bloques guiados")
│
├── VISTA 2: ESTUDIO / REPASO
│   ├── Selector de Asignatura y Tema
│   ├── Modo Tutor Socrático (Chat interactivo que hace preguntas de orientación)
│   ├── Tarjetas de Autoevaluación / Desafío de memoria activa (Active Recall)
│   └── Medidor de asimilación conceptual (sin respuestas fáciles)
│
└── VISTA 3: TRABAJOS Y PROYECTOS
    ├── Lista de trabajos activos y rúbrica de entrega
    ├── Asistente paso a paso (1. Lluvia de ideas -> 2. Estructura -> 3. Redacción -> 4. Revisión)
    ├── Integración con documentos de Google Drive
    └── "Detector de autonomía": Verificación de que el estudiante redacta con sus propias palabras
```

---

## 2. Recorridos de Usuario Principales (User Journeys)

### Flujo 1: Configuración Inicial y Conexión
1. El estudiante abre Anaxagoras AI.
2. Hace clic en **Conectar con Google** para autorizar lectura de calendario y carpetas de trabajos (Google OAuth 2.0).
3. Accede al modal de **Configuración IA** para definir si usará un modelo local (ej. `http://localhost:11434/v1` de Ollama) o una clave de API OpenAI estándar (guardada de forma segura en memoria o sesión local).
4. Elige su idioma preferido de interfaz.

### Flujo 2: Organización en la Agenda
1. El estudiante consulta las entregas y exámenes de la semana.
2. Pulsa en "Planificar sesión de estudio" para Matemáticas o Historia.
3. El sistema añade el bloque sugerido y permite sincronizarlo directamente con Google Calendar.

### Flujo 3: Estudio / Repaso con Tutor Socrático
1. El estudiante indica: *"No entiendo cómo resolver una ecuación de segundo grado"* o *"Quiero repasar la fotosíntesis"*.
2. El Tutor Socrático no resuelve la tarea: responde con una pregunta de diagnóstico: *"¿Qué información nos da el problema y qué fórmula recuerdas que relacione esas variables?"*.
3. El estudiante responde y la IA lo guía gradualmente hasta que él mismo llega a la solución.

### Flujo 4: Preparación de Trabajos y Entregables
1. El alumno crea un nuevo trabajo: *"Monografía sobre Energías Renovables"*.
2. Conecta un documento de Google Drive o un borrador.
3. La herramienta desglosa el trabajo en 4 fases autónomas, asegurando que el estudiante investigue, elabore esquemas y redacte sin que la IA genere el texto final por él.
