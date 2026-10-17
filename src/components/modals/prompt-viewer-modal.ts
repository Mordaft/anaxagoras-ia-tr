import type { AssembledPrompt, PromptLayer, AssembledAgendaPrompt, AgendaPromptPillar } from '../../types/prompts';
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

export function renderPromptViewerModal(
  container: HTMLElement, 
  title: string, 
  markdownContent: string, 
  options: PromptViewerModalOptions | { onClose: () => void }
): void {
  const opts = options as PromptViewerModalOptions;
  const assembled = opts.assembledPrompt;
  const assembledAgenda = opts.assembledAgendaPrompt;

  type ModalTab = 'all' | 'level1' | 'level3' | 'level2A' | 'level2B' | 'agenda_time' | 'agenda_priority' | 'agenda_deadlines' | 'agenda_adaptive';
  let activeTab: ModalTab = 'all';

  function getActiveContent(): { title: string; subtitle: string; source?: string; badge: string; html: string } {
    // 1. Caso Agenda Especializada
    if (assembledAgenda) {
      if (activeTab === 'all') {
        return {
          title: assembledAgenda.title,
          subtitle: assembledAgenda.subtitle,
          badge: 'Estructura Propia de Agenda',
          html: formatMarkdown(assembledAgenda.systemInstruction, false)
        };
      }

      let pillar: AgendaPromptPillar | undefined;
      if (activeTab === 'agenda_time') pillar = assembledAgenda.pillars.timeDistribution;
      if (activeTab === 'agenda_priority') pillar = assembledAgenda.pillars.priorityOrder;
      if (activeTab === 'agenda_deadlines') pillar = assembledAgenda.pillars.commitmentDeadlines;
      if (activeTab === 'agenda_adaptive') pillar = assembledAgenda.pillars.adaptiveFlexibility;

      if (pillar) {
        return {
          title: pillar.title,
          subtitle: pillar.subtitle,
          source: pillar.source,
          badge: pillar.badge,
          html: formatMarkdown(pillar.content, false)
        };
      }
    }

    // 2. Caso Grafo Multinivel Socrático / Proyectos
    if (!assembled || activeTab === 'all') {
      const rawText = assembled ? assembled.systemInstruction : markdownContent;
      const isStandaloneN3 = !assembled && (title.includes('Nivel 3') || title.includes('Regulador') || (opts.subtitle || '').includes('Regulador'));

      let htmlContent: string;
      if (isStandaloneN3) {
        htmlContent = formatMarkdown(rawText, false); // N3 excluido de renderizado matemático
      } else if (assembled && rawText.includes('=== [MARCO REGULADOR Y DEONTOLÓGICO - NIVEL 3] ===')) {
        // En ensamblado completo, proteger la sección N3 de matemáticas (contiene decretos ej. 217/2022)
        const parts = rawText.split(/(=== \[MARCO REGULADOR Y DEONTOLÓGICO - NIVEL 3\] ===[\s\S]*?==================================================)/);
        htmlContent = parts
          .map(part => {
            if (part.startsWith('=== [MARCO REGULADOR Y DEONTOLÓGICO - NIVEL 3] ===')) {
              return formatMarkdown(part, false); // N3 sin matemáticas
            }
            return formatMarkdown(part, true);
          })
          .join('');
      } else {
        htmlContent = formatMarkdown(rawText, true);
      }

      return {
        title: assembled ? t('promptModal.titleAssembled', { subject: assembled.subject }) : title,
        subtitle: assembled ? t('promptModal.subtitleAssembled', { topic: assembled.topicName }) : (opts.subtitle || t('promptModal.defaultSubtitle')),
        badge: assembled ? t('promptModal.badge4Layers') : (opts.badge?.text || t('promptModal.badgePrompt')),
        html: htmlContent
      };
    }

    let layer: PromptLayer | undefined;
    if (activeTab === 'level1') layer = assembled.layers.level1Functional;
    if (activeTab === 'level3') layer = assembled.layers.level3Regulatory;
    if (activeTab === 'level2A') layer = assembled.layers.level2BaseTopic;
    if (activeTab === 'level2B') layer = assembled.layers.level2SpecificActivity;

    const isRegulatoryN3 = activeTab === 'level3' || layer?.level === 'level3';

    if (!layer) {
      return {
        title,
        subtitle: opts.subtitle || '',
        badge: t('promptModal.badgeLayer'),
        html: formatMarkdown(markdownContent, !isRegulatoryN3)
      };
    }

    return {
      title: layer.title,
      subtitle: layer.subtitle,
      source: layer.source,
      badge: layer.badge,
      html: formatMarkdown(layer.content, !isRegulatoryN3) // N3 explícitamente excluido
    };
  }

  function render() {
    const current = getActiveContent();

    container.innerHTML = `
      <div class="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
        <div class="relative bg-white rounded-3xl shadow-2xl max-w-3xl w-full p-5 sm:p-7 border border-slate-100 max-h-[90vh] flex flex-col transition-all">
          
          <!-- Header -->
          <div class="flex items-center justify-between pb-3.5 border-b border-slate-100 flex-shrink-0">
            <div class="flex items-center gap-3">
              <div class="w-11 h-11 rounded-2xl bg-gradient-to-tr from-brand-600 to-accent-cyan text-white flex items-center justify-center text-xl shadow-md shadow-brand-500/20">
                ${assembledAgenda ? '⏱️' : (assembled ? '🧩' : (opts.institution ? '🏛️' : '📄'))}
              </div>
              <div>
                <div class="flex items-center gap-2 flex-wrap">
                  <h3 class="font-display font-bold text-base sm:text-lg text-slate-900">${current.title}</h3>
                  <span class="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-brand-50 text-brand-700 border border-brand-200">
                    ${current.badge}
                  </span>
                </div>
                <p class="text-xs text-slate-500">${current.subtitle}</p>
              </div>
            </div>
            <button id="btn-close-prompt-modal" class="text-slate-400 hover:text-slate-600 p-2 rounded-xl hover:bg-slate-100 transition-colors" title="${t('promptModal.close')}">
              ✕
            </button>
          </div>

          <!-- Specialized Agenda Tabs (Estructura Propia de Agenda) -->
          ${
            assembledAgenda
              ? `
            <div class="mt-3 flex items-center gap-1.5 overflow-x-auto pb-1 flex-shrink-0 text-xs font-semibold">
              <button data-tab="all" class="px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === 'all'
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }">
                <span>🔀</span>
                <span>Completo (Visión General)</span>
              </button>
              <button data-tab="agenda_time" class="px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === 'agenda_time'
                  ? 'bg-cyan-600 text-white shadow-sm shadow-cyan-500/20'
                  : 'bg-cyan-50 text-cyan-700 hover:bg-cyan-100'
              }">
                <span>⏱️</span>
                <span>1. Distribución Homogénea</span>
              </button>
              <button data-tab="agenda_priority" class="px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === 'agenda_priority'
                  ? 'bg-amber-600 text-white shadow-sm shadow-amber-500/20'
                  : 'bg-amber-50 text-amber-700 hover:bg-amber-100'
              }">
                <span>🎯</span>
                <span>2. Orden de Prioridad</span>
              </button>
              <button data-tab="agenda_deadlines" class="px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === 'agenda_deadlines'
                  ? 'bg-purple-600 text-white shadow-sm shadow-purple-500/20'
                  : 'bg-purple-50 text-purple-700 hover:bg-purple-100'
              }">
                <span>📅</span>
                <span>3. Fechas de Compromiso</span>
              </button>
              <button data-tab="agenda_adaptive" class="px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === 'agenda_adaptive'
                  ? 'bg-emerald-600 text-white shadow-sm shadow-emerald-500/20'
                  : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
              }">
                <span>🔄</span>
                <span>4. Adaptabilidad y JSON</span>
              </button>
            </div>
          `
              : ''
          }

          <!-- Multi-Level Tabs (Grafo de Prompts Socrático / Proyectos) -->
          ${
            assembled
              ? `
            <div class="mt-3 flex items-center gap-1.5 overflow-x-auto pb-1 flex-shrink-0 text-xs font-semibold">
              <button data-tab="all" class="px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === 'all'
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }">
                <span>🔀</span>
                <span>${t('promptModal.tabs.all')}</span>
              </button>
              <button data-tab="level1" class="px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === 'level1'
                  ? 'bg-brand-600 text-white shadow-sm shadow-brand-500/20'
                  : 'bg-brand-50 text-brand-700 hover:bg-brand-100'
              }">
                <span>🧠</span>
                <span>${t('promptModal.tabs.level1')}</span>
              </button>
              <button data-tab="level3" class="px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === 'level3'
                  ? 'bg-amber-600 text-white shadow-sm shadow-amber-500/20'
                  : 'bg-amber-50 text-amber-700 hover:bg-amber-100'
              }">
                <span>⚖️</span>
                <span>${t('promptModal.tabs.level3')}</span>
              </button>
              <button data-tab="level2A" class="px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === 'level2A'
                  ? 'bg-purple-600 text-white shadow-sm shadow-purple-500/20'
                  : 'bg-purple-50 text-purple-700 hover:bg-purple-100'
              }">
                <span>🏛️</span>
                <span>${t('promptModal.tabs.level2A')}</span>
              </button>
              ${
                assembled.layers.level2SpecificActivity
                  ? `
                <button data-tab="level2B" class="px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 whitespace-nowrap ${
                  activeTab === 'level2B'
                    ? 'bg-emerald-600 text-white shadow-sm shadow-emerald-500/20'
                    : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                }">
                  <span>🎯</span>
                  <span>${t('promptModal.tabs.level2B')}</span>
                </button>
              `
                  : ''
              }
            </div>
          `
              : ''
          }

          ${
            current.source
              ? `
            <div class="mt-2 text-[11px] font-mono text-slate-500 bg-slate-100/70 px-3 py-1.5 rounded-xl truncate flex items-center gap-2 flex-shrink-0">
              <span class="font-bold text-slate-600">${t('promptModal.sourceLabel')}</span>
              <span class="truncate text-slate-700">${current.source}</span>
            </div>
          `
              : ''
          }

          <!-- Scrollable Markdown Content -->
          <div class="mt-3 flex-1 overflow-y-auto pr-2 space-y-3 leading-relaxed text-xs text-slate-700 bg-slate-50/70 p-4 rounded-2xl border border-slate-200">
            ${current.html}
          </div>

          <!-- Footer -->
          <div class="pt-3.5 mt-3 border-t border-slate-100 flex justify-between items-center flex-shrink-0">
            <span class="text-[11px] text-slate-500">
              ${assembled ? t('promptModal.footerGraph') : t('promptModal.footerAudit')}
            </span>
            <button id="btn-close-prompt-btn" class="px-4 py-2 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors">
              ${t('promptModal.close')}
            </button>
          </div>

        </div>
      </div>
    `;

    container.querySelector('#btn-close-prompt-modal')?.addEventListener('click', opts.onClose);
    container.querySelector('#btn-close-prompt-btn')?.addEventListener('click', opts.onClose);

    container.querySelectorAll('[data-tab]').forEach(btn => {
      btn.addEventListener('click', () => {
        activeTab = (btn as HTMLElement).dataset.tab as any;
        render();
      });
    });
  }

  render();
}
