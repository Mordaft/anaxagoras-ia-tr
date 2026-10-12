# 🏗️ 02. Arquitectura y Estructura de Ficheros

Define la organización de carpetas, separación de capas y modularidad del código fuente.

---

## 1. Árbol de Directorios Previsto (Propuesta)

```text
src/ (o raíz si es proyecto vanilla)
├── assets/             # Imágenes, iconos vectoriales, fuentes, logos
│   ├── images/
│   └── icons/
├── css/ (o styles/)    # Archivos de estilos modulares
│   ├── variables.css   # Tokens de diseño (colores, espaciado, tipografías)
│   ├── base.css        # Reset, tipografía y estilos globales
│   ├── components/     # Estilos aislados por componente (nav, hero, cards, footer)
│   └── main.css        # Importador principal de estilos
├── js/ (o scripts/)    # Lógica de cliente y scripts interactivos
│   ├── main.js         # Inicialización principal
│   └── modules/        # Módulos específicos (tema, navegación móvil, animaciones)
└── index.html          # Punto de entrada principal
```

---

## 2. Principios de Modularidad
- **Componentización:** Cada componente (navbar, hero, card, footer) debe tener su estructura y estilos claros y desacoplados.
- **Nomenclatura de archivos:** `kebab-case` para nombres de ficheros y assets (ej: `mobile-menu.js`, `feature-card.css`).
- **Separación de responsabilidades:** No incrustar CSS ni JavaScript masivo dentro de los ficheros HTML a menos que sea un script crítico de precarga.

---

## 3. Manejo de Assets y Multimedia
- Formatos preferidos: WebP / SVG para gráficos e iconos vectoriales.
- Nombres descriptivos para imágenes (`hero-background.webp`, `product-preview.png`).
