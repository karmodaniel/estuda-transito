import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Placa } from '@domain/model/placa';

export interface FiltrosExibicao {
  mostrarNome: boolean;
  mostrarCodigo: boolean;
  mostrarDescricao: boolean;
  mostrarCategoria: boolean;
}

@Component({
  selector: 'app-placa-card',
  template: `
    <div
      class="placa-card"
      [class.modo-lista]="modoVisualizacao === 'lista'"
      [class.modo-grid]="modoVisualizacao === 'grid'"
      (click)="onCardClick()"
    >
      <div class="placa-image">
        <img [src]="placa.obterImagemUrl()" [alt]="placa.obterNome()" />
      </div>
      <div class="placa-info">
        @if (filtrosExibicao?.mostrarNome) {
        <h3 class="placa-nome">{{ placa.obterNome() }}</h3>
        } @if (filtrosExibicao?.mostrarCodigo) {
        <p class="placa-codigo">{{ placa.obterCodigo() }}</p>
        } @if (filtrosExibicao?.mostrarDescricao) {
        <p class="placa-descricao">{{ placa.obterDescricao() }}</p>
        } @if (filtrosExibicao?.mostrarCategoria) {
        <span class="placa-categoria">{{
          obterNomeCategoria(placa.obterCategoria())
        }}</span>
        }
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
        display: flex;
        flex-direction: column;
        margin-bottom: 12px;
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
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 8px;
      }

      .placa-nome {
        margin: 0;
        font-size: 18px;
        font-weight: 600;
        color: #333;
      }

      .placa-codigo {
        margin: 0;
        font-size: 14px;
        color: #666;
        font-family: monospace;
      }

      .placa-descricao {
        margin: 0;
        font-size: 14px;
        color: #555;
        line-height: 1.4;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }

      .placa-categoria {
        display: inline-block;
        padding: 4px 8px;
        background: #007bff;
        color: white;
        border-radius: 12px;
        font-size: 12px;
        font-weight: 500;
        align-self: center;
      }

      /* Estilos para modo lista */
      .placa-card.modo-lista {
        flex-direction: row;
        align-items: center;
        padding: 12px;
        gap: 16px;
        margin-bottom: 12px;
      }

      .placa-card.modo-lista .placa-image {
        margin-bottom: 0;
        flex-shrink: 0;
      }

      .placa-card.modo-lista .placa-image img {
        width: 64px;
        height: 64px;
        object-fit: cover;
      }

      .placa-card.modo-lista .placa-info {
        text-align: left;
        flex: 1;
      }

      /* Estilos para modo grid */
      .placa-card.modo-grid {
        padding: 16px;
        text-align: center;
      }

      .placa-card.modo-grid .placa-image img {
        width: 96px;
        height: 96px;
        object-fit: cover;
      }

      .placa-card.modo-grid .placa-descricao {
        display: none;
      }

      .placa-card.modo-grid:hover .placa-descricao {
        display: block;
      }
    `,
  ],
  standalone: true,
})
export class PlacaCardComponent {
  @Input() placa!: Placa;
  @Input() filtrosExibicao?: FiltrosExibicao;
  @Input() modoVisualizacao: 'grid' | 'lista' = 'grid';
  @Output() cardClick = new EventEmitter<Placa>();

  onCardClick(): void {
    this.cardClick.emit(this.placa);
  }

  obterNomeCategoria(codigo: number): string {
    const categorias: Record<number, string> = {
      1: 'Regulamentação',
      2: 'Advertência',
      3: 'Serviços Auxiliares',
    };
    return categorias[codigo] || 'Desconhecida';
  }
}
