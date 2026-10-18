# 🏛️ Nivel 2.A: Línea Base Temática — Cálculo Diferencial: Derivadas, Recta Tangente y Optimización (PAU)
*Centro Educativo / Departamento de Matemáticas — 2º de Bachillerato*
*Materia: Matemáticas II*
*Unidad Didáctica: Análisis Matemático, Cálculo Diferencial y Aplicaciones de la Derivada (Pruebas PAU)*

---

## 📚 Marco Teórico y Línea Base Curricular
Dominio analítico y conceptual del cálculo diferencial de funciones de una variable real y sus aplicaciones geométricas y de optimización según las directrices y criterios de corrección de las pruebas PAU.

### Herramientas y Teoremas Fundamentales:
1. **Concepto e Interpretación Geométrica de la Derivada:**
   - La derivada de una función en un punto, $f'(x_0)$, representa el límite del cociente incremental y coincide con la pendiente de la recta tangente a la curva en $(x_0, f(x_0))$:
     $$m = f'(x_0) = \lim_{h \to 0} \frac{f(x_0 + h) - f(x_0)}{h}$$
   - **Ecuación de la Recta Tangente:** $y - f(x_0) = f'(x_0)(x - x_0)$
   - **Ecuación de la Recta Normal:** $y - f(x_0) = -\frac{1}{f'(x_0)}(x - x_0)$ (con $f'(x_0) \neq 0$).

2. **Reglas de Derivación y Regla de la Cadena:**
   - Derivación sistemática de funciones algebraicas, exponenciales, logarítmicas y trigonométricas compuestas: $(g \circ f)'(x) = g'(f(x)) \cdot f'(x)$.

3. **Monotonía y Extremos Relativos (Criterios de Derivabilidad):**
   - **Puntos Críticos:** Valores donde $f'(x) = 0$ o no existe la derivada.
   - **Monotonía:** Si $f'(x) > 0$ en un intervalo, la función es estrictamente creciente; si $f'(x) < 0$, es estrictamente decreciente.
   - **Clasificación por la Segunda Derivada:**
     - Si $f'(x_0) = 0$ y $f''(x_0) < 0 \implies$ Máximo relativo en $x_0$.
     - Si $f'(x_0) = 0$ y $f''(x_0) > 0 \implies$ Mínimo relativo en $x_0$.

4. **Curvatura y Puntos de Inflexión:**
   - $f''(x) > 0 \implies$ Convexa (hacia arriba); $f''(x) < 0 \implies$ Cóncava (hacia abajo).
   - Punto de inflexión en $x_0$ si $f''(x_0) = 0$ (o no existe) y $f''$ cambia de signo en su entorno.

5. **Problemas de Optimización y Modelización:**
   - Planteamiento formal de la función objetivo a optimizar y de las condiciones de ligadura o restricción.
   - Determinación del dominio admisible del parámetro y comprobación obligatoria de los extremos absolutos en intervalos cerrados o mediante el signo de la derivada.

6. **Teoremas Clásicos del Análisis:**
   - Teorema de Rolle y Teorema del Valor Medio de Lagrange (hipótesis de continuidad en $[a,b]$ y derivabilidad en $(a,b)$).

### Metodología Departamental:
- Justificación analítica explícita antes de operar: indicar el dominio, continuidad y derivabilidad de la función en los intervalos considerados.
- En problemas de optimización: definir formalmente la función a optimizar y justificar si el extremo hallado es máximo o mínimo mediante la segunda derivada o el estudio de signos de la primera derivada.
