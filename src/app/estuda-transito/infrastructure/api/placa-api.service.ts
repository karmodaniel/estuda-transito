import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of, map } from 'rxjs';
import {
  PlacaRequest,
  PlacaFiltrosRequest,
} from './contract/request/placa.request';
import {
  PlacaResponse,
  PlacaListaResponse,
  CategoriaResponse,
} from './contract/response/placa.response';
import { environment } from '@environment/environment';

@Injectable({
  providedIn: 'root',
})
export class PlacaApiService {
  private readonly baseUrl = `${environment.apiUrl}/placas`;
  private readonly placasJsonUrl = 'assets/placas.json';

  constructor(private readonly http: HttpClient) {}

  obterPlacas(filtros: PlacaRequest): Observable<PlacaListaResponse> {
    // Usar o arquivo JSON real
    return this.http.get<any[]>(this.placasJsonUrl).pipe(
      map((placasJson) => {
        console.log('Placas JSON carregadas:', placasJson.length);

        // Converter o formato JSON para PlacaResponse
        const placas = placasJson.map(
          (placaJson) =>
            new PlacaResponse({
              codigo: placaJson.codigo,
              nome: placaJson.nome,
              descricao: placaJson.descricao,
              categoria: placaJson.categoria,
              nome_imagem: placaJson.nome_imagem,
              imagem_arquivo: placaJson.imagem_arquivo,
              imagem_url: placaJson.imagem_arquivo,
              ativa: true,
              dataCriacao: '2024-01-01T00:00:00Z',
              dataAtualizacao: '2024-01-01T00:00:00Z',
            })
        );

        console.log('Placas convertidas:', placas.length);

        // Retornar todas as placas sem filtros por padrão
        return new PlacaListaResponse({
          placas: placas,
          total: placas.length,
          pagina: 1,
          limite: placas.length,
          totalPaginas: 1,
        });
      })
    );
  }

  obterPlacaPorCodigo(codigo: string): Observable<PlacaResponse> {
    return this.http.get<any[]>(this.placasJsonUrl).pipe(
      map((placasJson) => {
        const placaJson = placasJson.find((p) => p.codigo === codigo);
        if (!placaJson) {
          throw new Error(`Placa com código ${codigo} não encontrada`);
        }

        return new PlacaResponse({
          codigo: placaJson.codigo,
          nome: placaJson.nome,
          descricao: placaJson.descricao,
          categoria: placaJson.categoria,
          nome_imagem: placaJson.nome_imagem,
          imagem_arquivo: placaJson.imagem_arquivo,
          imagem_url: placaJson.imagem_arquivo,
          ativa: true,
          dataCriacao: '2024-01-01T00:00:00Z',
          dataAtualizacao: '2024-01-01T00:00:00Z',
        });
      })
    );
  }

  obterPlacasPorCategoria(categoria: string): Observable<PlacaResponse[]> {
    return this.http.get<any[]>(this.placasJsonUrl).pipe(
      map((placasJson) => {
        return placasJson
          .filter((p) => p.categoria === categoria)
          .map(
            (placaJson) =>
              new PlacaResponse({
                codigo: placaJson.codigo,
                nome: placaJson.nome,
                descricao: placaJson.descricao,
                categoria: placaJson.categoria,
                nome_imagem: placaJson.nome_imagem,
                imagem_arquivo: placaJson.imagem_arquivo,
                imagem_url: placaJson.imagem_arquivo,
                ativa: true,
                dataCriacao: '2024-01-01T00:00:00Z',
                dataAtualizacao: '2024-01-01T00:00:00Z',
              })
          );
      })
    );
  }

  obterCategorias(): Observable<CategoriaResponse[]> {
    return this.http.get<any[]>(this.placasJsonUrl).pipe(
      map((placasJson) => {
        // Contar placas por categoria
        const contagemPorCategoria = placasJson.reduce((acc, placa) => {
          acc[placa.categoria] = (acc[placa.categoria] || 0) + 1;
          return acc;
        }, {} as Record<string, number>);

        // Criar objetos CategoriaResponse
        const categorias = Object.entries(contagemPorCategoria).map(
          ([codigo, quantidade]) =>
            new CategoriaResponse({
              codigo,
              nome: this.getNomeCategoria(codigo),
              descricao: `Placas da categoria ${this.getNomeCategoria(codigo)}`,
              quantidadePlacas: quantidade as number,
            })
        );

        return categorias;
      })
    );
  }

  buscarPlacas(filtros: PlacaFiltrosRequest): Observable<PlacaResponse[]> {
    return this.http.get<any[]>(this.placasJsonUrl).pipe(
      map((placasJson) => {
        let placas = placasJson;

        if (filtros.categorias && filtros.categorias.length > 0) {
          placas = placas.filter((p) =>
            filtros.categorias!.includes(p.categoria)
          );
        }

        if (filtros.termoPesquisa) {
          const termo = filtros.termoPesquisa.toLowerCase();
          placas = placas.filter(
            (p) =>
              p.nome.toLowerCase().includes(termo) ||
              p.descricao.toLowerCase().includes(termo)
          );
        }

        return placas.map(
          (placaJson) =>
            new PlacaResponse({
              codigo: placaJson.codigo,
              nome: placaJson.nome,
              descricao: placaJson.descricao,
              categoria: placaJson.categoria,
              nome_imagem: placaJson.nome_imagem,
              imagem_arquivo: placaJson.imagem_arquivo,
              imagem_url: placaJson.imagem_arquivo,
              ativa: true,
              dataCriacao: '2024-01-01T00:00:00Z',
              dataAtualizacao: '2024-01-01T00:00:00Z',
            })
        );
      })
    );
  }

  obterPlacasAleatorias(
    quantidade: number,
    categoria?: string
  ): Observable<PlacaResponse[]> {
    return this.http.get<any[]>(this.placasJsonUrl).pipe(
      map((placasJson) => {
        let placas = [...placasJson];

        if (categoria) {
          placas = placas.filter((p) => p.categoria === categoria);
        }

        // Embaralhar e pegar a quantidade solicitada
        const embaralhadas = placas.sort(() => Math.random() - 0.5);
        const selecionadas = embaralhadas.slice(0, quantidade);

        return selecionadas.map(
          (placaJson) =>
            new PlacaResponse({
              codigo: placaJson.codigo,
              nome: placaJson.nome,
              descricao: placaJson.descricao,
              categoria: placaJson.categoria,
              nome_imagem: placaJson.nome_imagem,
              imagem_arquivo: placaJson.imagem_arquivo,
              imagem_url: placaJson.imagem_arquivo,
              ativa: true,
              dataCriacao: '2024-01-01T00:00:00Z',
              dataAtualizacao: '2024-01-01T00:00:00Z',
            })
        );
      })
    );
  }

  private getNomeCategoria(codigo: string): string {
    const categorias: { [key: string]: string } = {
      '1': 'Regulamentação',
      '2': 'Advertência',
      '3': 'Serviços Auxiliares',
    };
    return categorias[codigo] || 'Desconhecida';
  }
}
