import type { AISettings } from '../types/ai';
import type { ChatMessage, FlashCard } from '../types/study';
import type { StudyBlock, AgendaStats, PlanDialogMessage } from '../types/agenda';
import { db } from './storage';
import { googleAuthService } from './google-auth';

import { promptOrchestratorService } from './prompt-orchestrator';

import socraticTutorPrompt from '../prompts/nivel_1_funcional/socratic_tutor.md?raw';
import agendaPlannerPrompt from '../prompts/nivel_1_funcional/agenda_planner.md?raw';
import projectGuidePrompt from '../prompts/nivel_1_funcional/project_guide.md?raw';
import activeRecallPrompt from '../prompts/nivel_1_funcional/active_recall_generator.md?raw';

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
        headers['Authorization'] = `Bearer ${settings.apiKey.trim()}`;
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
        headers['Authorization'] = `Bearer ${settings.apiKey.trim()}`;
      }

      // Sanitizar mensajes para garantizar la alternancia estricta de turnos (user -> assistant -> user)
      // requerida por la API de Gemini (OpenAI compatibility) y evitar errores 400 por roles duplicados consecutivos.
      const sanitizedMessages: Array<{ role: 'user' | 'assistant'; content: string }> = [];
      for (const msg of messages) {
        if (!msg.content || !msg.content.trim()) continue;
        const prev = sanitizedMessages[sanitizedMessages.length - 1];
        if (prev && prev.role === msg.role) {
          // Si tienen el mismo rol y contenido idéntico, ignorar duplicado. Si difieren, concatenar.
          if (prev.content.trim() !== msg.content.trim()) {
            prev.content = `${prev.content}\n\n${msg.content.trim()}`;
          }
        } else {
          sanitizedMessages.push({
            role: msg.role,
            content: msg.content.trim()
          });
        }
      }

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000); // 30s timeout para LLMs remotos/locales

      const response = await fetch(completionUrl, {
        method: 'POST',
        headers,
        signal: controller.signal,
        body: JSON.stringify({
          model: settings.modelName,
          messages: [
            { role: 'system', content: systemPrompt },
            ...sanitizedMessages
          ],
          temperature: settings.temperature
        })
      });
      clearTimeout(timeoutId);

      if (response.ok) {
        const data = await response.json();
        const content = data.choices?.[0]?.message?.content;
        if (content) return content.trim();
      } else {
        const errDetails = await response.text();
        console.error(`[AI Client] Error HTTP ${response.status} (${response.statusText}) en ${completionUrl}:`, errDetails);
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
    history: ChatMessage[],
    activityId?: string
  ): Promise<ChatMessage> {
    const authState = googleAuthService.getState();
    const user = authState.user;
    const gradeKey = user?.gradeKey || '1eso';

    // 1. Orquestación Dinámica del Prompt combinando los 4 niveles:
    //    Nivel 1 (Funcional Socrático) + Nivel 3 (Regulador LOMLOE / Ética) + Nivel 2.A (Línea Base Temática) + Nivel 2.B (Foco Actividad y Variación)
    const assembled = promptOrchestratorService.assemblePrompt({
      role: 'socratic',
      gradeKey,
      subject,
      topicId: topic.startsWith('topic_') || topic.startsWith('t_') ? topic : undefined,
      activityId
    });

    const systemInstruction = assembled.systemInstruction;

    // Si el último mensaje del historial ya es el mensaje actual del alumno (porque la vista lo añadió para la UI),
    // lo excluimos del historial previo para no duplicarlo al añadir { role: 'user', content: studentMessage }.
    const priorHistory = history.filter((m, idx) => {
      if (idx === history.length - 1 && m.role === 'student' && m.content.trim() === studentMessage.trim()) {
        return false;
      }
      return true;
    });

    const formattedHistory = priorHistory.slice(-6).map(m => ({
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
   * Flujo 2: Planificador de Agenda Inteligente y Diagnóstico de Tiempo
   */
  public calculateAgendaStats(blocks: StudyBlock[]): AgendaStats {
    const today = new Date().toISOString().split('T')[0];

    // 1. Prioridades Urgentes (Exámenes y Entregas pendientes)
    const urgentPriorities = blocks
      .filter(b => !b.completed && (b.type === 'exam' || b.type === 'assignment_due'))
      .map(b => {
        const diffMs = new Date(b.date).getTime() - new Date(today).getTime();
        const daysLeft = Math.ceil(diffMs / 86400000);
        return {
          title: b.title,
          subject: b.subject,
          date: b.date,
          type: b.type,
          daysLeft
        };
      })
      .sort((a, b) => a.daysLeft - b.daysLeft);

    // 2. Distribución de la Tarde tras las clases
    const todayBlocks = blocks.filter(b => b.date === today);
    const todayStudyMinutes = todayBlocks
      .filter(b => !b.completed && b.type !== 'class')
      .reduce((acc, b) => acc + (b.durationMinutes || 45), 0);
    
    // Ventana lectiva: clases terminan a las 15:00. Ventana de tarde hasta las 21:30 (390 min)
    const afternoonWindowMinutes = 390;
    const freeTimeMinutes = Math.max(0, afternoonWindowMinutes - todayStudyMinutes);
    const freeTimeHours = Math.round((freeTimeMinutes / 60) * 10) / 10;

    // 3. Balance por Asignatura (minutos de estudio/repaso acumulados o planificados)
    const subjectMap = new Map<string, { minutes: number; count: number }>();
    let totalAllMinutes = 0;
    for (const b of blocks) {
      if (b.type === 'class') continue;
      const mins = b.durationMinutes || 45;
      totalAllMinutes += mins;
      const current = subjectMap.get(b.subject) || { minutes: 0, count: 0 };
      current.minutes += mins;
      current.count += 1;
      subjectMap.set(b.subject, current);
    }

    const subjectBreakdown = Array.from(subjectMap.entries())
      .map(([subject, data]) => ({
        subject,
        minutes: data.minutes,
        blockCount: data.count,
        percentage: totalAllMinutes > 0 ? Math.round((data.minutes / totalAllMinutes) * 100) : 0
      }))
      .sort((a, b) => b.minutes - a.minutes);

    // 4. Avance de Deberes y Entregas
    const homeworkBlocks = blocks.filter(b => b.type === 'assignment_due');
    const completedHomework = homeworkBlocks.filter(b => b.completed).length;
    const totalHomework = homeworkBlocks.length;
    const homeworkPercentage = totalHomework > 0 ? Math.round((completedHomework / totalHomework) * 100) : 100;

    return {
      urgentPriorities,
      afternoonDistribution: {
        classesEndTime: '15:00',
        todayStudyMinutes,
        freeTimeHours,
        totalBlocksToday: todayBlocks.length
      },
      subjectBreakdown,
      homeworkProgress: {
        completed: completedHomework,
        total: totalHomework,
        percentage: homeworkPercentage
      }
    };
  }

  public async generatePlanificationDialogue(
    currentBlocks: StudyBlock[],
    userInstruction?: string,
    history?: PlanDialogMessage[]
  ): Promise<{ message: string; suggestedBlocks: StudyBlock[] }> {
    const stats = this.calculateAgendaStats(currentBlocks);
    const auth = googleAuthService.getState();
    const studentName = auth.user?.name || 'Estudiante';
    const gradeLevel = auth.user?.gradeLevel || '1º de ESO';
    const gradeKey = auth.user?.gradeKey || '1eso';
    const today = new Date().toISOString().split('T')[0];

    const systemPrompt = `
${STATIC_PROMPTS.agenda}

Eres el tutor socrático y mentor de gestión del tiempo de Anaxagoras AI para ${studentName} (${gradeLevel}).
Tu objetivo es analizar la situación real del estudiante con base en los datos de su agenda local en IndexedDB y presentarle un resumen conversacional muy claro:
1. 🎯 Prioridades Clave: Cuáles son los exámenes y entregas más urgentes.
2. ⏱️ Distribución de la Tarde: Explicar cómo queda su tiempo tras salir del instituto a las 15:00, asegurando que su tiempo libre para descansar, deporte y familia esté protegido.
3. 📊 Balance por Asignatura: Si hay materias con examen cercano que necesitan más atención o si hay desequilibrios.
4. 📝 Avance de Deberes: Cuántas tareas ha completado y qué falta.
5. 🔄 Flexibilidad y Ajustes: Atender de forma entusiasta y adaptativa peticiones del alumno (ej. si el profesor ha pospuesto una tarea, o si le pide hacer otra cosa antes).

Responde siempre en español, con un tono motivador, empático y estructurado en párrafos breves. Termina siempre con una pregunta reflexiva orientada a si desea confirmar la propuesta o hacer algún cambio.
Si propones o modificas bloques de estudio, incluye al final de tu respuesta un bloque JSON con los bloques recomendados:
\`\`\`json
[
  {
    "title": "...",
    "subject": "...",
    "date": "YYYY-MM-DD",
    "startTime": "HH:mm",
    "durationMinutes": 45,
    "type": "study_session",
    "notes": "..."
  }
]
\`\`\`
`.trim();

    const statsContext = `
DATOS DE LA AGENDA DE ${studentName.toUpperCase()}:
- Prioridades urgentes:
${stats.urgentPriorities.map(p => `  • [${p.type === 'exam' ? 'Examen' : 'Entrega'}] ${p.subject}: "${p.title}" (${p.daysLeft === 0 ? '¡Hoy!' : p.daysLeft === 1 ? 'Mañana' : `en ${p.daysLeft} días`})`).join('\n') || '  • No hay hitos inmediatos'}
- Tarde post-clases (Hoy): Fin de clases a las 15:00. Estudio planificado: ${stats.afternoonDistribution.todayStudyMinutes} min. Tiempo libre protegido: ${stats.afternoonDistribution.freeTimeHours} h.
- Balance por asignaturas: ${stats.subjectBreakdown.map(s => `${s.subject}: ${s.minutes} min (${s.percentage}%)`).join(', ') || 'Sin bloques'}
- Avance de deberes: ${stats.homeworkProgress.completed}/${stats.homeworkProgress.total} completados (${stats.homeworkProgress.percentage}%).
${userInstruction ? `MENSAJE DEL ALUMNO: "${userInstruction}"` : '(El alumno abre el planificador para revisar su organización personal y recibir recomendaciones)'}
`.trim();

    const messages: Array<{ role: 'user' | 'assistant'; content: string }> = [
      ...(history || []).map(h => ({
        role: (h.role === 'assistant' ? 'assistant' : 'user') as 'user' | 'assistant',
        content: h.content
      })),
      { role: 'user', content: statsContext }
    ];

    const llmOutput = await this.callLLM(systemPrompt, messages);

    if (llmOutput) {
      let suggested = this.createDefaultSuggestedBlocks(currentBlocks, stats, userInstruction, gradeKey);
      try {
        const jsonMatch = llmOutput.match(/```json\s*([\s\S]*?)\s*```/) || llmOutput.match(/\[[\s\S]*\]/);
        if (jsonMatch) {
          const parsed = JSON.parse(jsonMatch[1] || jsonMatch[0]);
          if (Array.isArray(parsed) && parsed.length > 0) {
            suggested = parsed.map((item: any) => ({
              title: item.title || 'Sesión de estudio activo',
              subject: item.subject || 'General',
              date: item.date || today,
              startTime: item.startTime || '17:00',
              durationMinutes: item.durationMinutes || 45,
              type: item.type || 'study_session',
              completed: false,
              notes: item.notes || 'Planificado por Anaxagoras AI',
              gradeKey,
              syncedWithGoogle: false
            }));
          }
        }
      } catch (err) {
        console.warn('[AI Client] No se pudo parsear JSON del planificador LLM:', err);
      }

      const cleanMessage = llmOutput.replace(/```json[\s\S]*?```/, '').trim();
      return {
        message: cleanMessage,
        suggestedBlocks: suggested
      };
    }

    // Fallback pedagógico socrático estructurado adaptado al perfil del alumno
    return this.createSimulatedPlanificationResponse(currentBlocks, stats, studentName, gradeLevel, gradeKey, userInstruction);
  }

  public createDefaultSuggestedBlocks(
    _currentBlocks: StudyBlock[],
    _stats: AgendaStats,
    userInstruction?: string,
    gradeKey: '1eso' | '2batx' = '1eso'
  ): StudyBlock[] {
    const today = new Date().toISOString().split('T')[0];
    const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0];
    const inTwoDays = new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0];
    const text = (userInstruction || '').toLowerCase();

    // Detección de peticiones de posposición o retraso de tareas
    const isPostponing = text.includes('retras') || text.includes('posp') || text.includes('profe') || text.includes('aplaza');
    const isRestNeeded = text.includes('descans') || text.includes('libre') || text.includes('cansad') || text.includes('menos');
    const mentionsMates = text.includes('mate') || text.includes('cálculo');
    const mentionsLengua = text.includes('lengua') || text.includes('sintaxis');

    const duration = isRestNeeded ? 30 : 45;

    if (gradeKey === '1eso') {
      return [
        {
          title: mentionsLengua || isPostponing
            ? 'Práctica de Oraciones: Sujeto y Predicado en Bloque'
            : 'Repaso Activo: Ciencias Naturales (Ecosistemas)',
          subject: mentionsLengua || isPostponing ? 'Lengua Castellana' : 'Ciencias Naturales',
          date: isPostponing ? tomorrow : today,
          startTime: '17:15',
          durationMinutes: duration,
          type: 'study_session',
          completed: false,
          notes: isPostponing 
            ? '📅 Tarea reprogramada respetando el aviso del profesor.' 
            : 'Hacer mapa visual de 1 página sin mirar el libro.',
          gradeKey: '1eso',
          syncedWithGoogle: false
        },
        {
          title: mentionsMates
            ? 'Fracciones Básicas: Resolución de 4 Ejercicios'
            : 'Ciencias Sociales: Mesopotamia y Egipto (Línea de Tiempo)',
          subject: mentionsMates ? 'Matemáticas' : 'Ciencias Sociales',
          date: isPostponing ? inTwoDays : tomorrow,
          startTime: '18:15',
          durationMinutes: duration,
          type: 'study_session',
          completed: false,
          notes: 'Preparación espaciada para asentar conceptos antes del examen.',
          gradeKey: '1eso',
          syncedWithGoogle: false
        }
      ];
    } else {
      return [
        {
          title: mentionsMates || isPostponing
            ? 'Matemáticas II: Discusión de Sistemas de Cramer con Parámetro'
            : 'Filosofía: Cuadro Comparativo Platón vs Descartes (PAU)',
          subject: mentionsMates || isPostponing ? 'Matemáticas II' : 'Filosofía',
          date: isPostponing ? tomorrow : today,
          startTime: '17:00',
          durationMinutes: isRestNeeded ? 40 : 50,
          type: 'study_session',
          completed: false,
          notes: isPostponing
            ? '📅 Reprogramado según nueva directriz del profesor.'
            : 'Redacción de síntesis conceptual para la prueba de Selectividad.',
          gradeKey: '2batx',
          syncedWithGoogle: false
        },
        {
          title: 'Lengua Castellana: Pruebas de Concordancia de CPred (PAU)',
          subject: 'Lengua Castellana',
          date: inTwoDays,
          startTime: '18:15',
          durationMinutes: isRestNeeded ? 40 : 50,
          type: 'study_session',
          completed: false,
          notes: 'Análisis de 3 oraciones de exámenes PAU de convocatorias anteriores.',
          gradeKey: '2batx',
          syncedWithGoogle: false
        }
      ];
    }
  }

  private createSimulatedPlanificationResponse(
    currentBlocks: StudyBlock[],
    stats: AgendaStats,
    studentName: string,
    gradeLevel: string,
    gradeKey: '1eso' | '2batx',
    userInstruction?: string
  ): { message: string; suggestedBlocks: StudyBlock[] } {
    const suggested = this.createDefaultSuggestedBlocks(currentBlocks, stats, userInstruction, gradeKey);
    const text = (userInstruction || '').toLowerCase();
    const nextUrgent = stats.urgentPriorities[0];
    const topSubject = stats.subjectBreakdown[0];

    let message = '';

    if (text.includes('retras') || text.includes('posp') || text.includes('profe')) {
      message = `¡Comprendido, ${studentName}! 🤝 He reorganizado tu planificación tras el cambio de fecha que te indicó el profesor.\n\n` +
        `• **Ajuste aplicado:** Hemos retrasado la entrega y reubicado el bloque de repaso para que no se te acumule con otras asignaturas.\n` +
        `• **Tu tarde protegida:** Hoy mantendrás **${stats.afternoonDistribution.freeTimeHours} horas libres** después de clases (15:00) para desconectar y hacer deporte.\n` +
        `• **Prioridad activa:** Tu foco principal sigue siendo ${nextUrgent ? `el examen de **${nextUrgent.subject}** (${nextUrgent.title}) en ${nextUrgent.daysLeft} días` : 'mantener un ritmo espaciado'}.\n\n` +
        `¿Te parece bien cómo queda la propuesta de bloques para guardarla en tu base de datos local (IndexedDB)?`;
    } else {
      message = `¡Hola, ${studentName}! Aquí tienes el análisis de tu tiempo y hábitos de estudio para **${gradeLevel}**:\n\n` +
        `🎯 **1. Qué es más prioritario hoy:**\n` +
        (nextUrgent
          ? `Lo más urgente es **${nextUrgent.subject}**: *"${nextUrgent.title}"*, que vence ${nextUrgent.daysLeft === 0 ? '¡hoy mismo!' : nextUrgent.daysLeft === 1 ? 'mañana' : `en ${nextUrgent.daysLeft} días`}. Conviene dedicarle un bloque corto antes de dispersarte.\n\n`
          : `No tienes exámenes en las próximas 48 horas, lo cual es ideal para trabajar con calma y técnica de práctica espaciada.\n\n`) +
        `⏱️ **2. Distribución de tu tiempo esta tarde:**\n` +
        `Tus clases lectivas finalizan a las 15:00. Te he programado **${stats.afternoonDistribution.todayStudyMinutes > 0 ? `${stats.afternoonDistribution.todayStudyMinutes} minutos` : '45 minutos'} de estudio activo**, lo que te deja **${stats.afternoonDistribution.freeTimeHours} horas de tiempo libre garantizado** para descansar, deporte y tus aficiones. ¡El cerebro necesita descanso para consolidar la memoria a largo plazo! 💪\n\n` +
        `📊 **3. Balance por asignaturas:**\n` +
        (topSubject
          ? `La materia con más tiempo acumulado es **${topSubject.subject}** (${topSubject.minutes} min). ${stats.subjectBreakdown.length > 1 ? `Recomiendo alternar con materias que llevan menos minutos (${stats.subjectBreakdown[stats.subjectBreakdown.length - 1].subject}) para entrenar el entrelazado cognitivo.` : ''}\n\n`
          : `Aún no hay suficiente historial de minutos registrados esta semana.\n\n`) +
        `📝 **4. Avance de tus deberes:**\n` +
        `Llevas completados el **${stats.homeworkProgress.percentage}% de tus entregas** (${stats.homeworkProgress.completed} de ${stats.homeworkProgress.total}).\n\n` +
        `Revisa abajo los bloques sugeridos. Puedes **posponer cualquier tarea si el profe te ha dado más días**, cambiar duraciones o pedirme ajustes escribiéndome aquí abajo. ¿Guardamos esta distribución en tu agenda personal?`;
    }

    return {
      message,
      suggestedBlocks: suggested
    };
  }

  public async generateStudyPlan(_subject: string, _examTopic: string): Promise<StudyBlock[]> {
    const auth = googleAuthService.getState();
    const gradeKey = auth.user?.gradeKey || '1eso';
    const stats = this.calculateAgendaStats([]);
    return this.createDefaultSuggestedBlocks([], stats, undefined, gradeKey);
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
