import { Component, OnInit } from '@angular/core';
import { PlacasService } from '../../services/placas.service';
import {
  Placa,
  PlacaFiltros,
  PlacaVisualizacao,
  PlacaLayout,
} from '../../shared/interfaces/placa.interface';

@Component({
  selector: 'app-placas-study',
  templateUrl: './placas-study.component.html',
  styleUrls: ['./placas-study.component.less'],
})
export class PlacasStudyComponent implements OnInit {
  placas: Placa[] = [];
  placasFiltradas: Placa[] = [];
  placaAtual: Placa | null = null;
  indiceAtual = 0;
  loading = false;
  mostrarResposta = false;

  // Configurações de layout
  layoutConfig: PlacaLayout = {
    modoVisualizacao: 'grid',
    tamanhoImagem: 'medium',
    mostrarFiltros: true,
  };

  // Opções de visualização
  opcoesVisualizacao: PlacaVisualizacao = {
    mostrarCodigo: true,
    mostrarNome: true,
    mostrarDescricao: true,
    mostrarCategoria: true,
    mostrarImagem: true,
  };

  // Filtros
  filtros: PlacaFiltros = {
    categoria: '',
    termoPesquisa: '',
  };

  // Categorias disponíveis
  categorias: string[] = [];

  constructor(private placasService: PlacasService) {}

  ngOnInit(): void {
    this.carregarPlacas();
    this.categorias = this.placasService.getCategorias();
  }

  carregarPlacas(): void {
    this.loading = true;
    this.placasService.getPlacas().subscribe({
      next: (placas) => {
        this.placas = placas;
        this.placasFiltradas = [...placas];
        this.loading = false;
        if (this.placas.length > 0) {
          this.placaAtual = this.placas[0];
        }
      },
      error: (error) => {
        console.error('Erro ao carregar placas:', error);
        this.loading = false;
      },
    });
  }

  proximaPlaca(): void {
    if (this.indiceAtual < this.placas.length - 1) {
      this.indiceAtual++;
      this.placaAtual = this.placas[this.indiceAtual];
      this.mostrarResposta = false;
    }
  }

  placaAnterior(): void {
    if (this.indiceAtual > 0) {
      this.indiceAtual--;
      this.placaAtual = this.placas[this.indiceAtual];
      this.mostrarResposta = false;
    }
  }

  toggleResposta(): void {
    this.mostrarResposta = !this.mostrarResposta;
  }

  getNomeCategoria(codigo: string): string {
    return this.placasService.getNomeCategoria(codigo);
  }

  getCategoriaColor(categoria: string): string {
    if (!categoria || categoria.trim() === '') {
      return 'default';
    }

    const cores: { [key: string]: string } = {
      R: 'red',
      A: 'orange',
      I: 'blue',
      S: 'green',
    };
    return cores[categoria] || 'default';
  }

  // Métodos para configurações de layout
  alterarModoVisualizacao(modo: 'grid' | 'lista' | 'cards'): void {
    this.layoutConfig.modoVisualizacao = modo;
  }

  alterarTamanhoImagem(tamanho: 'small' | 'medium' | 'large'): void {
    this.layoutConfig.tamanhoImagem = tamanho;
  }

  toggleFiltros(): void {
    this.layoutConfig.mostrarFiltros = !this.layoutConfig.mostrarFiltros;
  }

  // Métodos para filtros
  pesquisar(termo: string): void {
    this.filtros.termoPesquisa = termo;
    this.aplicarFiltros();
  }

  filtrarPorCategoria(categoria: string): void {
    this.filtros.categoria = categoria;
    this.aplicarFiltros();
  }

  limparFiltros(): void {
    this.filtros.categoria = '';
    this.filtros.termoPesquisa = '';
    this.placasFiltradas = [...this.placas];
  }

  private aplicarFiltros(): void {
    this.placasFiltradas = this.placas.filter((placa) => {
      const matchCategoria =
        !this.filtros.categoria || placa.categoria === this.filtros.categoria;
      const matchTermo =
        !this.filtros.termoPesquisa ||
        placa.nome
          .toLowerCase()
          .includes(this.filtros.termoPesquisa.toLowerCase()) ||
        placa.descricao
          .toLowerCase()
          .includes(this.filtros.termoPesquisa.toLowerCase()) ||
        placa.codigo
          .toLowerCase()
          .includes(this.filtros.termoPesquisa.toLowerCase());

      return matchCategoria && matchTermo;
    });
  }

  // Métodos para estatísticas
  getEstatisticas(): any {
    const total = this.placas.length;
    const filtradas = this.placasFiltradas.length;
    const categorias: { [key: string]: number } = {};

    this.categorias.forEach((cat) => {
      categorias[cat] = this.placas.filter((p) => p.categoria === cat).length;
    });

    return { total, filtradas, categorias };
  }

  // Métodos para layout
  getGridClass(): string {
    switch (this.layoutConfig.modoVisualizacao) {
      case 'grid':
        return 'placas-grid';
      case 'lista':
        return 'placas-lista';
      case 'cards':
        return 'placas-cards';
      default:
        return 'placas-grid';
    }
  }

  // Método para clique na placa
  onPlacaClick(placa: Placa): void {
    console.log('Placa clicada:', placa);
    // Aqui você pode implementar a lógica para quando uma placa é clicada
  }
}
