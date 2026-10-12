import type { StudentGrade } from '../types/auth';

import lengua1esoPrompt from '../prompts/curriculares/lengua_castellana_1eso.md?raw';
import lengua2batxPrompt from '../prompts/curriculares/lengua_castellana_2batx.md?raw';

export interface DepartmentalPromptResponse {
  subject: string;
  gradeKey: StudentGrade;
  gradeLevel: string;
  stageName: string;
  promptMarkdown: string;
  institution: string;
  sourceApi: string;
  fetchedAt: string;
}

export class EducationalApiService {
  private readonly INSTITUTION_NAME = "Departament d'Educació de la Generalitat de Catalunya";
  private readonly API_ENDPOINT = 'https://api.educacio.gencat.cat/v1/curriculum/guardrails';

  /**
   * Obtiene la directriz curricular departamental según la asignatura y el grado del alumno conectado.
   * Mockea la API institucional escolar (Esfer@) según la arquitectura planteada en el Treball de Recerca.
   */
  public async getDepartmentalPrompt(
    subject: string,
    gradeKey: StudentGrade
  ): Promise<DepartmentalPromptResponse> {
    // Simulación de latencia de red de la API educativa
    await new Promise((resolve) => setTimeout(resolve, 80));

    const isLengua = subject.toLowerCase().includes('lengua');

    if (isLengua) {
      if (gradeKey === '1eso') {
        return {
          subject: 'Lengua Castellana y Literatura',
          gradeKey: '1eso',
          gradeLevel: '1º de ESO (12 años)',
          stageName: 'Operaciones Concretas / Transición (Piaget)',
          promptMarkdown: lengua1esoPrompt,
          institution: this.INSTITUTION_NAME,
          sourceApi: `${this.API_ENDPOINT}?subject=lengua_castellana&grade=1eso`,
          fetchedAt: new Date().toISOString()
        };
      } else {
        return {
          subject: 'Lengua Castellana y Literatura',
          gradeKey: '2batx',
          gradeLevel: '2º de Bachillerato (17-18 años)',
          stageName: 'Operaciones Formales / Preuniversitario PAU (Piaget)',
          promptMarkdown: lengua2batxPrompt,
          institution: this.INSTITUTION_NAME,
          sourceApi: `${this.API_ENDPOINT}?subject=lengua_castellana&grade=2batx`,
          fetchedAt: new Date().toISOString()
        };
      }
    }

    // Directriz estándar por defecto para otras materias
    const defaultMarkdown = `
# 🏛️ Directriz Curricular: ${subject} (${gradeKey === '1eso' ? '1º de ESO' : '2º de Bachillerato'})
*Fuente: ${this.INSTITUTION_NAME}*

1. **Adaptación de Nivel:** Aplicar el nivel de abstracción correspondiente a ${gradeKey === '1eso' ? '1º de ESO (enfoque guiado y visual)' : '2º de Bachillerato (rigor preuniversitario)'}.
2. **Guardrails Metodológicos:** Fomentar el descubrimiento autónomo y la resolución razonada.
`.trim();

    return {
      subject,
      gradeKey,
      gradeLevel: gradeKey === '1eso' ? '1º de ESO (12 años)' : '2º de Bachillerato (17-18 años)',
      stageName: gradeKey === '1eso' ? 'Operaciones Concretas' : 'Operaciones Formales',
      promptMarkdown: defaultMarkdown,
      institution: this.INSTITUTION_NAME,
      sourceApi: `${this.API_ENDPOINT}?subject=${encodeURIComponent(subject)}&grade=${gradeKey}`,
      fetchedAt: new Date().toISOString()
    };
  }
}

export const educationalApiService = new EducationalApiService();
