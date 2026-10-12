import type { AISettings } from '../types/ai';
import type { ChatMessage } from '../types/study';
import { db } from './storage';

export class AIClientService {
  public async getSettings(): Promise<AISettings> {
    const settings = await db.aiSettings.toCollection().first();
    if (settings) {
      return settings;
    }
    return {
      provider: 'local',
      endpointUrl: 'http://localhost:11434/v1',
      modelName: 'llama3:latest',
      temperature: 0.7,
      socraticStrictness: 'high',
      updatedAt: new Date().toISOString()
    };
  }

  public async updateSettings(newSettings: Partial<AISettings>): Promise<void> {
    const existing = await db.aiSettings.toCollection().first();
    if (existing && existing.id) {
      await db.aiSettings.update(existing.id, {
        ...newSettings,
        updatedAt: new Date().toISOString()
      });
    } else {
      await db.aiSettings.add({
        provider: 'local',
        endpointUrl: 'http://localhost:11434/v1',
        modelName: 'llama3:latest',
        temperature: 0.7,
        socraticStrictness: 'high',
        updatedAt: new Date().toISOString(),
        ...newSettings
      });
    }
  }

  public async testConnection(settings: AISettings): Promise<{ success: boolean; message: string }> {
    try {
      const url = `${settings.endpointUrl.replace(/\/+$/, '')}/models`;
      const headers: Record<string, string> = {
        'Content-Type': 'application/json'
      };
      if (settings.apiKey) {
        headers['Authorization'] = `Bearer ${settings.apiKey}`;
      }

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 4000);

      const response = await fetch(url, {
        method: 'GET',
        headers,
        signal: controller.signal
      });
      clearTimeout(timeoutId);

      if (response.ok) {
        return { success: true, message: `Conexión exitosa con ${settings.endpointUrl}` };
      } else {
        return { 
          success: false, 
          message: `El servidor respondió con código ${response.status}: ${response.statusText}` 
        };
      }
    } catch {
      return { 
        success: false, 
        message: `No se pudo conectar con ${settings.endpointUrl}. Modo socrático local activado para la demostración.` 
      };
    }
  }

  public async generateSocraticResponse(
    studentMessage: string,
    subject: string,
    topic: string,
    history: ChatMessage[]
  ): Promise<ChatMessage> {
    const settings = await this.getSettings();

    // Check if real endpoint is accessible
    try {
      const completionUrl = `${settings.endpointUrl.replace(/\/+$/, '')}/chat/completions`;
      const systemPrompt = `Eres Anaxagoras AI, un Tutor Educativo Socrático para estudiantes de 6 a 18 años.
Asignatura: ${subject}. Tema: ${topic}.
REGLA PEDAGÓGICA SAGRADA:
NUNCA des la solución directa o el trabajo hecho. Tu meta es que el estudiante aprenda y piense por sí mismo.
Si el estudiante te pide 'dame la respuesta', 'resuélvelo tú' o 'hazme el texto', debes negarte amablemente y responder con una pregunta socrática o una pista intermedia que lo haga pensar.
Sé entusiasta, claro y conciso (máximo 3 párrafos cortos). Termina siempre con UNA sola pregunta estimulante.`;

      const headers: Record<string, string> = { 'Content-Type': 'application/json' };
      if (settings.apiKey) {
        headers['Authorization'] = `Bearer ${settings.apiKey}`;
      }

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 6000);

      const res = await fetch(completionUrl, {
        method: 'POST',
        headers,
        signal: controller.signal,
        body: JSON.stringify({
          model: settings.modelName,
          messages: [
            { role: 'system', content: systemPrompt },
            ...history.slice(-4).map(m => ({ role: m.role === 'tutor' ? 'assistant' : 'user', content: m.content })),
            { role: 'user', content: studentMessage }
          ],
          temperature: settings.temperature
        })
      });
      clearTimeout(timeoutId);

      if (res.ok) {
        const data = await res.json();
        const content = data.choices?.[0]?.message?.content;
        if (content) {
          return {
            id: `msg_${Date.now()}`,
            role: 'tutor',
            content,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            isSocraticQuestion: true,
            suggestedPrompts: this.extractSuggestedPrompts(content, subject)
          };
        }
      }
    } catch {
      // Fallback to intelligent Socratic tutor logic
    }

    // Pedagogical Fallback Engine (Immediate feedback demonstrating Socratic principles)
    await new Promise(resolve => setTimeout(resolve, 800));
    return this.createSimulatedSocraticResponse(studentMessage, subject);
  }

  private createSimulatedSocraticResponse(studentMessage: string, subject: string): ChatMessage {
    const text = studentMessage.toLowerCase();
    let reply = '';
    let suggestions: string[] = [];

    const isDirectSolutionRequest = 
      text.includes('dame la respuesta') || 
      text.includes('solucion') || 
      text.includes('solución') || 
      text.includes('hazmelo') || 
      text.includes('resuelve') ||
      text.includes('escribe el texto') ||
      text.includes('dime el resultado');

    if (isDirectSolutionRequest) {
      reply = `¡Me encantaría ahorrarte tiempo, pero si te doy la respuesta directa te quitaría la oportunidad de entrenar tu mente para el examen! 💪

Vamos a descubrirlo paso a paso. Cuéntame: **¿Qué datos conocidos nos da el enunciado y cuál es la incógnita que nos piden averiguar?**`;
      suggestions = [
        'Los datos son...',
        'No entiendo bien qué significa este dato',
        '¿Qué fórmula podemos usar?'
      ];
    } else if (text.includes('no entiendo') || text.includes('duda') || text.includes('dificil') || text.includes('difícil')) {
      reply = `Es completamente normal dudar, ¡así es exactamente como se construye el aprendizaje significativo! 🧠✨

Para abordar ${subject}, descompongamos el problema en partes más pequeñas. ¿Qué parte del concepto te resulta más clara hasta ahora y en cuál sientes que te quedas atascado?`;
      suggestions = [
        'Entiendo la teoría pero me cuesta aplicarlo',
        '¿Puedes darme una pista visual o ejemplo?',
        'Creo que el primer paso es identificar las variables'
      ];
    } else {
      reply = `¡Excelente razonamiento! Estás conectando muy bien las ideas en **${subject}**.

Siguiendo esa lógica: si aplicas eso al siguiente paso, **¿qué crees que ocurriría con el resultado final?** Intenta formular tu hipótesis antes de comprobarla.`;
      suggestions = [
        'Creo que aumentaría proporcionalmente',
        '¿Podría haber una excepción a esa regla?',
        'Quiero comprobarlo con otro ejemplo práctico'
      ];
    }

    return {
      id: `msg_${Date.now()}`,
      role: 'tutor',
      content: reply,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isSocraticQuestion: true,
      suggestedPrompts: suggestions
    };
  }

  private extractSuggestedPrompts(_content: string, subject: string): string[] {
    return [
      `¿Cómo se relaciona esto con ${subject}?`,
      'Quiero intentar resolver el siguiente paso',
      'Dame una analogía de la vida real'
    ];
  }
}

export const aiClientService = new AIClientService();
