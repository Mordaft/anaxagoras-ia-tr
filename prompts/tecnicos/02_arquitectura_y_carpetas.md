# 🏗️ 02. Arquitectura y Estructura de Ficheros - Anaxagoras AI

Estructura modular con **HTML5 + Vanilla TypeScript + TailwindCSS**, PWA, i18n con **i18next**, persistencia **Dexie.js** y CI/CD para **GitHub Pages**.

---

## 1. Organización del Código Fuente

```text
anaxagoras-ia-tr/
├── public/
│   ├── manifest.webmanifest     # Metadatos PWA (iconos, nombres, theme-color)
│   ├── sw.js                    # Service Worker con caché offline y gestión de versiones
│   └── icons/                   # Iconos para instalación PWA (192x192, 512x512, maskable)
├── index.html                   # Entrada HTML5 semántica y vinculación manifest/PWA
├── package.json                 # Scripts (dev, build, preview) y dependencias
├── vite.config.ts               # Configuración Vite (base relativa para GitHub Pages)
├── tailwind.config.js           # Tokens estéticos de diseño
├── tsconfig.json                # Configuración TypeScript estricta
├── src/
│   ├── main.ts                  # Bootstrap, registro PWA, inicialización i18n
│   ├── vite-env.d.ts            # Tipado Vite y soporte de importación estática markdown (?raw)
│   ├── prompts/                 # 📄 Prompts estáticos del sistema en ficheros Markdown
│   │   ├── agenda_planner.md         # Prompt: Planificador de agenda y estudio espaciado
│   │   ├── socratic_tutor.md         # Prompt: Tutor socrático sin respuestas directas
│   │   ├── project_guide.md          # Prompt: Guía de proyectos y entregas en 4 fases
│   │   └── active_recall_generator.md # Prompt: Generador de tarjetas de Active Recall
│   ├── styles/
│   │   └── index.css            # Tailwind directives, fonts, utilidades glassmorphism
│   ├── locales/                 # Diccionarios de traducción estándar i18n
│   │   ├── es.json              # Castellano (Idioma base)
│   │   ├── ca.json              # Català
│   │   ├── ga.json              # Galego
│   │   ├── eu.json              # Euskera
│   │   └── va.json              # Valencià
│   ├── services/
│   │   ├── i18n.ts              # Instancia i18next y gestor reactivo de idioma
│   │   ├── pwa-service.ts       # Registro de Service Worker y detección de nuevas versiones
│   │   ├── storage.ts           # Base de datos local IndexedDB con Dexie.js
│   │   ├── google-auth.ts       # Google OAuth 2.0
│   │   ├── google-calendar.ts   # Sincronización Google Calendar
│   │   ├── google-drive.ts      # Vinculación archivos Google Drive
│   │   └── ai-client.ts         # Integración LLM (Local Ollama / Cloud OpenAI) + prompts estáticos
│   ├── types/                   # Interfaces de TypeScript
│   └── components/              # Vistas y componentes UI adaptados a i18n
│       ├── layout/              # Navbar y Tabs dinámicos
│       ├── modals/              # Configuración IA, Auth Google, Notificación PWA y Visor de Prompts
│       └── views/               # Agenda, Estudio/Repaso y Trabajos con flujos de IA
```
