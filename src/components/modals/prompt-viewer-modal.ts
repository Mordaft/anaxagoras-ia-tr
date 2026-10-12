export interface PromptViewerModalOptions {
  subtitle?: string;
  badge?: { text: string; colorClass?: string };
  institution?: string;
  sourceApi?: string;
  gradeLevel?: string;
  onClose: () => void;
}

export function renderPromptViewerModal(
  container: HTMLElement, 
  title: string, 
  markdownContent: string, 
  options: PromptViewerModalOptions | { onClose: () => void }
): void {
  const opts = options as PromptViewerModalOptions;
  const isCurricularApi = Boolean(opts.institution || opts.sourceApi);

  // Simple markdown to HTML formatter for displaying system prompt nicely
  const formattedHtml = markdownContent
    .replace(/^# (.*$)/gim, '<h2 class="text-xl font-bold text-slate-900 mt-4 mb-2">$1</h2>')
    .replace(/^## (.*$)/gim, '<h3 class="text-base font-bold text-slate-800 mt-3 mb-1.5">$1</h3>')
    .replace(/^### (.*$)/gim, '<h4 class="text-sm font-bold text-slate-800 mt-2 mb-1">$1</h4>')
    .replace(/\*\*(.*?)\*\*/gim, '<strong class="font-bold text-slate-900">$1</strong>')
    .replace(/\*(.*?)\*/gim, '<em class="italic text-slate-700">$1</em>')
    .replace(/```json([\s\S]*?)```/gim, '<pre class="p-3 my-2 bg-slate-900 text-emerald-400 rounded-xl text-xs font-mono overflow-x-auto">$1</pre>')
    .replace(/```([\s\S]*?)```/gim, '<pre class="p-3 my-2 bg-slate-900 text-slate-100 rounded-xl text-xs font-mono overflow-x-auto">$1</pre>')
    .replace(/^\- (.*$)/gim, '<li class="ml-4 list-disc text-xs text-slate-700 mb-1">$1</li>')
    .replace(/^\d+\. (.*$)/gim, '<li class="ml-4 list-decimal text-xs text-slate-700 mb-1">$1</li>')
    .replace(/\n\n/gim, '<br/><br/>');

  container.innerHTML = `
    <div class="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div class="relative bg-white rounded-3xl shadow-2xl max-w-2xl w-full p-6 sm:p-8 border border-slate-100 max-h-[85vh] flex flex-col transition-all">
        
        <!-- Header -->
        <div class="flex items-center justify-between pb-4 border-b border-slate-100 flex-shrink-0">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-2xl ${isCurricularApi ? 'bg-purple-50 text-purple-600' : 'bg-brand-50 text-brand-600'} flex items-center justify-center text-xl">
              ${isCurricularApi ? '🏛️' : '📄'}
            </div>
            <div>
              <div class="flex items-center gap-2">
                <h3 class="font-display font-bold text-lg text-slate-900">${title}</h3>
                <span class="px-2 py-0.5 rounded-full text-[10px] font-bold ${
                  isCurricularApi 
                    ? 'bg-purple-100 text-purple-800 border border-purple-200' 
                    : 'bg-brand-100 text-brand-800 border border-brand-200'
                }">
                  ${isCurricularApi ? 'API Educativa (Mock)' : 'Prompt Sección'}
                </span>
              </div>
              <p class="text-xs text-slate-500">${opts.subtitle || (isCurricularApi ? 'Directriz Curricular Departamental' : 'Prompt Transversal de Sección')}</p>
            </div>
          </div>
          <button id="btn-close-prompt-modal" class="text-slate-400 hover:text-slate-600 p-2 rounded-xl hover:bg-slate-100 transition-colors">
            ✕
          </button>
        </div>

        ${
          isCurricularApi
            ? `
          <!-- Educational API Banner -->
          <div class="mt-4 p-3 rounded-2xl bg-purple-50/70 border border-purple-200 text-xs text-purple-950 space-y-1 flex-shrink-0">
            <div class="flex items-center justify-between">
              <span class="font-bold flex items-center gap-1.5">
                <span>🏛️</span>
                <span>${opts.institution || "Departament d'Educació de la Generalitat de Catalunya (Esfer@)"}</span>
              </span>
              ${opts.gradeLevel ? `<span class="px-2 py-0.5 rounded-md bg-purple-200 text-purple-900 font-bold text-[10px]">${opts.gradeLevel}</span>` : ''}
            </div>
            ${
              opts.sourceApi
                ? `<div class="text-[11px] font-mono text-purple-700 truncate">
                    <span class="font-semibold">Endpoint:</span> ${opts.sourceApi}
                  </div>`
                : ''
            }
          </div>
        `
            : ''
        }

        <!-- Scrollable Content -->
        <div class="mt-4 flex-1 overflow-y-auto pr-2 space-y-3 leading-relaxed text-xs text-slate-700 bg-slate-50/70 p-4 rounded-2xl border border-slate-200">
          ${formattedHtml}
        </div>

        <!-- Footer -->
        <div class="pt-4 border-t border-slate-100 flex justify-between items-center flex-shrink-0">
          <span class="text-[11px] text-slate-400">
            ${isCurricularApi ? 'Directriz curricular inyectada según el grado del alumno' : 'Auditoría pedagógica metodológica garantizada'}
          </span>
          <button id="btn-close-prompt-btn" class="px-4 py-2 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors">
            Cerrar
          </button>
        </div>

      </div>
    </div>
  `;

  container.querySelector('#btn-close-prompt-modal')?.addEventListener('click', opts.onClose);
  container.querySelector('#btn-close-prompt-btn')?.addEventListener('click', opts.onClose);
}
