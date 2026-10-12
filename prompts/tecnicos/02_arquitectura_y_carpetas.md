# 🏗️ 02. Arquitectura y Estructura de Ficheros - Anaxagoras AI

Estructura modular con **HTML5 + Vanilla TypeScript + TailwindCSS**, persistencia con **Dexie.js (IndexedDB)** y servicios desacoplados.

---

## 1. Organización del Código Fuente (`src/`)

```text
anaxagoras-ia-tr/
├── index.html                   # Punto de entrada HTML5 semántico
├── package.json                 # Gestión de dependencias pnpm
├── tailwind.config.js           # Tokens y temas de TailwindCSS
├── tsconfig.json                # Configuración TypeScript
├── vite.config.ts               # Bundler y servidor dev (puerto 8086)
├── src/
│   ├── main.ts                  # Bootstrap de la app y orquestación de rutas/tabs
│   ├── styles/
│   │   └── index.css            # Directivas Tailwind e importación de Google Fonts
│   │
│   ├── types/                   # Interfaces estrictas antes de implementar
│   │   ├── auth.ts              # Tipos de sesión Google OAuth 2.0
│   │   ├── ai.ts                # Tipos de configuración LLM (Local/Cloud OpenAI API)
│   │   ├── agenda.ts            # Bloques de estudio, eventos, calendarios
│   │   ├── study.ts             # Sesiones socráticas, mensajes, flashcards
│   │   └── task.ts              # Trabajos escolares, fases y entregables Drive
│   │
│   ├── services/                # Capa de integraciones y datos
│   │   ├── storage.ts           # Dexie.js (Base de datos IndexedDB local)
│   │   ├── google-auth.ts       # Flujo OAuth 2.0 y gestión de tokens
│   │   ├── google-calendar.ts   # Integración con Google Calendar API
│   │   ├── google-drive.ts      # Integración con Google Drive API
│   │   └── ai-client.ts         # Inferencia OpenAI-compatible (Local / Cloud) + Socratic Engine
│   │
│   └── components/              # Vistas y componentes modulares en Vanilla TS
│       ├── layout/
│       │   ├── navbar.ts        # Header, branding, estado de auth y config
│       │   └── tabs.ts          # Conmutador de secciones (Agenda, Estudio, Trabajos)
│       ├── modals/
│       │   ├── ai-settings-modal.ts # Modal para configurar modelo LLM y endpoint
│       │   └── auth-modal.ts        # Modal / popup de Google Auth
│       └── views/
│           ├── agenda-view.ts   # Vista de Agenda y calendario
│           ├── study-view.ts    # Vista de Estudio / Tutor Socrático
│           └── tasks-view.ts    # Vista de Trabajos escolares y proyectos
```

---

## 2. Principios de Modularidad
- **Interfaces primero:** Toda entidad de datos (`User`, `StudyBlock`, `ProjectTask`, `AISettings`) se define en `src/types/` antes de su uso.
- **Servicios agnósticos de UI:** `ai-client.ts`, `storage.ts` y los servicios de Google no tocan directamente el DOM; exponen promesas/eventos limpios.
- **Componentes con ciclo de vida simple:** Cada vista expone un método `render(container: HTMLElement)` y listeners de eventos limpios.
- **Seguridad:** Ninguna API key o token sensible se guarda en repositorios públicos. Almacenamiento seguro y temporal en cliente.
