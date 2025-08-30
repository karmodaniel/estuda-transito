import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PlacaFacadeService } from '../../../abstraction/placa-facade.service';
import { Placa } from '../../../domain/model/placa';
import { PlacaCardComponent } from '@shared/presentation/component/placa-card.component';

@Component({
  selector: 'app-placas-page',
  templateUrl: './placas-page.component.html',
  styleUrls: ['./placas-page.component.less'],
  standalone: true,
  imports: [CommonModule, FormsModule, PlacaCardComponent],
})
export class PlacasPageComponent implements OnInit {
  private readonly placaFacadeService = inject(PlacaFacadeService);

  // Signals para estado do componente
  readonly placas = signal<Placa[]>([]);
  readonly placasFiltradas = signal<Placa[]>([]);
  readonly categorias = signal<{ codigo: string; nome: string }[]>([]);
  readonly categoriaSelecionada = signal<string>('');
  readonly termoBusca = signal<string>('');
  readonly modoVisualizacao = signal<'grid' | 'lista'>('grid');

  // Computed para total de placas
  readonly totalPlacas = computed(() => this.placas().length);

  ngOnInit(): void {
    this.carregarDados();
  }

  private carregarDados(): void {
    // Carregar placas
    this.placaFacadeService.carregarPlacas().subscribe((placas: Placa[]) => {
      this.placas.set(placas);
      this.placasFiltradas.set(placas);
    });

    // Carregar categorias
    this.placaFacadeService
      .obterCategorias()
      .subscribe((categorias: any[]) => {
        this.categorias.set(categorias);
      });
  }

  onCategoriaChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.categoriaSelecionada.set(target.value);
    this.filtrarPlacas();
  }

  onTermoBuscaChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.termoBusca.set(target.value);
    this.filtrarPlacas();
  }

  private filtrarPlacas(): void {
    const categoria = this.categoriaSelecionada();
    const termo = this.termoBusca().toLowerCase();

    let placasFiltradas = this.placas();

    // Filtrar por categoria
    if (categoria) {
      placasFiltradas = placasFiltradas.filter(
        (placa) => placa.obterCategoria() === categoria
      );
    }

    // Filtrar por termo de busca
    if (termo) {
      placasFiltradas = placasFiltradas.filter(
        (placa) =>
          placa.obterNome().toLowerCase().includes(termo) ||
          placa.obterDescricao().toLowerCase().includes(termo)
      );
    }

    this.placasFiltradas.set(placasFiltradas);
  }

  limparFiltros(): void {
    this.categoriaSelecionada.set('');
    this.termoBusca.set('');
    this.placasFiltradas.set(this.placas());
  }

  alternarModoVisualizacao(): void {
    this.modoVisualizacao.update((modo) =>
      modo === 'grid' ? 'lista' : 'grid'
    );
  }

  onPlacaClick(placa: Placa): void {
    console.log('Placa clicada para estudo:', placa.obterNome());
    // Aqui você pode implementar a lógica para mostrar detalhes da placa
    // Por exemplo, abrir um modal com informações detalhadas
  }
}
