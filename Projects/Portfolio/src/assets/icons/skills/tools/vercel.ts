import { Component, Input } from '@angular/core';

@Component({
  selector: 'svg-Vercel',
  standalone: true,
  template: `
    <svg
      viewBox="0 0 256 222"
      preserveAspectRatio="xMidYMid"
      [attr.width]="size.width"
      [attr.height]="size.height"
    >
      <title>Vercel</title>
      <path fill="#fff" d="m128 0 128 221.705H0z" />
    </svg>
  `,
})
export class VercelComponent {
  @Input() size: { width: number; height: number } = { width: 48, height: 48 };
}
