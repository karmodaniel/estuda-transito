import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { Placa } from '@domain/model/placa';
import { UtilitiesService } from '@shared/services/utilities.service';

@Component({
  selector: 'app-placa-card',
  templateUrl: './placa-card.component.html',
  styleUrls: ['./placa-card.component.less'],
  standalone: true,
  imports: [CommonModule, NzTagModule],
})
export class PlacaCardComponent {
  @Input() placa!: Placa;
  @Input() visualizacao?: any;
  @Input() tamanhoImagem: 'small' | 'medium' | 'large' = 'medium';
  @Input() modoVisualizacao: 'grid' | 'lista' | 'cards' = 'grid';

  @Output() placaClick = new EventEmitter<Placa>();
  @Output() cardClick = new EventEmitter<Placa>();

  constructor(private utilitiesService: UtilitiesService) {}

  onPlacaClick(): void {
    this.placaClick.emit(this.placa);
    this.cardClick.emit(this.placa);
  }

  onImageError(event: any): void {
    this.utilitiesService.onImageError(event);
  }

  getCategoriaColor(categoria: string): string {
    return this.utilitiesService.getCategoriaColor(categoria);
  }

  getImagemClass(): string {
    switch (this.tamanhoImagem) {
      case 'small':
        return 'placa-img-small';
      case 'large':
        return 'placa-img-large';
      default:
        return 'placa-img-medium';
    }
  }

  getCardClass(): string {
    return `placa-card placa-card-${this.modoVisualizacao}`;
  }

  getNomeCategoria(codigo: string): string {
    if (!codigo || codigo.trim() === '') {
      return 'Não categorizada';
    }

    const categorias: { [key: string]: string } = {
      R: 'Regulamentação',
      A: 'Advertência',
      I: 'Indicação',
      S: 'Serviços',
    };
    return categorias[codigo] || 'Desconhecida';
  }
}
