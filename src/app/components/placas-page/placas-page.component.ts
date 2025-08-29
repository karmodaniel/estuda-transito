import { Component, OnInit } from '@angular/core';
import { PlacasService, Placa } from '../../services/placas.service';

@Component({
  selector: 'app-placas-page',
  templateUrl: './placas-page.component.html',
  styleUrls: ['./placas-page.component.less'],
})
export class PlacasPageComponent implements OnInit {
  placas: Placa[] = [];
  placasFiltradas: Placa[] = [];
  categorias: string[] = [];
  categoriaSelecionada: string = '';
  termoPesquisa: string = '';
  loading: boolean = false;

  // Opções de visualização configuráveis
  opcoesVisualizacao = {
    mostrarImagem: true,
    mostrarCodigo: true,
    mostrarNome: true,
    mostrarDescricao: true,
    mostrarCategoria: true,
  };

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
        this.placasFiltradas = placas;
        this.loading = false;
      },
      error: (error) => {
        console.error('Erro ao carregar placas:', error);
        this.loading = false;
      },
    });
  }

  filtrarPorCategoria(categoria: string): void {
    this.categoriaSelecionada = categoria;
    this.aplicarFiltros();
  }

  pesquisar(termo: string): void {
    this.termoPesquisa = termo;
    this.aplicarFiltros();
  }

  aplicarFiltros(): void {
    let placasFiltradas = this.placas;

    if (this.categoriaSelecionada) {
      placasFiltradas = placasFiltradas.filter(
        (placa) => placa.categoria === this.categoriaSelecionada
      );
    }

    if (this.termoPesquisa) {
      placasFiltradas = placasFiltradas.filter(
        (placa) =>
          placa.nome.toLowerCase().includes(this.termoPesquisa.toLowerCase()) ||
          placa.descricao
            .toLowerCase()
            .includes(this.termoPesquisa.toLowerCase()) ||
          placa.codigo.toLowerCase().includes(this.termoPesquisa.toLowerCase())
      );
    }

    this.placasFiltradas = placasFiltradas;
  }

  limparFiltros(): void {
    this.categoriaSelecionada = '';
    this.termoPesquisa = '';
    this.placasFiltradas = this.placas;
  }

  alternarOpcaoVisualizacao(opcao: keyof typeof this.opcoesVisualizacao): void {
    this.opcoesVisualizacao[opcao] = !this.opcoesVisualizacao[opcao];
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

  onImageError(event: any): void {
    event.target.src = 'assets/placeholder-placa.jpg';
  }

  // Método para verificar se pelo menos uma opção está ativa
  temOpcaoAtiva(): boolean {
    return Object.values(this.opcoesVisualizacao).some((opcao) => opcao);
  }
}
