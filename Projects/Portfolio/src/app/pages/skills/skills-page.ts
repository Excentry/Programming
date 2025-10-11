import { Component, computed, inject } from '@angular/core';
import {
  HTML5Component,
  CSSComponent,
  SassComponent,
  JavaScriptComponent,
  TypeScriptComponent,
  ReactComponent,
} from '@icons/skills/frontend/frontendIcons';
import { PostgreSQLComponent, SupabaseComponent } from '@icons/skills/backend/backendIcons';
import {
  AngularComponent,
  NodeJSComponent,
  ExpressJSComponent,
  NestJSComponent,
} from '@icons/skills/learning/learningIcons';
import {
  GitComponent,
  GitHubComponent,
  PowerShellComponent,
  VercelComponent,
} from '@icons/skills/tools/toolsIcons';
import { TranslateService } from '@lenguages/translate.service';
import { LANGUAGE } from '@lenguages/translates.consts';

@Component({
  selector: 'skills-page',
  templateUrl: 'skills-page.html',
  imports: [
    HTML5Component,
    CSSComponent,
    SassComponent,
    JavaScriptComponent,
    TypeScriptComponent,
    ReactComponent,
    PostgreSQLComponent,
    SupabaseComponent,
    AngularComponent,
    NodeJSComponent,
    ExpressJSComponent,
    NestJSComponent,
    GitComponent,
    GitHubComponent,
    PowerShellComponent,
    VercelComponent,
  ],
})
export class SkillsPageComponent {
  private language = inject(TranslateService);

  translate = computed(() => LANGUAGE[this.language.lang()].body.skills);
}
