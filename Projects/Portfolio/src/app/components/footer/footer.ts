import { Component, computed, inject } from '@angular/core';
import { GitHubComponent } from '@icons/footer/github';
import { GmailComponent } from '@icons/footer/gmail';
import { LinkedInComponent } from '@icons/footer/linkedin';
import { LANGUAGE } from '@lenguages/translates.consts';
import { TranslateService } from '@lenguages/translate.service';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-footer',
  imports: [GitHubComponent, GmailComponent, LinkedInComponent],
  templateUrl: './footer.html',
})
export class FooterComponent {
  private language = inject(TranslateService);
  constructor(private viewportScroller: ViewportScroller) {}

  translate = computed(() => LANGUAGE[this.language.lang()].footer);

  scrollTop() {
    this.viewportScroller.scrollToPosition([0, 0]);
  }
}
