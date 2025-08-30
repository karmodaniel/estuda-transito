import { Injectable, inject } from '@angular/core';
import { Observable, map, tap } from 'rxjs';
import { PlacaApiService } from '@infrastructure/api/placa-api.service';
import { QuizStoreService } from '@infrastructure/store/quiz-store.service';
import {
  PlacaRequest,
  PlacaFiltrosRequest,
} from '@infrastructure/api/contract/request/placa.request';
import {
  PlacaResponse,
  PlacaListaResponse,
  CategoriaResponse,
} from '@infrastructure/api/contract/response/placa.response';
import { Placa } from '@domain/model/placa';
import {
  CategoriaPlacaEnum,
  CATEGORIAS_PLACAS,
} from '@domain/enum/categoria-placa.enum';

@Injectable({
  providedIn: 'root',
})
export class PlacaFacadeService {
  private readonly placaApiService = inject(PlacaApiService);
  private readonly quizStoreService = inject(QuizStoreService);

  // Métodos para carregar e gerenciar placas
  carregarPlacas(filtros?: Partial<PlacaRequest>): Observable<Placa[]> {
    const filtrosPadrao = new PlacaRequest({
      pagina: 1,
      limite: 100,
      ordenacao: 'codigo',
      direcao: 'asc',
      ...filtros,
    });

    return this.placaApiService.obterPlacas(filtrosPadrao).pipe(
      map((response: PlacaListaResponse) =>
        PlacaListaResponse.converter(response)
      ),
      tap((placas) => this.quizStoreService.definirPlacas(placas))
    );
  }

  carregarPlacasPorCategoria(categoria: string): Observable<Placa[]> {
    return this.placaApiService.obterPlacasPorCategoria(categoria).pipe(
      map((placasResponse) =>
        placasResponse.map((placaResponse) =>
          PlacaResponse.converter(placaResponse)
        )
      ),
      tap((placas) => this.quizStoreService.definirPlacas(placas))
    );
  }

  obterCategorias(): Observable<CategoriaResponse[]> {
    return new Observable((observer) => {
      // Converter o objeto CATEGORIAS_PLACAS para array de CategoriaResponse
      const categorias = Object.entries(CATEGORIAS_PLACAS).map(
        ([codigo, nome]) =>
          new CategoriaResponse({
            codigo,
            nome,
            descricao: `Placas da categoria ${nome}`,
            quantidadePlacas: 0, // Será calculado dinamicamente
          })
      );
      observer.next(categorias);
      observer.complete();
    });
  }

  buscarPlacas(filtros: PlacaFiltrosRequest): Observable<Placa[]> {
    return this.placaApiService.buscarPlacas(filtros).pipe(
      map((placasResponse) =>
        placasResponse.map((placaResponse) =>
          PlacaResponse.converter(placaResponse)
        )
      ),
      tap((placas) => this.quizStoreService.definirPlacas(placas))
    );
  }

  obterPlacasAleatorias(
    quantidade: number,
    categoria?: string
  ): Observable<Placa[]> {
    return this.placaApiService
      .obterPlacasAleatorias(quantidade, categoria)
      .pipe(
        map((placasResponse) =>
          placasResponse.map((placaResponse) =>
            PlacaResponse.converter(placaResponse)
          )
        )
      );
  }

  // Métodos para filtros e busca
  filtrarPlacas(categoria?: string, termoPesquisa?: string): void {
    this.quizStoreService.filtrarPlacas(categoria, termoPesquisa);
  }

  limparFiltros(): void {
    this.quizStoreService.limparFiltros();
  }

  // Métodos para obter dados do store
  obterPlacas(): Observable<Placa[]> {
    return new Observable((observer) => {
      observer.next(this.quizStoreService.placasAtuais);
      observer.complete();
    });
  }

  obterPlacasFiltradas(): Observable<Placa[]> {
    return new Observable((observer) => {
      observer.next(this.quizStoreService.placasFiltradasAtuais);
      observer.complete();
    });
  }

  obterPlacaPorCodigo(codigo: string): Observable<Placa | null> {
    return new Observable((observer) => {
      const placas = this.quizStoreService.placasAtuais;
      const placa = placas.find((p) => p.codigo === codigo) || null;
      observer.next(placa);
      observer.complete();
    });
  }

  // Métodos utilitários
  obterNomeCategoria(codigo: string): string {
    return CATEGORIAS_PLACAS[codigo as CategoriaPlacaEnum] || 'Desconhecida';
  }

  obterCategoriasDisponiveis(): string[] {
    return Object.values(CategoriaPlacaEnum);
  }

  // Métodos para estatísticas
  obterEstatisticasPlacas(): Observable<{
    total: number;
    porCategoria: Record<string, number>;
  }> {
    return new Observable((observer) => {
      const placas = this.quizStoreService.placasAtuais;
      const total = placas.length;
      const porCategoria = placas.reduce((acc, placa) => {
        acc[placa.categoria] = (acc[placa.categoria] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);

      observer.next({ total, porCategoria });
      observer.complete();
    });
  }

  obterPlacasMaisRecentes(quantidade: number = 10): Observable<Placa[]> {
    return new Observable((observer) => {
      const placas = this.quizStoreService.placasAtuais;
      observer.next(placas.slice(0, quantidade));
      observer.complete();
    });
  }
}
