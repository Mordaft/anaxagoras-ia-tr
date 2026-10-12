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
│   │   └── ai-client.ts         # Inferencia OpenAI estándar (Local/Cloud) + Motor socrático
│   ├── types/                   # Interfaces de TypeScript
│   └── components/              # Vistas y componentes UI adaptados a i18n
│       ├── layout/              # Navbar y Tabs dinámicos
│       ├── modals/              # Configuración IA, Auth Google y Notificación PWA
│       └── views/               # Agenda, Estudio/Repaso y Trabajos
```
