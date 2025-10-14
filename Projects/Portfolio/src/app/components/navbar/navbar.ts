import { NgClass, ViewportScroller } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { TranslateService } from '@lenguages/translate.service';
import { LANGUAGE } from '@lenguages/translates.consts';

@Component({
  selector: 'app-navbar',
  imports: [NgClass],
  templateUrl: './navbar.html',
})
export class NavbarComponent {
  language = inject(TranslateService);
  translate = computed(() => LANGUAGE[this.language.lang()].navbar);
  activeLink: string = 'home';
  menuOpen: boolean = false;

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  onChange(event: Event) {
    const select = event.target as HTMLSelectElement;
    this.language.switchLang(select.value as 'es' | 'en');
  }

  constructor(private viewportScroller: ViewportScroller) {}

  scrollTo(section: string) {
    this.activeLink = section;
    this.viewportScroller.scrollToAnchor(section);
    this.menuOpen = false;
  }

  scrollTop() {
    this.activeLink = 'home';
    this.viewportScroller.scrollToPosition([0, 0]);
    this.menuOpen = false;
  }
}
