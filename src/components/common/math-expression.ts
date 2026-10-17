/**
 * Micro-componente de renderizado matemático nativo (HTML/CSS)
 * Transforma expresiones matemáticas cotidianas (fracciones verticales, operadores, potencias,
 * notación LaTeX simple y sistemas de ecuaciones) en una representación visual agradable,
 * sin dependencias externas pesadas.
 */

export interface MathFormatOptions {
  badge?: boolean;
  block?: boolean;
  size?: 'xs' | 'sm' | 'base' | 'lg';
  inner?: boolean;
  className?: string;
}

function stripHtml(str: string): string {
  return String(str || '').replace(/<[^>]*>/g, '').trim();
}

/**
 * Renderiza una fracción vertical estilizada (numerador sobre denominador con barra horizontal).
 */
export function renderFraction(num: string, den: string, options?: { size?: string; title?: string }): string {
  const plainTitle = options?.title || `${stripHtml(num)}/${stripHtml(den)}`;
  return (
    `<span class="math-fraction inline-flex flex-col items-center justify-center align-middle mx-1 font-serif text-[0.88em] leading-none select-all transition-transform hover:scale-105" aria-label="${plainTitle}" title="${plainTitle}">` +
    `<span class="math-num border-b-[1.5px] border-current pb-0.5 px-1 font-bold text-center leading-none">${num}</span>` +
    `<span class="math-den pt-0.5 px-1 font-bold text-center leading-none">${den}</span>` +
    `</span>`
  );
}

/**
 * Renderiza un operador aritmético con espaciado equilibrado y tipografía nítida.
 */
export function renderOperator(op: string): string {
  let sym = op;
  if (op === '-' || op === '&minus;') sym = '&minus;';
  else if (op === '*' || op === 'x' || op === '\\times') sym = '&times;';
  else if (op === '/' || op === '\\div') sym = '&divide;';
  else if (op === '!=' || op === '\\ne' || op === '\\neq') sym = '&ne;';
  else if (op === '<=' || op === '\\le' || op === '\\leq') sym = '&le;';
  else if (op === '>=' || op === '\\ge' || op === '\\geq') sym = '&ge;';
  else if (op === '\\approx') sym = '&asymp;';
  else if (op === '\\pm') sym = '&plusmn;';
  else if (op === '\\rightarrow' || op === '->') sym = '&rarr;';

  return `<span class="math-operator mx-1 font-sans font-bold opacity-80 select-none">${sym}</span>`;
}

/**
 * Formatea una expresión puramente matemática (como "3/8 + 7/8 - 2/8 = 8/8 = 1" o sintaxis LaTeX).
 */
