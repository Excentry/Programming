import { Component, computed, inject } from '@angular/core';
import { TranslateService } from '@lenguages/translate.service';
import { LANGUAGE } from '@lenguages/translates.consts';
import {
  HTML5Component,
  CSSComponent,
  JavaScriptComponent,
  TypeScriptComponent,
  ReactComponent,
} from '@icons/skills/frontend/frontendIcons';
import { SupabaseComponent } from '@icons/skills/backend/supabase';
@Component({
  selector: 'projects-page',
  templateUrl: 'projects-page.html',
  imports: [
    SupabaseComponent,
    HTML5Component,
    CSSComponent,
    JavaScriptComponent,
    TypeScriptComponent,
    ReactComponent,
  ],
})
export class ProjectsPageComponent {
  private language = inject(TranslateService);

  translate = computed(() => LANGUAGE[this.language.lang()].body.projects);
}
