import { Component, computed, inject, signal } from '@angular/core';
import { TranslateService } from '@lenguages/translate.service';
import { LANGUAGE } from '@lenguages/translates.consts';
@Component({
  selector: 'projects-page',
  templateUrl: 'projects-page.html',
})
export class ProjectsPageComponent {
  private language = inject(TranslateService);

  translate = computed(() => LANGUAGE[this.language.lang()].body.projects);
}
