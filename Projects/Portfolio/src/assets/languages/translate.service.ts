import { Injectable, signal, effect } from '@angular/core';

type Lang = 'es' | 'en';

@Injectable({ providedIn: 'root' })
export class TranslateService {
  private readonly supportLangs: Lang[] = ['es', 'en'];

  lang = signal<Lang>(this.getLang());

  constructor() {
    effect(() => {
      document.documentElement.lang = this.lang();
    });
  }

  private getLang(): Lang {
    const save = localStorage.getItem('lang') as Lang | null;

    if (save && this.supportLangs.includes(save)) {
      return save;
    }

    const navegatorLang = navigator.language.split('-')[0] as Lang;

    return this.supportLangs.includes(navegatorLang) ? navegatorLang : 'en';
  }

  switchLang(lang: Lang): void {
    if (!this.supportLangs.includes(lang)) {
      console.warn(`Language: ${lang} not supported.`);
    }

    this.lang.set(lang);
    localStorage.setItem('lang', lang);
  }
}
