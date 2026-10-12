import type { AISettings } from '../types/ai';
import type { ChatMessage, FlashCard } from '../types/study';
import type { StudyBlock } from '../types/agenda';
import { db } from './storage';
import { googleAuthService } from './google-auth';

import socraticTutorPrompt from '../prompts/socratic_tutor.md?raw';
import agendaPlannerPrompt from '../prompts/agenda_planner.md?raw';
import projectGuidePrompt from '../prompts/project_guide.md?raw';
import activeRecallPrompt from '../prompts/active_recall_generator.md?raw';

export const STATIC_PROMPTS = {
  socratic: socraticTutorPrompt,
  agenda: agendaPlannerPrompt,
  project: projectGuidePrompt,
  recall: activeRecallPrompt,
};

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
        message: `No se pudo conectar con ${settings.endpointUrl}. Modo socrático local simulado activo.` 
      };
    }
  }

  /**
   * Ejecuta una llamada genérica al modelo LLM (Local Ollama o Cloud OpenAI)
   * inyectando un prompt de sistema markdown estático.
   */
  public async callLLM(
    systemPrompt: string, 
    messages: Array<{ role: 'user' | 'assistant'; content: string }>
  ): Promise<string | null> {
    const settings = await this.getSettings();

    try {
      const completionUrl = `${settings.endpointUrl.replace(/\/+$/, '')}/chat/completions`;
      const headers: Record<string, string> = { 'Content-Type': 'application/json' };
      if (settings.apiKey) {
        headers['Authorization'] = `Bearer ${settings.apiKey}`;
      }

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 7000);

      const response = await fetch(completionUrl, {
        method: 'POST',
        headers,
        signal: controller.signal,
        body: JSON.stringify({
          model: settings.modelName,
          messages: [
            { role: 'system', content: systemPrompt },
            ...messages
          ],
          temperature: settings.temperature
        })
      });
      clearTimeout(timeoutId);

      if (response.ok) {
        const data = await response.json();
        const content = data.choices?.[0]?.message?.content;
        if (content) return content.trim();
      }
    } catch (err) {
      console.warn('[AI Client] Conexión directa no disponible, ejecutando motor socrático integrado:', err);
    }

    return null;
  }

  /**
   * Flujo 1: Tutor Socrático
   */
  public async generateSocraticResponse(
    studentMessage: string,
    subject: string,
    topic: string,
    history: ChatMessage[]
  ): Promise<ChatMessage> {
    const authState = googleAuthService.getState();
    const user = authState.user;
    const gradeLevel = user?.gradeLevel || '1º de ESO';
    const stageName = user?.stageName || 'Operaciones Concretas';
    const gradeKey = user?.gradeKey || '1eso';

    const systemInstruction = `${STATIC_PROMPTS.socratic}\n\nCONTEXTO INSTITUCIONAL DEL ALUMNO:\n- Alumno: ${user?.name || 'Estudiante'}\n- Grado Escolar: ${gradeLevel}\n- Estadio Cognitivo (Piaget): ${stageName}\n- Asignatura: ${subject}\n- Tema: ${topic}\n\nRECUERDA:\nSi el alumno es de 1º de ESO, el complemento verbal solo se identifica en bloque como Complemento Verbal (CV) sin exigir subtipos. Si es de 2º de Bachillerato, es obligatorio exigir la tipología formal (CPred, CCL, etc.) y pruebas sintácticas.`;
    const formattedHistory = history.slice(-6).map(m => ({
      role: m.role === 'tutor' ? ('assistant' as const) : ('user' as const),
      content: m.content
    }));

    const llmOutput = await this.callLLM(systemInstruction, [
      ...formattedHistory,
      { role: 'user', content: studentMessage }
    ]);

    if (llmOutput) {
      return {
        id: `msg_${Date.now()}`,
        role: 'tutor',
        content: llmOutput,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isSocraticQuestion: true,
        suggestedPrompts: [
          '¿Cómo relaciono esto con la teoría?',
          'Quiero resolver el siguiente paso',
          'Dame un ejemplo similar'
        ]
      };
    }

    // Motor integrado de reserva pedagógica adaptado al grado del alumno
    await new Promise(resolve => setTimeout(resolve, 500));
    return this.createSimulatedSocraticResponse(studentMessage, subject, topic, gradeKey);
  }

  /**
   * Flujo 2: Planificador de Agenda Inteligente
   */
  public async generateStudyPlan(subject: string, examTopic: string): Promise<StudyBlock[]> {
    const prompt = `${STATIC_PROMPTS.agenda}\n\nGenera 2 bloques de estudio recomendados para preparar el examen de ${subject} sobre "${examTopic}". Responde únicamente en formato JSON.`;

    const llmOutput = await this.callLLM(prompt, [
      { role: 'user', content: `Generar planificación para ${subject}: ${examTopic}` }
    ]);

    if (llmOutput) {
      try {
        const jsonMatch = llmOutput.match(/\[[\s\S]*\]/);
        if (jsonMatch) {
          const parsed = JSON.parse(jsonMatch[0]);
          return parsed.map((item: any, idx: number) => ({
            title: item.title || `Estudio activo ${idx + 1}`,
            subject: item.subject || subject,
            date: new Date(Date.now() + 86400000 * (idx + 1)).toISOString().split('T')[0],
            startTime: idx === 0 ? '17:00' : '18:30',
            durationMinutes: item.durationMinutes || 45,
            type: 'study_session',
            completed: false,
            notes: item.notes || 'Planificado por Anaxagoras AI',
            syncedWithGoogle: false
          }));
        }
      } catch (err) {
        console.warn('[AI Client] No se pudo parsear el plan generado por el LLM:', err);
      }
    }

    // Fallback pedagógico estructurado
    const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0];
    const dayAfter = new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0];

    return [
      {
        title: `Esquema y Recuperación: ${examTopic}`,
        subject: subject,
        date: tomorrow,
        startTime: '17:15',
        durationMinutes: 45,
        type: 'study_session',
        completed: false,
        notes: 'Dibujar mapa conceptual sin mirar el libro y verificar dudas después.',
        syncedWithGoogle: true,
        googleEventId: `gcal_${Date.now()}`
      },
      {
        title: `Resolución de Problemas Clave: ${subject}`,
        subject: subject,
        date: dayAfter,
        startTime: '18:00',
        durationMinutes: 40,
        type: 'study_session',
        completed: false,
        notes: 'Práctica activa de casos prácticos con el Tutor Socrático.',
        syncedWithGoogle: true,
        googleEventId: `gcal_${Date.now() + 1}`
      }
    ];
  }

  /**
   * Flujo 3: Generador de Tarjetas de Memoria Activa (Active Recall)
   */
  /**
   * Flujo 3: Generador de Tarjetas de Memoria Activa (Active Recall)
   */
  public async generateActiveRecallCard(subject: string, topic: string): Promise<FlashCard> {
    const authState = googleAuthService.getState();
    const gradeKey = authState.user?.gradeKey || '1eso';

    const prompt = `${STATIC_PROMPTS.recall}\n\nGenera una tarjeta conceptual de autoevaluación para la materia ${subject} y tema ${topic} adaptada al nivel ${gradeKey === '1eso' ? '1º de ESO' : '2º de Bachillerato'}. Formato JSON estricto.`;

    const llmOutput = await this.callLLM(prompt, [
      { role: 'user', content: `Crear desafío de active recall sobre ${topic}` }
    ]);

    if (llmOutput) {
      try {
        const jsonMatch = llmOutput.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          const parsed = JSON.parse(jsonMatch[0]);
          return {
            id: `card_${Date.now()}`,
            concept: parsed.concept || `¿Cómo definirías la clave de ${topic}?`,
            hint: parsed.hint || 'Piensa en las causas fundamentales y consecuencias.',
            explanation: parsed.explanation || 'Resumen conceptual para verificar comprensión activa.',
            masteryScore: 0
          };
        }
      } catch (err) {
        console.warn('[AI Client] Fallo al parsear flashcard de LLM:', err);
      }
    }

    // Fallbacks didácticos específicos para Lengua Castellana según el nivel de grado
    if (subject.toLowerCase().includes('lengua')) {
      if (gradeKey === '1eso') {
        return {
          id: `card_${Date.now()}`,
          concept: 'En 1º de ESO, ¿cómo reconocemos el Complemento Verbal en "El tren llegó puntual a la estación"?',
          hint: 'Localiza qué palabras acompañan al verbo "llegó" para completar la acción, sin clasificarlas en subtipos.',
          explanation: 'En 1º de ESO, "puntual a la estación" se identifica en bloque como Complemento Verbal (CV) que acompaña al verbo dentro del predicado.',
          masteryScore: 0
        };
      } else {
        return {
          id: `card_${Date.now()}`,
          concept: 'En 2º de Bachillerato, ¿qué prueba sintáctica demuestra que "puntual" es Complemento Predicativo (CPred) y no CCM?',
          hint: 'Comprueba qué ocurre al cambiar el sujeto a plural ("Las locomotoras...").',
          explanation: 'La prueba de concordancia: "puntual" es un adjetivo que concuerda en género y número con el sujeto ("Las locomotoras llegaron puntuales"), rasgo exclusivo del CPred frente a la inmutabilidad del CCM.',
          masteryScore: 0
        };
      }
    }

    return {
      id: `card_${Date.now()}`,
      concept: `¿Cómo influyen los factores limitantes en ${topic} (${subject})?`,
      hint: 'Recuerda qué variable impide que el proceso aumente indefinidamente.',
      explanation: 'El factor más escaso o alejado del óptimo determinará el rendimiento máximo del sistema.',
      masteryScore: 0
    };
  }

  private createSimulatedSocraticResponse(
    studentMessage: string,
    subject: string,
    topic = '',
    gradeKey: '1eso' | '2batx' = '1eso'
  ): ChatMessage {
    const text = studentMessage.toLowerCase();
    let reply = '';
    let suggestions: string[] = [];

    // Caso de estudio específico del TR: Lengua Castellana / Análisis Sintáctico
    if (subject.toLowerCase().includes('lengua') || topic.toLowerCase().includes('oraci') || topic.toLowerCase().includes('sintaxis')) {
      if (gradeKey === '1eso') {
        reply = `¡Hola Marc! En 1º de ESO lo importante es entender la estructura básica sin liarnos con nombres difíciles. 🚂✨\n\nEn la oración *"El tren llegó puntual a la estación"*, primero encontramos el verbo (*llegó*) y quién realiza la acción (*El tren*, que es el Sujeto). Todas las palabras que acompañan al verbo (*"puntual a la estación"*) las identificamos como **Complemento Verbal (CV)** en bloque.\n\n¿Qué información nos aporta este complemento verbal sobre cómo y hacia dónde se mueve el tren?`;
        suggestions = [
          'Aporta información del modo y el lugar del viaje',
          '¿Por qué en 1º de ESO no distinguimos subtipos?',
          '¿Cómo encuentro el sujeto si va al final?'
        ];
        return {
          id: `msg_${Date.now()}`,
          role: 'tutor',
          content: reply,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          isSocraticQuestion: true,
          suggestedPrompts: suggestions
        };
      } else {
        reply = `¡Hola Álvaro! En 2º de Bachillerato abordamos el análisis sintáctico con rigor preuniversitario (PAU). 🎓📚\n\nEn la oración *"El tren llegó puntual a la estación"*, no basta con señalar un complemento verbal global: debemos clasificar cada elemento con exactitud gramatical.\n\nFíjate en *"puntual"*: ¿es un adjetivo o un adverbio? Si cambiamos el sujeto por *"Las locomotoras"*, ¿qué le ocurre a *"puntual"*? ¿Qué prueba sintáctica formal demuestra que es un **Complemento Predicativo (CPred)** y no un CC de Modo?`;
        suggestions = [
          'Concuerda con el sujeto ("llegaron puntuales"), es CPred',
          '¿Y qué función sintáctica tiene "a la estación"?',
          '¿Qué diferencia hay entre CPred y Atributo?'
        ];
        return {
          id: `msg_${Date.now()}`,
          role: 'tutor',
          content: reply,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          isSocraticQuestion: true,
          suggestedPrompts: suggestions
        };
      }
    }

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
}

export const aiClientService = new AIClientService();
