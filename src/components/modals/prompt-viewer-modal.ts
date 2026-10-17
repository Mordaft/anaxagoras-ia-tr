import type { AssembledPrompt, AssembledAgendaPrompt } from '../../types/prompts';
import { formatMathInText } from '../common/math-expression';
import { t } from '../../services/i18n';

export interface PromptViewerModalOptions {
  subtitle?: string;
  badge?: { text: string; colorClass?: string };
  institution?: string;
  sourceApi?: string;
  gradeLevel?: string;
  assembledPrompt?: AssembledPrompt;
  assembledAgendaPrompt?: AssembledAgendaPrompt;
  onClose: () => void;
}

interface PromptSectionItem {
  id: string;
  isConsolidated: boolean;
  icon: string;
  levelBadge: string;
  badgeClass: string;
  title: string;
  subtitle: string;
  source?: string;
  rawContent: string;
  formattedHtml: string;
  isOpen: boolean;
  accentColor: string;
  nodeRingClass: string;
  nodeBgClass: string;
  nodeBorderClass: string;
}

function formatMarkdown(content: string, enableMath = true): string {
  const formatted = content
    .replace(/^# (.*$)/gim, '<h2 class="text-xl font-bold text-slate-900 mt-4 mb-2 pb-1 border-b border-slate-200/80">$1</h2>')
    .replace(/^## (.*$)/gim, '<h3 class="text-base font-bold text-slate-800 mt-3 mb-1.5">$1</h3>')
    .replace(/^### (.*$)/gim, '<h4 class="text-sm font-bold text-slate-800 mt-2 mb-1 text-brand-700">$1</h4>')
    .replace(/\*\*(.*?)\*\*/gim, '<strong class="font-bold text-slate-900">$1</strong>')
    .replace(/\*(.*?)\*/gim, '<em class="italic text-slate-700">$1</em>')
    .replace(/```json([\s\S]*?)```/gim, '<pre class="p-3 my-2 bg-slate-900 text-emerald-400 rounded-xl text-xs font-mono overflow-x-auto">$1</pre>')
    .replace(/```([\s\S]*?)```/gim, '<pre class="p-3 my-2 bg-slate-900 text-slate-100 rounded-xl text-xs font-mono overflow-x-auto">$1</pre>')
    .replace(/^\- (.*$)/gim, '<li class="ml-4 list-disc text-xs text-slate-700 mb-1">$1</li>')
    .replace(/^\d+\. (.*$)/gim, '<li class="ml-4 list-decimal text-xs text-slate-700 mb-1">$1</li>')
    .replace(/\n\n/gim, '<br/><br/>');
  return enableMath ? formatMathInText(formatted) : formatted;
}

function formatConsolidatedContent(rawText: string, isRegulatoryOnly: boolean): string {
  if (isRegulatoryOnly) {
    return formatMarkdown(rawText, false);
  }
  if (rawText.includes('=== [MARCO REGULADOR Y DEONTOLÓGICO - NIVEL 3] ===')) {
    // Proteger la sección N3 de matemáticas (evitar que decretos como 217/2022 se interpreten como fracciones)
    const parts = rawText.split(/(=== \[MARCO REGULADOR Y DEONTOLÓGICO - NIVEL 3\] ===[\s\S]*?==================================================)/);
    return parts
      .map(part => {
        if (part.startsWith('=== [MARCO REGULADOR Y DEONTOLÓGICO - NIVEL 3] ===')) {
          return formatMarkdown(part, false);
        }
        return formatMarkdown(part, true);
      })
      .join('');
  }
  return formatMarkdown(rawText, true);
}

export function renderPromptViewerModal(
  container: HTMLElement, 
  title: string, 
  markdownContent: string, 
  options: PromptViewerModalOptions | { onClose: () => void }
): void {
  const opts = options as PromptViewerModalOptions;
  const assembled = opts.assembledPrompt;
  const assembledAgenda = opts.assembledAgendaPrompt;

  let isGraphExpanded = true;
  const sections: PromptSectionItem[] = [];

  // 1. Caso Grafo Multicapa Socrático / Proyectos / Recall
  if (assembled) {
    // A. Ensamblado Consolidado
    sections.push({
      id: 'consolidated',
      isConsolidated: true,
      icon: '🔀',
      levelBadge: t('promptModal.tabs.all'),
      badgeClass: 'bg-slate-900 text-white border-slate-700',
      title: t('promptModal.titleAssembled', { subject: assembled.subject }),
      subtitle: t('promptModal.subtitleAssembled', { topic: assembled.topicName }),
      source: 'Pipeline de Memoria en Ejecución (Orquestador Dinámico)',
      rawContent: assembled.systemInstruction,
      formattedHtml: formatConsolidatedContent(assembled.systemInstruction, false),
      isOpen: true,
      accentColor: '#3b82f6',
      nodeRingClass: 'focus:ring-brand-500 border-slate-700 hover:border-brand-400',
      nodeBgClass: 'bg-gradient-to-br from-slate-900 to-slate-800 text-white',
      nodeBorderClass: 'border-slate-700'
    });

    // B. N1: Metodología Pedagógica
    const l1 = assembled.layers.level1Functional;
    sections.push({
      id: 'level1',
      isConsolidated: false,
      icon: '🧠',
      levelBadge: l1.badge || t('promptModal.tabs.level1'),
      badgeClass: 'bg-brand-50 text-brand-700 border-brand-200',
      title: l1.title,
      subtitle: l1.subtitle,
      source: l1.source,
      rawContent: l1.content,
      formattedHtml: formatMarkdown(l1.content, true),
      isOpen: false,
      accentColor: '#6366f1',
      nodeRingClass: 'focus:ring-brand-500 border-brand-200 hover:border-brand-400 hover:bg-brand-50/70',
      nodeBgClass: 'bg-white text-slate-800',
      nodeBorderClass: 'border-brand-200'
    });

    // C. N3: Marco Regulador y Ético
    const l3 = assembled.layers.level3Regulatory;
    sections.push({
      id: 'level3',
      isConsolidated: false,
      icon: '⚖️',
      levelBadge: l3.badge || t('promptModal.tabs.level3'),
      badgeClass: 'bg-amber-50 text-amber-700 border-amber-200',
      title: l3.title,
      subtitle: l3.subtitle,
      source: l3.source,
      rawContent: l3.content,
      formattedHtml: formatMarkdown(l3.content, false), // N3 sin matemáticas
      isOpen: false,
      accentColor: '#f59e0b',
      nodeRingClass: 'focus:ring-amber-500 border-amber-200 hover:border-amber-400 hover:bg-amber-50/70',
      nodeBgClass: 'bg-white text-slate-800',
      nodeBorderClass: 'border-amber-200'
    });

    // D. N2.A: Base Temática Curricular
    const l2A = assembled.layers.level2BaseTopic;
    sections.push({
      id: 'level2A',
      isConsolidated: false,
      icon: '🏛️',
      levelBadge: l2A.badge || t('promptModal.tabs.level2A'),
      badgeClass: 'bg-purple-50 text-purple-700 border-purple-200',
      title: l2A.title,
      subtitle: l2A.subtitle,
      source: l2A.source,
      rawContent: l2A.content,
      formattedHtml: formatMarkdown(l2A.content, true),
      isOpen: false,
      accentColor: '#a855f7',
      nodeRingClass: 'focus:ring-purple-500 border-purple-200 hover:border-purple-400 hover:bg-purple-50/70',
      nodeBgClass: 'bg-white text-slate-800',
      nodeBorderClass: 'border-purple-200'
    });

    // E. N2.B: Actividad Específica y Variación (si existe)
    if (assembled.layers.level2SpecificActivity) {
      const l2B = assembled.layers.level2SpecificActivity;
      sections.push({
        id: 'level2B',
        isConsolidated: false,
        icon: '🎯',
        levelBadge: l2B.badge || t('promptModal.tabs.level2B'),
        badgeClass: 'bg-emerald-50 text-emerald-700 border-emerald-200',
        title: l2B.title,
        subtitle: l2B.subtitle,
        source: l2B.source,
        rawContent: l2B.content,
        formattedHtml: formatMarkdown(l2B.content, true),
        isOpen: false,
        accentColor: '#10b981',
        nodeRingClass: 'focus:ring-emerald-500 border-emerald-200 hover:border-emerald-400 hover:bg-emerald-50/70',
        nodeBgClass: 'bg-white text-slate-800',
        nodeBorderClass: 'border-emerald-200'
      });
    }
  } 
  // 2. Caso Arquitectura Propia de Agenda
  else if (assembledAgenda) {
    sections.push({
      id: 'agenda_consolidated',
      isConsolidated: true,
      icon: '🔀',
      levelBadge: 'Consolidado Agenda',
      badgeClass: 'bg-slate-900 text-white border-slate-700',
      title: assembledAgenda.title,
      subtitle: assembledAgenda.subtitle,
      source: 'Consolidación Multivariable de Agenda Escolar',
      rawContent: assembledAgenda.systemInstruction,
      formattedHtml: formatMarkdown(assembledAgenda.systemInstruction, false),
      isOpen: true,
      accentColor: '#06b6d4',
      nodeRingClass: 'focus:ring-cyan-500 border-slate-700 hover:border-cyan-400',
      nodeBgClass: 'bg-gradient-to-br from-slate-900 to-slate-800 text-white',
      nodeBorderClass: 'border-slate-700'
    });

    const pTime = assembledAgenda.pillars.timeDistribution;
    sections.push({
      id: 'agenda_time',
      isConsolidated: false,
      icon: '⏱️',
      levelBadge: pTime.badge,
      badgeClass: 'bg-cyan-50 text-cyan-700 border-cyan-200',
      title: pTime.title,
      subtitle: pTime.subtitle,
      source: pTime.source,
      rawContent: pTime.content,
      formattedHtml: formatMarkdown(pTime.content, false),
      isOpen: false,
      accentColor: '#06b6d4',
      nodeRingClass: 'focus:ring-cyan-500 border-cyan-200 hover:border-cyan-400 hover:bg-cyan-50/70',
      nodeBgClass: 'bg-white text-slate-800',
      nodeBorderClass: 'border-cyan-200'
    });

    const pPriority = assembledAgenda.pillars.priorityOrder;
    sections.push({
      id: 'agenda_priority',
      isConsolidated: false,
      icon: '🎯',
      levelBadge: pPriority.badge,
      badgeClass: 'bg-amber-50 text-amber-700 border-amber-200',
      title: pPriority.title,
      subtitle: pPriority.subtitle,
      source: pPriority.source,
      rawContent: pPriority.content,
      formattedHtml: formatMarkdown(pPriority.content, false),
      isOpen: false,
      accentColor: '#f59e0b',
      nodeRingClass: 'focus:ring-amber-500 border-amber-200 hover:border-amber-400 hover:bg-amber-50/70',
      nodeBgClass: 'bg-white text-slate-800',
      nodeBorderClass: 'border-amber-200'
    });

    const pDeadlines = assembledAgenda.pillars.commitmentDeadlines;
    sections.push({
      id: 'agenda_deadlines',
      isConsolidated: false,
      icon: '📅',
      levelBadge: pDeadlines.badge,
      badgeClass: 'bg-purple-50 text-purple-700 border-purple-200',
      title: pDeadlines.title,
      subtitle: pDeadlines.subtitle,
      source: pDeadlines.source,
      rawContent: pDeadlines.content,
      formattedHtml: formatMarkdown(pDeadlines.content, false),
      isOpen: false,
      accentColor: '#a855f7',
      nodeRingClass: 'focus:ring-purple-500 border-purple-200 hover:border-purple-400 hover:bg-purple-50/70',
      nodeBgClass: 'bg-white text-slate-800',
      nodeBorderClass: 'border-purple-200'
    });

    const pAdaptive = assembledAgenda.pillars.adaptiveFlexibility;
    sections.push({
      id: 'agenda_adaptive',
      isConsolidated: false,
      icon: '🔄',
      levelBadge: pAdaptive.badge,
      badgeClass: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      title: pAdaptive.title,
      subtitle: pAdaptive.subtitle,
      source: pAdaptive.source,
      rawContent: pAdaptive.content,
      formattedHtml: formatMarkdown(pAdaptive.content, false),
      isOpen: false,
      accentColor: '#10b981',
      nodeRingClass: 'focus:ring-emerald-500 border-emerald-200 hover:border-emerald-400 hover:bg-emerald-50/70',
      nodeBgClass: 'bg-white text-slate-800',
      nodeBorderClass: 'border-emerald-200'
    });
  } 
  // 3. Caso Documento Directiva Standalone
  else {
    const isStandaloneN3 = title.includes('Nivel 3') || title.includes('Regulador') || (opts.subtitle || '').includes('Regulador');
    sections.push({
      id: 'standalone',
      isConsolidated: true,
      icon: opts.institution ? '🏛️' : '📄',
      levelBadge: opts.badge?.text || t('promptModal.badgePrompt'),
      badgeClass: 'bg-brand-50 text-brand-700 border-brand-200',
      title: title,
      subtitle: opts.subtitle || t('promptModal.defaultSubtitle'),
      source: opts.sourceApi || opts.institution,
      rawContent: markdownContent,
      formattedHtml: formatMarkdown(markdownContent, !isStandaloneN3),
      isOpen: true,
      accentColor: '#6366f1',
      nodeRingClass: 'focus:ring-brand-500 border-slate-700',
      nodeBgClass: 'bg-slate-900 text-white',
      nodeBorderClass: 'border-slate-700'
    });
  }

  const consolidatedSection = sections.find(s => s.isConsolidated);
  const inputSections = sections.filter(s => !s.isConsolidated);
  const hasGraph = inputSections.length > 0;

  function renderHTML(): string {
    const mainTitle = assembled 
      ? t('promptModal.titleAssembled', { subject: assembled.subject }) 
      : (assembledAgenda ? assembledAgenda.title : title);
    const mainSubtitle = assembled 
      ? t('promptModal.subtitleAssembled', { topic: assembled.topicName }) 
      : (opts.subtitle || t('promptModal.defaultSubtitle'));
    const mainBadge = assembled 
      ? t('promptModal.badge4Layers') 
      : (assembledAgenda ? 'Estructura Propia de Agenda' : (opts.badge?.text || t('promptModal.badgePrompt')));

    return `
      <div id="prompt-modal-backdrop" class="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5">
        <div class="relative bg-white rounded-3xl shadow-2xl max-w-4xl w-full p-4 sm:p-6 border border-slate-100 max-h-[92vh] flex flex-col transition-all">
          
          <!-- Header Modal -->
          <div class="flex items-center justify-between pb-3.5 border-b border-slate-100 flex-shrink-0">
            <div class="flex items-center gap-3">
              <div class="w-11 h-11 rounded-2xl bg-gradient-to-tr from-brand-600 to-accent-cyan text-white flex items-center justify-center text-xl shadow-md shadow-brand-500/20">
                ${assembledAgenda ? '⏱️' : (assembled ? '🧩' : (opts.institution ? '🏛️' : '📄'))}
              </div>
              <div>
                <div class="flex items-center gap-2 flex-wrap">
                  <h3 class="font-display font-bold text-base sm:text-lg text-slate-900">${mainTitle}</h3>
                  <span class="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-brand-50 text-brand-700 border border-brand-200">
                    ${mainBadge}
                  </span>
                </div>
                <p class="text-xs text-slate-500">${mainSubtitle}</p>
              </div>
            </div>

            <div class="flex items-center gap-2">
              ${
                hasGraph
                  ? `
                <button id="btn-toggle-graph" class="px-3 py-1.5 rounded-xl text-xs font-bold border transition-all flex items-center gap-1.5 ${
                  isGraphExpanded 
                    ? 'bg-brand-50 text-brand-700 border-brand-200 hover:bg-brand-100' 
                    : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'
                }" title="${isGraphExpanded ? t('promptModal.graphToggleHide') : t('promptModal.graphToggleShow')}">
                  <span>📐</span>
                  <span class="hidden sm:inline">${isGraphExpanded ? t('promptModal.graphToggleHide') : t('promptModal.graphToggleShow')}</span>
                </button>
              `
                  : ''
              }
              <button id="btn-close-prompt-modal" class="text-slate-400 hover:text-slate-600 p-2 rounded-xl hover:bg-slate-100 transition-colors" title="${t('promptModal.close')}">
                ✕
              </button>
            </div>
          </div>

          <!-- Scrollable Body -->
          <div class="flex-1 overflow-y-auto pr-1 sm:pr-2 space-y-4 py-3 custom-scrollbar">

            ${
              hasGraph
                ? `
              <!-- Seccion Grafo Visual SVG / HTML -->
              <div id="graph-panel-wrapper" class="bg-gradient-to-b from-slate-50/90 to-white rounded-2xl border border-slate-200/90 p-3.5 sm:p-5 transition-all shadow-xs ${
                isGraphExpanded ? 'block' : 'hidden'
              }">
                <div class="flex items-center justify-between pb-3 border-b border-slate-200/60 mb-3">
                  <div class="flex items-center gap-2">
                    <span class="w-6 h-6 rounded-lg bg-brand-100 text-brand-700 flex items-center justify-center text-xs font-bold">📐</span>
                    <div>
                      <h4 class="text-xs font-bold text-slate-900">${t('promptModal.graphTitle')}</h4>
                      <p class="text-[11px] text-slate-500">${t('promptModal.graphSubtitle')}</p>
                    </div>
                  </div>
                  <span class="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
                    ${inputSections.length} Capas ➔ 1 Ensamblado
                  </span>
                </div>

                <div class="text-[11px] text-slate-500 mb-3 flex items-center gap-1.5 italic">
                  <span>💡</span>
                  <span>${t('promptModal.clickToInspect')}</span>
                </div>

                <!-- Canvas del Grafo -->
                <div id="prompt-graph-canvas" class="relative rounded-xl p-3 sm:p-4 bg-slate-900/[0.02] border border-slate-200/60 overflow-hidden">
                  
                  <!-- Conectores SVG Dinámicos -->
                  <svg id="prompt-graph-svg" class="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-visible" xmlns="http://www.w3.org/2000/svg">
                  </svg>

                  <div class="relative z-10 grid grid-cols-1 sm:grid-cols-12 gap-3 sm:gap-6 items-center">
                    
                    <!-- Columna Izquierda: Nodos de Entrada Discretos -->
                    <div class="sm:col-span-6 flex flex-col gap-2.5">
                      ${inputSections.map(sec => `
                        <div 
                          data-node-id="${sec.id}"
                          data-node-color="${sec.accentColor}"
                          class="graph-input-node p-2.5 sm:p-3 rounded-xl border ${sec.nodeBorderClass} bg-white shadow-xs hover:shadow-md cursor-pointer transition-all duration-200 flex items-center justify-between group hover:scale-[1.01]"
                          title="Clic para ver detalles de ${sec.levelBadge}"
                        >
                          <div class="flex items-center gap-2.5 min-w-0">
                            <span class="text-lg p-1.5 rounded-lg bg-slate-50 border border-slate-100 group-hover:bg-slate-100 transition-colors">
                              ${sec.icon}
                            </span>
                            <div class="min-w-0">
                              <div class="flex items-center gap-1.5">
                                <span class="text-xs font-bold text-slate-800 truncate">${sec.title}</span>
                              </div>
                              <span class="text-[10px] font-medium text-slate-500 truncate block">${sec.subtitle}</span>
                            </div>
                          </div>
                          <span class="px-2 py-0.5 rounded-md text-[9px] font-bold ${sec.badgeClass} flex-shrink-0 ml-2">
                            ${sec.levelBadge}
                          </span>
                        </div>
                      `).join('')}
                    </div>

                    <!-- Columna Derecha: Nodo de Ensamblado Consolidado -->
                    <div class="sm:col-span-6 flex flex-col justify-center items-center">
                      ${
                        consolidatedSection
                          ? `
                        <div 
                          id="node-consolidated"
                          data-node-id="${consolidatedSection.id}"
                          data-node-color="${consolidatedSection.accentColor}"
                          class="w-full p-4 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 text-white shadow-lg shadow-slate-900/10 border border-slate-700/80 cursor-pointer hover:border-brand-400 hover:shadow-brand-500/20 transition-all duration-200 group hover:scale-[1.01]"
                          title="Clic para ver el Ensamblado Completo en el acordeón"
                        >
                          <div class="flex items-center justify-between mb-2">
                            <div class="flex items-center gap-2">
                              <span class="text-xl p-1.5 rounded-xl bg-slate-800 border border-slate-700 text-brand-400">🔀</span>
                              <div>
                                <span class="text-xs font-extrabold uppercase tracking-wider text-brand-300">Ensamblado Final</span>
                                <h4 class="text-sm font-bold text-white">${consolidatedSection.title}</h4>
                              </div>
                            </div>
                            <span class="px-2 py-0.5 rounded-full text-[9px] font-bold bg-brand-500/20 text-brand-300 border border-brand-500/30">
                              Prompt Consolidado
                            </span>
                          </div>
                          <p class="text-[11px] text-slate-300 line-clamp-2 mt-1">
                            ${consolidatedSection.subtitle}
                          </p>
                          <div class="mt-2.5 pt-2 border-t border-slate-800 flex items-center justify-between text-[10px] text-slate-400">
                            <span>Confluencia de ${inputSections.length} capas curriculares</span>
                            <span class="text-brand-300 font-bold group-hover:underline flex items-center gap-1">
                              Inspeccionar ➔
                            </span>
                          </div>
                        </div>
                      `
                          : ''
                      }
                    </div>

                  </div>
                </div>
              </div>
            `
                : ''
            }

            <!-- Barra de Acciones del Acordeón -->
            <div class="flex items-center justify-between gap-2 pt-1 pb-1 flex-wrap">
              <div class="flex items-center gap-1.5 flex-wrap">
                <span class="font-bold text-slate-700 text-xs">${t('promptModal.discreteComponents')}:</span>
                ${sections.map(s => `
                  <button data-jump-to="${s.id}" class="px-2.5 py-1 rounded-xl text-[11px] font-bold border transition-all flex items-center gap-1 ${
                    s.isOpen 
                      ? 'bg-slate-900 text-white border-slate-900 shadow-xs' 
                      : 'bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200'
                  }">
                    <span>${s.icon}</span>
                    <span class="truncate max-w-[120px] sm:max-w-none">${s.levelBadge}</span>
                  </button>
                `).join('')}
              </div>

              <div class="flex items-center gap-2 flex-shrink-0 ml-auto">
                <button id="btn-expand-all" class="text-[11px] font-bold text-brand-700 hover:text-brand-800 hover:underline">
                  ${t('promptModal.expandAll')}
                </button>
                <span class="text-slate-300">|</span>
                <button id="btn-collapse-all" class="text-[11px] font-bold text-slate-500 hover:text-slate-700 hover:underline">
                  ${t('promptModal.collapseAll')}
                </button>
              </div>
            </div>

            <!-- Lista de Acordeón con Contenido Markdown de cada Capa -->
            <div class="space-y-3">
              ${sections.map(sec => `
                <div 
                  id="accordion-section-${sec.id}"
                  class="rounded-2xl border border-slate-200/90 overflow-hidden bg-white shadow-xs transition-all duration-200"
                >
                  <!-- Cabecera del Acordeón -->
                  <div 
                    data-toggle-id="${sec.id}"
                    class="w-full flex items-center justify-between p-3.5 sm:p-4 text-left cursor-pointer hover:bg-slate-50/80 transition-colors select-none"
                  >
                    <div class="flex items-center gap-3 min-w-0">
                      <div class="w-9 h-9 rounded-xl flex items-center justify-center text-lg flex-shrink-0 ${
                        sec.isConsolidated 
                          ? 'bg-slate-900 text-white shadow-sm' 
                          : 'bg-slate-100 text-slate-700 border border-slate-200'
                      }">
                        ${sec.icon}
                      </div>
                      <div class="min-w-0">
                        <div class="flex items-center gap-2 flex-wrap">
                          <h4 class="font-bold text-xs sm:text-sm text-slate-900 truncate">${sec.title}</h4>
                          <span class="px-2 py-0.5 rounded-full text-[10px] font-extrabold ${sec.badgeClass}">
                            ${sec.levelBadge}
                          </span>
                        </div>
                        <p class="text-[11px] text-slate-500 truncate">${sec.subtitle}</p>
                      </div>
                    </div>

                    <div class="flex items-center gap-2 flex-shrink-0 ml-2">
                      <button 
                        data-copy-id="${sec.id}" 
                        class="btn-copy-prompt px-2.5 py-1 text-[11px] font-semibold text-slate-600 bg-white hover:bg-slate-100 border border-slate-200 rounded-lg flex items-center gap-1 shadow-2xs transition-all"
                        title="${t('promptModal.copyPrompt')}"
                      >
                        <span>📋</span>
                        <span class="copy-label hidden sm:inline">${t('promptModal.copyPrompt')}</span>
                      </button>

                      <div 
                        id="chevron-${sec.id}" 
                        class="w-7 h-7 rounded-lg bg-slate-100 text-slate-500 flex items-center justify-center text-xs transition-transform duration-200 ${
                          sec.isOpen ? 'rotate-180 bg-slate-200 text-slate-800' : ''
                        }"
                      >
                        ▼
                      </div>
                    </div>
                  </div>

                  <!-- Cuerpo Markdown Desplegable -->
                  <div 
                    id="body-${sec.id}" 
                    class="border-t border-slate-100 bg-slate-50/70 p-3.5 sm:p-5 transition-all ${
                      sec.isOpen ? 'block' : 'hidden'
                    }"
                  >
                    ${
                      sec.source
                        ? `
                      <div class="mb-3 text-[11px] font-mono text-slate-500 bg-slate-200/60 px-3 py-1.5 rounded-xl truncate flex items-center gap-2">
                        <span class="font-bold text-slate-600">${t('promptModal.sourceLabel')}</span>
                        <span class="truncate text-slate-700">${sec.source}</span>
                      </div>
                    `
                        : ''
                    }

                    <div class="leading-relaxed text-xs text-slate-700 space-y-2.5 bg-white p-4 rounded-xl border border-slate-200/80 shadow-2xs overflow-x-auto">
                      ${sec.formattedHtml}
                    </div>
                  </div>
                </div>
              `).join('')}
            </div>

          </div>

          <!-- Footer Modal -->
          <div class="pt-3.5 mt-2 border-t border-slate-100 flex justify-between items-center flex-shrink-0">
            <span class="text-[11px] text-slate-500 truncate max-w-[280px] sm:max-w-none">
              ${assembled ? t('promptModal.footerGraph') : t('promptModal.footerAudit')}
            </span>
            <button id="btn-close-prompt-btn" class="px-4 py-2 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors">
              ${t('promptModal.close')}
            </button>
          </div>

        </div>
      </div>
    `;
  }

  function drawConnectors() {
    if (!hasGraph || !isGraphExpanded) return;

    const svg = container.querySelector('#prompt-graph-svg') as SVGSVGElement | null;
    const graphCanvas = container.querySelector('#prompt-graph-canvas') as HTMLElement | null;
    const targetNode = container.querySelector('#node-consolidated') as HTMLElement | null;
    if (!svg || !graphCanvas || !targetNode) return;

    const svgRect = svg.getBoundingClientRect();
    if (svgRect.width === 0 || svgRect.height === 0) return;

    const targetRect = targetNode.getBoundingClientRect();
    const inputNodes = container.querySelectorAll<HTMLElement>('.graph-input-node');
    if (inputNodes.length === 0) return;

    const isHorizontal = targetRect.left >= (inputNodes[0].getBoundingClientRect().right - 20);

    let pathsHtml = `
      <defs>
        <marker id="arrow-default" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#94a3b8" />
        </marker>
    `;

    inputNodes.forEach((node) => {
      const id = node.dataset.nodeId;
      const color = node.dataset.nodeColor || '#6366f1';
      pathsHtml += `
        <marker id="arrow-${id}" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="${color}" />
        </marker>
      `;
    });
    pathsHtml += `</defs>`;

    inputNodes.forEach((node) => {
      const id = node.dataset.nodeId;
      const color = node.dataset.nodeColor || '#6366f1';
      const nodeRect = node.getBoundingClientRect();

      if (isHorizontal) {
        const sourceX = nodeRect.right - svgRect.left;
        const sourceY = nodeRect.top + nodeRect.height / 2 - svgRect.top;
        const targetX = targetRect.left - svgRect.left;
        const targetY = targetRect.top + targetRect.height / 2 - svgRect.top;
        const dx = Math.max(20, targetX - sourceX);
        const cx1 = sourceX + dx * 0.45;
        const cy1 = sourceY;
        const cx2 = targetX - dx * 0.45;
        const cy2 = targetY;

        pathsHtml += `
          <path id="path-${id}" d="M ${sourceX} ${sourceY} C ${cx1} ${cy1}, ${cx2} ${cy2}, ${targetX} ${targetY}"
            fill="none" stroke="#cbd5e1" stroke-width="2" marker-end="url(#arrow-default)"
            data-default-stroke="#cbd5e1" data-accent-color="${color}"
            class="transition-all duration-300 connector-path" />
        `;
      } else {
        const sourceX = nodeRect.left + nodeRect.width / 2 - svgRect.left;
        const sourceY = nodeRect.bottom - svgRect.top;
        const targetX = targetRect.left + targetRect.width / 2 - svgRect.left;
        const targetY = targetRect.top - svgRect.top;
        const dy = Math.max(20, targetY - sourceY);
        const cx1 = sourceX;
        const cy1 = sourceY + dy * 0.45;
        const cx2 = targetX;
        const cy2 = targetY - dy * 0.45;

        pathsHtml += `
          <path id="path-${id}" d="M ${sourceX} ${sourceY} C ${cx1} ${cy1}, ${cx2} ${cy2}, ${targetX} ${targetY}"
            fill="none" stroke="#cbd5e1" stroke-width="2" marker-end="url(#arrow-default)"
            data-default-stroke="#cbd5e1" data-accent-color="${color}"
            class="transition-all duration-300 connector-path" />
        `;
      }
    });

    svg.innerHTML = pathsHtml;
  }

  function updateAccordionDOM() {
    sections.forEach(sec => {
      const body = container.querySelector(`#body-${sec.id}`) as HTMLElement | null;
      const chevron = container.querySelector(`#chevron-${sec.id}`) as HTMLElement | null;
      const jumpBtn = container.querySelector(`[data-jump-to="${sec.id}"]`) as HTMLElement | null;

      if (body) {
        if (sec.isOpen) {
          body.classList.remove('hidden');
          body.classList.add('block');
        } else {
          body.classList.remove('block');
          body.classList.add('hidden');
        }
      }

      if (chevron) {
        if (sec.isOpen) {
          chevron.classList.add('rotate-180', 'bg-slate-200', 'text-slate-800');
        } else {
          chevron.classList.remove('rotate-180', 'bg-slate-200', 'text-slate-800');
        }
      }

      if (jumpBtn) {
        if (sec.isOpen) {
          jumpBtn.className = 'px-2.5 py-1 rounded-xl text-[11px] font-bold border transition-all flex items-center gap-1 bg-slate-900 text-white border-slate-900 shadow-xs';
        } else {
          jumpBtn.className = 'px-2.5 py-1 rounded-xl text-[11px] font-bold border transition-all flex items-center gap-1 bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200';
        }
      }
    });
  }

  function jumpToSection(sectionId: string) {
    const sec = sections.find(s => s.id === sectionId);
    if (!sec) return;

    sec.isOpen = true;
    updateAccordionDOM();

    setTimeout(() => {
      const card = container.querySelector(`#accordion-section-${sectionId}`) as HTMLElement | null;
      if (card) {
        card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        card.classList.add('ring-2', 'ring-brand-500', 'shadow-md');
        setTimeout(() => {
          card.classList.remove('ring-2', 'ring-brand-500', 'shadow-md');
        }, 1500);
      }
    }, 40);
  }

  function handleClose() {
    document.removeEventListener('keydown', handleKeyDown);
    if (resizeObserver) {
      resizeObserver.disconnect();
    }
    opts.onClose();
  }

  function handleKeyDown(e: KeyboardEvent) {
    if (e.key === 'Escape') {
      handleClose();
    }
  }

  // Render inicial
  container.innerHTML = renderHTML();

  let resizeObserver: ResizeObserver | null = null;

  // Registrar listeners y observers
  function bindEvents() {
    document.addEventListener('keydown', handleKeyDown);

    container.querySelector('#btn-close-prompt-modal')?.addEventListener('click', handleClose);
    container.querySelector('#btn-close-prompt-btn')?.addEventListener('click', handleClose);

    // Cerrar al hacer clic en el backdrop
    const backdrop = container.querySelector('#prompt-modal-backdrop');
    backdrop?.addEventListener('click', (e) => {
      if (e.target === backdrop) {
        handleClose();
      }
    });

    // Toggle Grafo
    const toggleGraphBtn = container.querySelector('#btn-toggle-graph');
    toggleGraphBtn?.addEventListener('click', () => {
      isGraphExpanded = !isGraphExpanded;
      const graphPanel = container.querySelector('#graph-panel-wrapper') as HTMLElement | null;
      if (graphPanel) {
        if (isGraphExpanded) {
          graphPanel.classList.remove('hidden');
          graphPanel.classList.add('block');
          toggleGraphBtn.className = 'px-3 py-1.5 rounded-xl text-xs font-bold border transition-all flex items-center gap-1.5 bg-brand-50 text-brand-700 border-brand-200 hover:bg-brand-100';
          requestAnimationFrame(() => drawConnectors());
        } else {
          graphPanel.classList.remove('block');
          graphPanel.classList.add('hidden');
          toggleGraphBtn.className = 'px-3 py-1.5 rounded-xl text-xs font-bold border transition-all flex items-center gap-1.5 bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200';
        }
      }
    });

    // Expandir Todo / Colapsar Todo
    container.querySelector('#btn-expand-all')?.addEventListener('click', () => {
      sections.forEach(s => s.isOpen = true);
      updateAccordionDOM();
    });

    container.querySelector('#btn-collapse-all')?.addEventListener('click', () => {
      sections.forEach(s => s.isOpen = false);
      updateAccordionDOM();
    });

    // Toggle individual de acordeón
    container.querySelectorAll('[data-toggle-id]').forEach(header => {
      header.addEventListener('click', (e) => {
        // Ignorar si se hizo clic en el botón de copiar
        if ((e.target as HTMLElement).closest('.btn-copy-prompt')) {
          return;
        }
        const id = (header as HTMLElement).dataset.toggleId;
        const sec = sections.find(s => s.id === id);
        if (sec) {
          sec.isOpen = !sec.isOpen;
          updateAccordionDOM();
        }
      });
    });

    // Pastillas de salto directo (Jump-to)
    container.querySelectorAll('[data-jump-to]').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = (btn as HTMLElement).dataset.jumpTo;
        if (id) jumpToSection(id);
      });
    });

    // Copiar Prompt
    container.querySelectorAll('.btn-copy-prompt').forEach(btn => {
      btn.addEventListener('click', async (e) => {
        e.stopPropagation();
        const copyBtn = btn as HTMLElement;
        const id = copyBtn.dataset.copyId;
        const sec = sections.find(s => s.id === id);
        if (!sec) return;

        try {
          await navigator.clipboard.writeText(sec.rawContent);
          const label = copyBtn.querySelector('.copy-label');
          const originalText = label ? label.textContent : '';
          if (label) label.textContent = t('promptModal.copied');
          copyBtn.classList.remove('text-slate-600', 'bg-white');
          copyBtn.classList.add('text-emerald-700', 'bg-emerald-50', 'border-emerald-300');

          setTimeout(() => {
            if (label) label.textContent = originalText;
            copyBtn.classList.remove('text-emerald-700', 'bg-emerald-50', 'border-emerald-300');
            copyBtn.classList.add('text-slate-600', 'bg-white');
          }, 2000);
        } catch (err) {
          console.error('Error al copiar al portapapeles:', err);
        }
      });
    });

    // Interacciones del Grafo SVG / HTML
    const inputNodes = container.querySelectorAll<HTMLElement>('.graph-input-node');
    const targetNode = container.querySelector('#node-consolidated') as HTMLElement | null;
    const svg = container.querySelector('#prompt-graph-svg') as SVGSVGElement | null;

    inputNodes.forEach(node => {
      const id = node.dataset.nodeId;
      node.addEventListener('mouseenter', () => {
        if (!svg) return;
        const path = svg.querySelector(`#path-${id}`) as SVGPathElement | null;
        if (path) {
          path.setAttribute('stroke', path.dataset.accentColor || '#6366f1');
          path.setAttribute('stroke-width', '3.5');
          path.setAttribute('marker-end', `url(#arrow-${id})`);
        }
      });

      node.addEventListener('mouseleave', () => {
        if (!svg) return;
        const path = svg.querySelector(`#path-${id}`) as SVGPathElement | null;
        if (path) {
          path.setAttribute('stroke', path.dataset.defaultStroke || '#cbd5e1');
          path.setAttribute('stroke-width', '2');
          path.setAttribute('marker-end', 'url(#arrow-default)');
        }
      });

      node.addEventListener('click', () => {
        if (id) jumpToSection(id);
      });
    });

    if (targetNode && svg) {
      targetNode.addEventListener('mouseenter', () => {
        svg.querySelectorAll<SVGPathElement>('.connector-path').forEach(p => {
          p.setAttribute('stroke', p.dataset.accentColor || '#6366f1');
          p.setAttribute('stroke-width', '3');
          const id = p.id.replace('path-', '');
          p.setAttribute('marker-end', `url(#arrow-${id})`);
        });
      });

      targetNode.addEventListener('mouseleave', () => {
        svg.querySelectorAll<SVGPathElement>('.connector-path').forEach(p => {
          p.setAttribute('stroke', p.dataset.defaultStroke || '#cbd5e1');
          p.setAttribute('stroke-width', '2');
          p.setAttribute('marker-end', 'url(#arrow-default)');
        });
      });

      targetNode.addEventListener('click', () => {
        const id = targetNode.dataset.nodeId;
        if (id) jumpToSection(id);
      });
    }

    // Observer de redimensionamiento para los conectores SVG
    const graphCanvas = container.querySelector('#prompt-graph-canvas');
    if (graphCanvas && typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(() => {
        requestAnimationFrame(() => drawConnectors());
      });
      resizeObserver.observe(graphCanvas);
    }
  }

  bindEvents();
  requestAnimationFrame(() => drawConnectors());
}
