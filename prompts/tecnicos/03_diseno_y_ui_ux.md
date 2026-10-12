# 🎨 03. Diseño Visual y UI/UX

Define las directrices estéticas, tokens de diseño y experiencia de usuario para garantizar un aspecto visual premium e interactivo.

---

## 1. Identidad Visual y Estilo
- **Concepto Estético:** (ej. Minimalismo tecnológico, Dark Mode futurista, Glassmorphism elegante, Editorial contemporáneo)
- **Modos:** [ ] Solo Modo Oscuro | [ ] Solo Modo Claro | [ ] Soporte Dual (Claro/Oscuro con toggle)

---

## 2. Paleta de Colores (Tokens)
- **Fondo Principal (`--bg-primary`):** (ej. `#0b0f19` / Deep dark)
- **Fondo Secundario / Cards (`--bg-surface`):** (ej. `#111827` / `#1e293b`)
- **Acento Primario (`--accent-primary`):** (ej. `#6366f1` / Indigo eléctrico)
- **Acento Secundario (`--accent-secondary`):** (ej. `#06b6d4` / Cyan brillante)
- **Texto Principal (`--text-primary`):** (ej. `#f9fafb`)
- **Texto Secundario / Muted (`--text-secondary`):** (ej. `#9ca3af`)
- **Bordes y Divisores (`--border-subtle`):** (ej. `rgba(255, 255, 255, 0.08)`)

---

## 3. Tipografía
- **Titulares (Headings):** (ej. `'Outfit', 'Plus Jakarta Sans', sans-serif`)
- **Cuerpo de Texto (Body):** (ej. `'Inter', -apple-system, BlinkMacSystemFont, sans-serif`)
- **Monoespaciada / Código:** (ej. `'JetBrains Mono', monospace`)

---

## 4. Breakpoints Responsivos
- **Móvil:** `< 640px`
- **Tablet:** `640px - 1024px`
- **Desktop:** `> 1024px`
- **Max Width de Contenedor:** `1200px` / `1280px`

---

## 5. Microinteracciones y Efectos
- **Botones:** Efectos hover suaves (`transform: translateY(-2px)`, transiciones de 200ms, sombras dinámicas).
- **Tarjetas:** Bordes sutiles con iluminación al pasar el cursor o fondos con ligero desenfoque (`backdrop-filter: blur(12px)`).
- **Transiciones:** Suaves y naturales (`cubic-bezier(0.16, 1, 0.3, 1)`).