export function renderMathExpression(expr: string, options: MathFormatOptions = {}): string {
  let text = String(expr || '').trim();

  // 1. Sistemas de ecuaciones con llaves: \begin{cases} ... \end{cases}
  if (text.includes('\\begin{cases}')) {
    return text.replace(/\\begin\{cases\}([\s\S]*?)\\end\{cases\}/g, (_, inner) => {
      const rows = inner.split('\\\\').map((r: string) => r.trim()).filter(Boolean);
      const rowsHtml = rows.map((r: string) => `<div>${renderMathExpression(r, { inner: true })}</div>`).join('');
      return (
        `<div class="inline-flex items-center gap-2 font-serif my-1 bg-white/60 dark:bg-slate-900/40 p-2.5 rounded-xl border border-brand-200/60 shadow-xs">` +
        `<span class="text-3xl sm:text-4xl font-light text-brand-600 select-none leading-none">{</span>` +
        `<div class="flex flex-col gap-1 text-left text-xs sm:text-sm font-medium text-slate-800">${rowsHtml}</div>` +
        `</div>`
      );
    });
  }

  // 2. Raíz cuadrada: \sqrt{x} o sqrt(x)
  text = text.replace(/\\sqrt\{([^{}]+)\}|sqrt\(([^()]+)\)/g, (_, g1, g2) => {
    return `§SQRT§${g1 || g2}§ENDSQRT§`;
  });

  // 3. Texto plano dentro de LaTeX: \text{...}
  text = text.replace(/\\text\{([^{}]+)\}/g, '§TEXT§$1§ENDTEXT§');

  // 4. Fracciones LaTeX: \frac{num}{den}
  text = text.replace(/\\frac\s*\{([^{}]+)\}\s*\{([^{}]+)\}/g, '§FRAC§$1§OVER§$2§ENDFRAC§');

  // 5. Fracciones simples num/den (evitando fechas como 17/10/2026)
  text = text.replace(/(?<!\d\/)\b(\d+)\/(\d+)\b(?!\/\d)/g, '§FRAC§$1§OVER§$2§ENDFRAC§');

  // 6. Exponentes y subíndices
  text = text.replace(/\^\{([^{}]+)\}|\^([0-9a-zA-Z\+\-]+)/g, (_, g1, g2) => `§SUP§${g1 || g2}§ENDSUP§`);
  text = text.replace(/_\{([^{}]+)\}|_([0-9a-zA-Z\+\-]+)/g, (_, g1, g2) => `§SUB§${g1 || g2}§ENDSUB§`);

  // 7. Reemplazo de operadores con marcadores seguros
  const opMap: Record<string, string> = {
    '\\times': '§OP§\\times§ENDOP§',
    '\\div': '§OP§\\div§ENDOP§',
    '\\neq': '§OP§\\neq§ENDOP§',
    '\\ne': '§OP§\\ne§ENDOP§',
    '\\approx': '§OP§\\approx§ENDOP§',
    '\\leq': '§OP§\\leq§ENDOP§',
    '\\le': '§OP§\\le§ENDOP§',
    '\\geq': '§OP§\\geq§ENDOP§',
    '\\ge': '§OP§\\ge§ENDOP§',
    '\\pm': '§OP§\\pm§ENDOP§',
    '\\rightarrow': '§OP§\\rightarrow§ENDOP§',
    '->': '§OP§->§ENDOP§',
    '!=': '§OP§!=§ENDOP§',
    '<=': '§OP§<=§ENDOP§',
    '>=': '§OP§>=§ENDOP§',
    '+': '§OP§+§ENDOP§',
    '-': '§OP§-§ENDOP§',
    '*': '§OP§*§ENDOP§',
    '=': '§OP§=§ENDOP§',
  };

  const opKeys = Object.keys(opMap).sort((a, b) => b.length - a.length);
  for (const op of opKeys) {
    const escaped = op.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`(^|\\s|[a-zA-Z0-9§])(${escaped})($|\\s|[a-zA-Z0-9§])`, 'g');
    text = text.replace(regex, `$1${opMap[op]}$3`);
  }

  // 8. Sustitución de marcadores por HTML estructurado
  text = text.replace(/§FRAC§(.*?)§OVER§(.*?)§ENDFRAC§/g, (_, num, den) => {
    return renderFraction(num.trim(), den.trim());
  });

  text = text.replace(/§OP§(.*?)§ENDOP§/g, (_, op) => renderOperator(op));

  text = text.replace(/§SQRT§(.*?)§ENDSQRT§/g, (_, val) => {
    return (
      `<span class="inline-flex items-center align-middle mx-1 font-serif">` +
      `<span class="text-[1.15em] font-serif leading-none mr-0.5">&radic;</span>` +
      `<span class="border-t border-current px-1 leading-tight">${val}</span>` +
      `</span>`
    );
  });

  text = text.replace(/§TEXT§(.*?)§ENDTEXT§/g, '<span class="font-sans font-normal mx-1">$1</span>');
  text = text.replace(/§SUP§(.*?)§ENDSUP§/g, '<sup class="text-[0.72em] font-bold px-0.5">$1</sup>');
  text = text.replace(/§SUB§(.*?)§ENDSUB§/g, '<sub class="text-[0.72em] font-semibold px-0.5">$1</sub>');

  if (options.inner) {
    return text;
  }

  if (options.badge) {
    const customCls = options.className || '';
    return `<span class="math-badge inline-flex items-center flex-wrap gap-1 px-3 py-1.5 rounded-2xl bg-brand-50/90 border border-brand-200/90 text-brand-950 font-serif shadow-xs text-xs sm:text-sm ${customCls}">${text}</span>`;
  }

  return `<span class="math-expr inline-flex items-center flex-wrap font-serif align-middle ${options.className || ''}">${text}</span>`;
}

/**
 * Analiza un texto arbitrario (como un mensaje del chat, un enunciado o un párrafo en markdown),
 * protegiendo fechas y detectando fórmulas matemáticas en bloque ($$...$$), fórmulas inline ($...$),
 * secuencias de fracciones ("3/8 + 7/8 - 2/8") o fracciones individuales ("2/3").
 */
