export interface PromptViewerModalCallbacks {
  onClose: () => void;
}

export function renderPromptViewerModal(
  container: HTMLElement, 
  title: string, 
  markdownContent: string, 
  callbacks: PromptViewerModalCallbacks
): void {
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
            <div class="w-10 h-10 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center text-xl">
              📄
            </div>
            <div>
              <h3 class="font-display font-bold text-lg text-slate-900">${title}</h3>
              <p class="text-xs text-slate-500">Contenido estático de la sección (Prompt Markdown Oficial)</p>
            </div>
          </div>
          <button id="btn-close-prompt-modal" class="text-slate-400 hover:text-slate-600 p-2 rounded-xl hover:bg-slate-100 transition-colors">
            ✕
          </button>
        </div>

        <!-- Scrollable Content -->
        <div class="mt-4 flex-1 overflow-y-auto pr-2 space-y-3 leading-relaxed text-xs text-slate-700 bg-slate-50/70 p-4 rounded-2xl border border-slate-200">
          ${formattedHtml}
        </div>

        <!-- Footer -->
        <div class="pt-4 border-t border-slate-100 flex justify-between items-center flex-shrink-0">
          <span class="text-[11px] text-slate-400">Auditoría pedagógica garantizada</span>
          <button id="btn-close-prompt-btn" class="px-4 py-2 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors">
            Cerrar
          </button>
        </div>

      </div>
    </div>
  `;

  container.querySelector('#btn-close-prompt-modal')?.addEventListener('click', callbacks.onClose);
  container.querySelector('#btn-close-prompt-btn')?.addEventListener('click', callbacks.onClose);
}
