import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PlacaFacadeService } from '../../../abstraction/placa-facade.service';
import { Placa } from '../../../domain/model/placa';
import { PlacaCardComponent } from '@shared/presentation/component/placa-card.component';
import {
  CategoriaPlacaEnum,
  CATEGORIAS_PLACAS,
} from '../../../domain/enum/categoria-placa.enum';

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
  readonly categorias = signal<{ codigo: number; nome: string }[]>([]);
  readonly categoriaSelecionada = signal<number | null>(null);
  readonly termoBusca = signal<string>('');
  readonly modoVisualizacao = signal<'grid' | 'lista'>('grid');

  // Filtros de exibição com checkboxes
  readonly filtrosExibicao = signal({
    mostrarNome: true,
    mostrarCodigo: true,
    mostrarDescricao: true,
    mostrarCategoria: true,
  });

  // Estados do accordion
  readonly accordionStates = signal({
    categoria: true,
    campos: true,
  });

  // Estado dos filtros mobile
  readonly mobileFiltersOpen = signal(false);

  // Computed para total de placas
  readonly totalPlacas = computed(() => this.placas().length);
  readonly totalPlacasFiltradas = computed(() => this.placasFiltradas().length);

  ngOnInit(): void {
    this.carregarDados();
  }

  private carregarDados(): void {
    // Carregar placas sem filtros para obter todas
    this.placaFacadeService.carregarPlacas().subscribe((placas: Placa[]) => {
      console.log('Placas carregadas:', placas.length);
      this.placas.set(placas);
      this.placasFiltradas.set(placas);
    });

    // Carregar categorias do enum
    const categorias = Object.entries(CATEGORIAS_PLACAS).map(
      ([codigo, nome]) => ({
        codigo: parseInt(codigo),
        nome: nome,
      })
    );
    this.categorias.set(categorias);
  }

  onCategoriaChange(categoria: number | null): void {
    this.categoriaSelecionada.set(categoria);
    this.filtrarPlacas();
  }

  onTermoBuscaChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.termoBusca.set(target.value);
    this.filtrarPlacas();
  }

  onFiltroExibicaoChange(
    filtro:
      | 'mostrarNome'
      | 'mostrarCodigo'
      | 'mostrarDescricao'
      | 'mostrarCategoria'
  ): void {
    this.filtrosExibicao.update((filtros) => ({
      ...filtros,
      [filtro]: !filtros[filtro],
    }));
  }

  toggleAccordion(section: 'categoria' | 'campos'): void {
    this.accordionStates.update((states) => ({
      ...states,
      [section]: !states[section],
    }));
  }

  toggleMobileFilters(): void {
    this.mobileFiltersOpen.update((open) => !open);
  }

  private filtrarPlacas(): void {
    const categoria = this.categoriaSelecionada();
    const termo = this.termoBusca().toLowerCase();

    let placasFiltradas = this.placas();

    // Filtrar por categoria
    if (categoria !== null) {
      placasFiltradas = placasFiltradas.filter(
        (placa) => placa.obterCategoria() === categoria
      );
    }

    // Filtrar por termo de busca (busca em todos os campos)
    if (termo) {
      placasFiltradas = placasFiltradas.filter((placa) => {
        return (
          placa.obterNome().toLowerCase().includes(termo) ||
          placa.obterCodigo().toLowerCase().includes(termo) ||
          placa.obterDescricao().toLowerCase().includes(termo)
        );
      });
    }

    this.placasFiltradas.set(placasFiltradas);
  }

  limparFiltros(): void {
    this.categoriaSelecionada.set(null);
    this.termoBusca.set('');
    this.filtrosExibicao.set({
      mostrarNome: true,
      mostrarCodigo: true,
      mostrarDescricao: true,
      mostrarCategoria: true,
    });
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

  obterNomeCategoria(codigo: number): string {
    return CATEGORIAS_PLACAS[codigo as CategoriaPlacaEnum] || 'Desconhecida';
  }
}