export function formatMathInText(text: string, options: MathFormatOptions = {}): string {
  if (!text) return '';

  // 0. Proteger todas las etiquetas HTML existentes (<...>) para que nunca se alteren atributos ni clases como "slate-200/80"
  const htmlTagPlaceholders: Array<{ key: string; tag: string }> = [];
  let processed = text.replace(/<[^>]+>/g, (tag) => {
    const key = `§§HTML_TAG_${htmlTagPlaceholders.length}§§`;
    htmlTagPlaceholders.push({ key, tag });
    return key;
  });

  const placeholders: Array<{ key: string; html: string }> = [];
  function savePlaceholder(html: string): string {
    const key = `§§MATH_TOKEN_${placeholders.length}§§`;
    placeholders.push({ key, html });
    return key;
  }

  // 0.B Proteger decretos legales y referencias oficiales (ej: "Real Decreto 217/2022", "RD 243/2022", "Ley 3/2020")
  const legalRegex = /\b(?:Real\s+Decreto|Decreto|Decret|RD|Ley(?:\s+Orgánica)?|Llei|Orden|Ordre|Resolución|BOE|DOGV|DOGC|núm\.|número)\s+[A-Za-z0-9\.\-\/]*\s*\d+\/\d+/gi;
  processed = processed.replace(legalRegex, (legalMatch) => {
    return savePlaceholder(legalMatch);
  });

  // 0.C Proteger referencias a años de 4 dígitos en denominador (ej: 217/2022, 243/2022, curso 2023/2024)
  const yearPatternRegex = /(?<![a-zA-Z0-9\-\/])\d{1,4}\/(?:19|20)\d{2}(?![a-zA-Z0-9\-\/])/g;
  processed = processed.replace(yearPatternRegex, (yearMatch) => {
    return savePlaceholder(yearMatch);
  });

  // 1. Bloques matemáticos destacados $$ ... $$
  processed = processed.replace(/\$\$([\s\S]*?)\$\$/g, (_, math) => {
    return savePlaceholder(
      `<div class="my-2.5 flex justify-center w-full overflow-x-auto py-1">${renderMathExpression(math, {
        badge: true,
        block: true,
        className: 'shadow-sm border-brand-300'
      })}</div>`
    );
  });

  // 2. Fórmulas inline con delimitador $ ... $
  processed = processed.replace(/\$([^\$\n]+)\$/g, (_, math) => {
    return savePlaceholder(renderMathExpression(math, { badge: false, inner: false }));
  });

  // 3. Secuencias aritméticas de fracciones en texto plano, ej: "3/8 + 7/8 - 2/8"
  // Requiere no estar precedido ni seguido por letras, guiones ni barras (evita fechas y clases CSS)
  const mathSequenceRegex = /(?<![a-zA-Z0-9\-\/])(\d+\/\d+)(\s*[\+\-\*\/=]\s*\d+\/\d+)+(?![a-zA-Z0-9\-\/])/g;
  processed = processed.replace(mathSequenceRegex, (match) => {
    return savePlaceholder(
      options.badge
        ? renderMathExpression(match, { badge: true })
        : renderMathExpression(match, { badge: false })
    );
  });

  // 4. Fracciones aisladas en texto plano como 2/3 o 1/6 (excluyendo fechas 17/10/2026 y denominadores de año)
  const singleFractionRegex = /(?<![a-zA-Z0-9\-\/])(\d+)\/(?!(?:19|20)\d{2}\b)(\d+)(?![a-zA-Z0-9\-\/])/g;
  processed = processed.replace(singleFractionRegex, (_, num, den) => {
    return savePlaceholder(renderFraction(num, den));
  });

  // 5. Restauración segura de todos los tokens matemáticos protegidos
  for (const { key, html } of placeholders) {
    processed = processed.replace(key, html);
  }

  // 6. Restauración segura de las etiquetas HTML originales intactas
  for (const { key, tag } of htmlTagPlaceholders) {
    processed = processed.replace(key, tag);
  }

  return processed;
}

/**
 * Componente visual para mostrar una tarjeta/caja de reto matemático destacado.
 * Especialmente útil para la cabecera de "Cas Actiu".
 */
export function renderMathCard(title: string, expression: string, tag?: string): string {
  return `
    <div class="math-card flex items-center justify-between gap-3 p-3 rounded-2xl bg-gradient-to-r from-brand-50/90 via-indigo-50/70 to-cyan-50/40 border border-brand-200/90 shadow-sm transition-all hover:shadow-md">
      <div class="flex items-center gap-2.5 flex-wrap flex-1">
        <span class="text-xs font-bold uppercase tracking-wider text-brand-700 bg-white px-2.5 py-1 rounded-xl border border-brand-200/80 shadow-2xs flex-shrink-0">
          ${title}
        </span>
        <div class="font-serif text-sm sm:text-base text-slate-900 flex items-center flex-wrap gap-1">
          ${formatMathInText(expression)}
        </div>
      </div>
      ${
        tag
          ? `<span class="text-[11px] font-bold px-2.5 py-1 rounded-xl bg-white text-brand-700 border border-brand-200 shadow-2xs whitespace-nowrap">${tag}</span>`
          : ''
      }
    </div>
  `;
}
