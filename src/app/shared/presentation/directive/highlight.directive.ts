import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appHighlight]',
})
export class HighlightDirective implements OnInit {
  @Input() appHighlight: string = '';
  @Input() highlightClass: string = 'highlight';

  constructor(
    private readonly elementRef: ElementRef,
    private readonly renderer: Renderer2
  ) {}

  ngOnInit(): void {
    if (this.appHighlight && this.appHighlight.trim()) {
      this.highlightText();
    }
  }

  private highlightText(): void {
    const element = this.elementRef.nativeElement;
    const text = element.textContent;

    if (!text) return;

    const regex = new RegExp(`(${this.escapeRegExp(this.appHighlight)})`, 'gi');
    const highlightedText = text.replace(
      regex,
      `<span class="${this.highlightClass}">$1</span>`
    );

    this.renderer.setProperty(element, 'innerHTML', highlightedText);
  }

  private escapeRegExp(string: string): string {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }
}
