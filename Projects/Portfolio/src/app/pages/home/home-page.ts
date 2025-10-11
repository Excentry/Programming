import { Component, computed, inject, signal } from '@angular/core';
import { UserImageComponent } from '@icons/main/userImage';
import { TranslateService } from '@lenguages/translate.service';
import { LANGUAGE } from '@lenguages/translates.consts';
import { AboutPageComponent } from '@pages/about/about-page';
import { SkillsPageComponent } from '@pages/skills/skills-page';
import { ProjectsPageComponent } from '@pages/projects/projects-page';
import { calcularSemestreActual } from 'assets/hooks/get-semester';

@Component({
  templateUrl: 'home-page.html',
  imports: [UserImageComponent, AboutPageComponent, SkillsPageComponent, ProjectsPageComponent],
})
export class HomePageComponent {
  private language = inject(TranslateService);

  imageFallback = signal(false);

  imageError() {
    this.imageFallback.set(true);
  }

  translate = computed(() => {
    const text = LANGUAGE[this.language.lang()].body;
    const semestre = calcularSemestreActual(this.language.lang());

    return {
      ...text,
      paragraph: text.paragraph.replace('{ semestre }', semestre.toString()),
    };
  });
}
