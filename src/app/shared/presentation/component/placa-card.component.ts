import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Placa } from '@domain/model/placa';

@Component({
  selector: 'app-placa-card',
  template: `
    <div class="placa-card" (click)="onCardClick()">
      <div class="placa-image">
        <img [src]="placa.obterImagemUrl()" [alt]="placa.obterNome()" />
      </div>
      <div class="placa-info">
        <h3 class="placa-nome">{{ placa.obterNome() }}</h3>
        <p class="placa-codigo">{{ placa.obterCodigo() }}</p>
        <p class="placa-descricao">{{ placa.obterDescricao() }}</p>
        <span class="placa-categoria">{{
          obterNomeCategoria(placa.obterCategoria())
        }}</span>
      </div>
    </div>
  `,
  styles: [
    `
      .placa-card {
        border: 1px solid #ddd;
        border-radius: 8px;
        padding: 16px;
        cursor: pointer;
        transition: all 0.3s ease;
        background: white;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      }

      .placa-card:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
      }

      .placa-image {
        text-align: center;
        margin-bottom: 16px;
      }

      .placa-image img {
        max-width: 100%;
        height: auto;
        border-radius: 4px;
      }

      .placa-info {
        text-align: center;
      }

      .placa-nome {
        margin: 0 0 8px 0;
        font-size: 18px;
        font-weight: 600;
        color: #333;
      }

      .placa-codigo {
        margin: 0 0 8px 0;
        font-size: 14px;
        color: #666;
        font-family: monospace;
      }

      .placa-descricao {
        margin: 0 0 12px 0;
        font-size: 14px;
        color: #555;
        line-height: 1.4;
      }

      .placa-categoria {
        display: inline-block;
        padding: 4px 8px;
        background: #007bff;
        color: white;
        border-radius: 12px;
        font-size: 12px;
        font-weight: 500;
      }
    `,
  ],
  standalone: true,
})
export class PlacaCardComponent {
  @Input() placa!: Placa;
  @Output() cardClick = new EventEmitter<Placa>();

  onCardClick(): void {
    this.cardClick.emit(this.placa);
  }

  obterNomeCategoria(codigo: string): string {
    const categorias: Record<string, string> = {
      A: 'Advertência',
      R: 'Regulamentação',
      I: 'Informação',
      S: 'Sinalização',
    };
    return categorias[codigo] || 'Desconhecida';
  }
}
