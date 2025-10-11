import { Component, computed, inject, signal } from '@angular/core';
import { TranslateService } from '@lenguages/translate.service';
import { LANGUAGE } from '@lenguages/translates.consts';

@Component({
  selector: 'about-page',
  templateUrl: 'about-page.html',
})
export class AboutPageComponent {
  private language = inject(TranslateService);

  name = signal('Brayan Stid Jimenez Arredondo');

  translate = computed(() => LANGUAGE[this.language.lang()].body.about);
}
