# 📖 Bitácora de Iteraciones - Anaxagoras AI

Registro cronológico de los avances, decisiones y construcciones del proyecto.

---

| Iteración | Fecha | Objetivo Principal | Entregables / Archivos | Estado | Observaciones / Próximo paso |
| :---: | :---: | :--- | :--- | :---: | :--- |
| **00** | 12/10/2026 | Configuración del entorno y arquitectura de prompts | Estructura en `prompts/`, git init, README | ✅ Completado | Separación técnica y funcional establecida. |
| **01** | 12/10/2026 | Prototipo base de Anaxagoras AI: Auth Google, Configuración IA y las 3 secciones (Agenda, Estudio, Trabajos) | Scaffold Vite + Vanilla TS + Tailwind, Dexie DB, vistas modulares, servicios base | 🚀 En curso | Construcción de la interfaz interactiva y servicios. |

---

## Detalle de Ciclos

### Iteración 00: Configuración Inicial del Entorno
- **Resumen:** Se creó la estructura base del repositorio, se inicializó git y se estructuraron las carpetas de prompts separando claramente los aspectos funcionales de los técnicos.

### Iteración 01: Prototipo Base de Anaxagoras AI
- **Objetivo:** Definir e implementar el diseño base adaptado a la estética moderna de la nueva generación con:
  1. Header global con simulación/flujo Google OAuth 2.0 y selector multi-idioma (ES, CA, GA, EU, VA).
  2. Modal de configuración de inferencia IA (Local Ollama / Cloud OpenAI standard endpoint).
  3. Navegación por pestañas entre las 3 secciones principales:
     - **Agenda:** Gestión de tiempo, bloques de estudio y sincronización a Google Calendar.
     - **Estudio / Repaso:** Tutor socrático interactivo que guía sin dar respuestas directas, promoviendo el aprendizaje autónomo.
     - **Trabajos:** Estructurador de proyectos escolares en 4 fases, vinculación de recursos Google Drive y aseguramiento de esfuerzo propio.
  4. Persistencia local con Dexie.js (IndexedDB).
  5. Servidor dev configurado en puerto 8086 con pnpm.
