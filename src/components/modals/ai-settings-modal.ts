import { aiClientService } from '../../services/ai-client';

export interface AISettingsModalCallbacks {
  onSaved: () => void;
  onClose: () => void;
}

export function renderAISettingsModal(container: HTMLElement, callbacks: AISettingsModalCallbacks): void {
  aiClientService.getSettings().then(settings => {
    container.innerHTML = `
      <div class="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
        <div class="relative bg-white rounded-3xl shadow-2xl max-w-lg w-full p-6 sm:p-8 border border-slate-100 transition-all">
          
          <!-- Header -->
          <div class="flex items-center justify-between pb-4 border-b border-slate-100">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center text-xl">
                🤖
              </div>
              <div>
                <h3 class="font-display font-bold text-lg text-slate-900">Configuración del Modelo de IA</h3>
                <p class="text-xs text-slate-500">Inferencia local o en la nube con API estándar OpenAI</p>
              </div>
            </div>
            <button id="btn-close-modal" class="text-slate-400 hover:text-slate-600 p-2 rounded-xl hover:bg-slate-100 transition-colors">
              ✕
            </button>
          </div>

          <!-- Form -->
          <form id="ai-settings-form" class="mt-6 space-y-4">
            
            <!-- Provider Selector -->
            <div>
              <label class="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">Tipo de Inferencia</label>
              <div class="grid grid-cols-2 gap-3">
                <label class="flex items-center gap-2 p-3 rounded-2xl border cursor-pointer transition-all ${
                  settings.provider === 'local' ? 'border-brand-500 bg-brand-50/50 ring-2 ring-brand-500/20' : 'border-slate-200 hover:bg-slate-50'
                }">
                  <input type="radio" name="provider" value="local" class="text-brand-600 focus:ring-brand-500" ${settings.provider === 'local' ? 'checked' : ''} />
                  <div>
                    <span class="block text-xs font-bold text-slate-800">Local (Privacidad Total)</span>
                    <span class="block text-[11px] text-slate-500">Ollama, LM Studio, vLLM</span>
                  </div>
                </label>

                <label class="flex items-center gap-2 p-3 rounded-2xl border cursor-pointer transition-all ${
                  settings.provider === 'cloud' ? 'border-brand-500 bg-brand-50/50 ring-2 ring-brand-500/20' : 'border-slate-200 hover:bg-slate-50'
                }">
                  <input type="radio" name="provider" value="cloud" class="text-brand-600 focus:ring-brand-500" ${settings.provider === 'cloud' ? 'checked' : ''} />
                  <div>
                    <span class="block text-xs font-bold text-slate-800">Cloud (OpenAI API)</span>
                    <span class="block text-[11px] text-slate-500">OpenAI, Groq, OpenRouter</span>
                  </div>
                </label>
              </div>
            </div>

            <!-- Endpoint URL -->
            <div>
              <label class="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">URL del Endpoint API</label>
              <input 
                type="url" 
                id="input-endpoint" 
                value="${settings.endpointUrl}" 
                placeholder="http://localhost:11434/v1"
                class="w-full text-sm px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 focus:outline-none transition-all font-mono text-xs" 
                required 
              />
              <span class="text-[11px] text-slate-400 mt-1 block">Compatible con /v1/chat/completions y /v1/models</span>
            </div>

            <!-- Model Name -->
            <div>
              <label class="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">Nombre del Modelo</label>
              <input 
                type="text" 
                id="input-model" 
                value="${settings.modelName}" 
                placeholder="llama3:latest, gemma2, gpt-4o-mini"
                class="w-full text-sm px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 focus:outline-none transition-all" 
                required 
              />
            </div>

            <!-- API Key (Optional) -->
            <div>
              <label class="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">API Key (Opcional en Local)</label>
              <input 
                type="password" 
                id="input-apikey" 
                value="${settings.apiKey || ''}" 
                placeholder="sk-..."
                class="w-full text-sm px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 focus:outline-none transition-all font-mono text-xs" 
              />
              <span class="text-[11px] text-slate-400 mt-1 block">Guardada de forma segura únicamente en tu navegador (IndexedDB local).</span>
            </div>

            <!-- Socratic Strictness -->
            <div>
              <label class="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">Modo Pedagógico Socrático</label>
              <select id="select-strictness" class="w-full text-xs font-semibold px-3 py-2 rounded-xl border border-slate-200 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 focus:outline-none">
                <option value="high" ${settings.socraticStrictness === 'high' ? 'selected' : ''}>Estricto: Nunca da soluciones directas (100% preguntas de razonamiento)</option>
                <option value="balanced" ${settings.socraticStrictness === 'balanced' ? 'selected' : ''}>Equilibrado: Pistas intermedias y ejemplos análogos</option>
                <option value="exploratory" ${settings.socraticStrictness === 'exploratory' ? 'selected' : ''}>Exploratorio: Explicaciones conceptuales y desafíos</option>
              </select>
            </div>

            <!-- Live Status Alert -->
            <div id="test-result-box" class="hidden p-3 rounded-xl text-xs font-medium"></div>

            <!-- Actions -->
            <div class="pt-4 flex items-center justify-between gap-3 border-t border-slate-100">
              <button 
                type="button" 
                id="btn-test-connection" 
                class="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors"
              >
                <span>⚡</span>
                <span>Probar Conexión</span>
              </button>

              <div class="flex items-center gap-2">
                <button 
                  type="button" 
                  id="btn-cancel" 
                  class="px-4 py-2 rounded-xl text-xs font-semibold text-slate-500 hover:text-slate-800 hover:bg-slate-50 transition-colors"
                >
                  Cancelar
                </button>
                <button 
                  type="submit" 
                  class="px-5 py-2 rounded-xl text-xs font-bold text-white bg-brand-600 hover:bg-brand-700 shadow-md shadow-brand-500/25 transition-all"
                >
                  Guardar Cambios
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    `;

    // Event listeners
    container.querySelector('#btn-close-modal')?.addEventListener('click', callbacks.onClose);
    container.querySelector('#btn-cancel')?.addEventListener('click', callbacks.onClose);

    // Test connection button
    const testBtn = container.querySelector('#btn-test-connection');
    const resultBox = container.querySelector('#test-result-box');
    testBtn?.addEventListener('click', async () => {
      const endpoint = (container.querySelector('#input-endpoint') as HTMLInputElement).value;
      const model = (container.querySelector('#input-model') as HTMLInputElement).value;
      const apiKey = (container.querySelector('#input-apikey') as HTMLInputElement).value;
      const providerRadio = container.querySelector('input[name="provider"]:checked') as HTMLInputElement;

      if (testBtn) testBtn.innerHTML = `<span>⏳</span><span>Probando...</span>`;

      const result = await aiClientService.testConnection({
        provider: providerRadio?.value as any || 'local',
        endpointUrl: endpoint,
        modelName: model,
        apiKey,
        temperature: 0.7,
        socraticStrictness: 'high',
        updatedAt: new Date().toISOString()
      });

      if (testBtn) testBtn.innerHTML = `<span>⚡</span><span>Probar Conexión</span>`;

      if (resultBox) {
        resultBox.classList.remove('hidden', 'bg-emerald-50', 'text-emerald-700', 'bg-amber-50', 'text-amber-700');
        if (result.success) {
          resultBox.classList.add('bg-emerald-50', 'text-emerald-700');
          resultBox.textContent = `✅ ${result.message}`;
        } else {
          resultBox.classList.add('bg-amber-50', 'text-amber-700');
          resultBox.textContent = `ℹ️ ${result.message}`;
        }
      }
    });

    // Form submit
    const form = container.querySelector('#ai-settings-form');
    form?.addEventListener('submit', async (e) => {
      e.preventDefault();
      const endpoint = (container.querySelector('#input-endpoint') as HTMLInputElement).value;
      const model = (container.querySelector('#input-model') as HTMLInputElement).value;
      const apiKey = (container.querySelector('#input-apikey') as HTMLInputElement).value;
      const providerRadio = container.querySelector('input[name="provider"]:checked') as HTMLInputElement;
      const strictness = (container.querySelector('#select-strictness') as HTMLSelectElement).value;

      await aiClientService.updateSettings({
        provider: providerRadio?.value as any || 'local',
        endpointUrl: endpoint,
        modelName: model,
        apiKey,
        socraticStrictness: strictness as any
      });

      callbacks.onSaved();
    });
  });
}
