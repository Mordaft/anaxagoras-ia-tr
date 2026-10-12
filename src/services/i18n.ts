import i18next from 'i18next';
import type { SupportedLanguage } from '../types/ai';

import es from '../locales/es.json';
import ca from '../locales/ca.json';
import ga from '../locales/ga.json';
import eu from '../locales/eu.json';
import va from '../locales/va.json';

const STORAGE_LANG_KEY = 'anaxagoras_lang';

class I18nService {
  private initialized = false;
  private listeners: Array<(lang: SupportedLanguage) => void> = [];

  public async init(): Promise<void> {
    if (this.initialized) return;

    const savedLang = (localStorage.getItem(STORAGE_LANG_KEY) as SupportedLanguage) || 'es';

    await i18next.init({
      lng: savedLang,
      fallbackLng: 'es',
      debug: false,
      resources: {
        es: { translation: es },
        ca: { translation: ca },
        ga: { translation: ga },
        eu: { translation: eu },
        va: { translation: va }
      },
      interpolation: {
        escapeValue: false
      }
    });

    this.initialized = true;
  }

  public t(key: string, options?: Record<string, any>): string {
    return i18next.t(key, options);
  }

  public async changeLanguage(lang: SupportedLanguage): Promise<void> {
    await i18next.changeLanguage(lang);
    localStorage.setItem(STORAGE_LANG_KEY, lang);
    for (const listener of this.listeners) {
      listener(lang);
    }
  }

  public getCurrentLanguage(): SupportedLanguage {
    return (i18next.language as SupportedLanguage) || 'es';
  }

  public subscribe(callback: (lang: SupportedLanguage) => void): () => void {
    this.listeners.push(callback);
    return () => {
      this.listeners = this.listeners.filter(l => l !== callback);
    };
  }
}

export const i18n = new I18nService();
export const t = (key: string, options?: Record<string, any>) => i18n.t(key, options);
