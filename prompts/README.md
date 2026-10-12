# 🧭 Guía del Sistema de Prompts

Este directorio alberga la base de conocimiento y especificación viva que alimenta a la Inteligencia Artificial en cada ciclo de trabajo.

---

## 📌 Principio de Separación de Responsabilidades

Para obtener los mejores resultados de una IA y evitar alucinaciones o mezclas incoherentes de código y negocio:

| Área | Carpeta | Qué responde |
| :--- | :--- | :--- |
| **Funcional** | `prompts/funcionales/` | **¿QUÉ construimos y PARA QUIÉN?** Negocio, usuarios, flujos, pantallas, textos y propuesta de valor. |
| **Técnico** | `prompts/tecnicos/` | **¿CÓMO lo construimos?** Stack, arquitectura de ficheros, diseño visual, paletas, rendimiento y reglas de código. |
| **Iterativo** | `prompts/iteraciones/` | **¿QUÉ HACEMOS AHORA?** Tareas específicas del sprint/ciclo actual y lecciones aprendidas. |

---

## 🛠️ Cómo interactuar con la IA

Cuando quieras pedirle una nueva funcionalidad o cambio a la IA:
1. **Actualiza la especificación:** Si cambiaste una regla de diseño, edita `03_diseno_y_ui_ux.md`. Si añadiste una sección, edita `02_mapa_del_sitio_y_flujos.md`.
2. **Copia o adapta `plantilla_iteracion.md`:** Especifica el foco de la iteración.
3. **Pide a la IA que lea los archivos relevantes:** La IA utilizará estas fuentes de verdad sin mezclar supuestos.
