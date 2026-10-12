# ⚙️ 01. Stack Tecnológico

Define las tecnologías, dependencias y herramientas para el desarrollo de la aplicación web.

---

## 1. Núcleo Tecnológico
- **Frontend Core:** HTML5 + Vanilla TypeScript
- **Estilos:** TailwindCSS
- **Gestor de Paquetes:** pnpm
- **Runtime / Entorno:** Node.js LTS

---

## 2. Librerías y Dependencias Permitidas
- **Iconografía:** Heroicons
- **Fuentes tipográficas:** Google Fonts
- **Animaciones:** Motion
- **Gestión de Formularios / Estado:** nativo
- **Flujos de utilización de IA:** LangGraph
- **Modelos LLM:** Integración Local y Cloud con API estándar Open AI para inferencia.
- **Calendarios:** Integración con Google Calendar.
- **Archivos:** Integración con Google Drive.
- **Autenticación:** Integración con Google Authentication. Oauth 2.0
---

## 3. Entorno de Ejecución Local
- **Comando de inicio local:** `pnpm run dev`
- **Puerto por defecto:** 8086
- **Requisitos de build:** `pnpm run build`

---

## 4. Restricciones Técnicas
- *Utilizar IndexedDB con librería dexie.js. para almacenamiento de datos locales*
- *Carga incremental de modulos, definir bundles optimizados*
- *No almacenar datos sensibles, credenciales, claves API, etc...*
- *Definir interfaces antes de las implementaciones necesarias*