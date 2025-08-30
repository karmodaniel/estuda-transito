import { HttpParams } from '@angular/common/http';

export class PlacaRequest {
  categoria?: string;
  termoPesquisa?: string;
  pagina?: number;
  limite?: number;
  ordenacao?: 'codigo' | 'nome' | 'categoria';
  direcao?: 'asc' | 'desc';

  constructor(dados: Partial<PlacaRequest>) {
    this.categoria = dados.categoria;
    this.termoPesquisa = dados.termoPesquisa;
    this.pagina = dados.pagina;
    this.limite = dados.limite;
    this.ordenacao = dados.ordenacao;
    this.direcao = dados.direcao;
  }

  converterParaParams(): HttpParams {
    let params = new HttpParams();

    if (this.categoria) {
      params = params.set('categoria', this.categoria);
    }

    if (this.termoPesquisa) {
      params = params.set('termoPesquisa', this.termoPesquisa);
    }

    if (this.pagina) {
      params = params.set('pagina', this.pagina.toString());
    }

    if (this.limite) {
      params = params.set('limite', this.limite.toString());
    }

    if (this.ordenacao) {
      params = params.set('ordenacao', this.ordenacao);
    }

    if (this.direcao) {
      params = params.set('direcao', this.direcao);
    }

    return params;
  }

  formatarCorpo(): any {
    return {
      categoria: this.categoria,
      termoPesquisa: this.termoPesquisa,
      pagina: this.pagina,
      limite: this.limite,
      ordenacao: this.ordenacao,
      direcao: this.direcao,
    };
  }
}

export class PlacaFiltrosRequest {
  categorias: string[];
  termoPesquisa?: string;
  incluirInativas: boolean;

  constructor(dados: Partial<PlacaFiltrosRequest>) {
    this.categorias = dados.categorias || [];
    this.termoPesquisa = dados.termoPesquisa;
    this.incluirInativas = dados.incluirInativas ?? false;
  }

  formatarCorpo(): any {
    return {
      categorias: this.categorias,
      termoPesquisa: this.termoPesquisa,
      incluirInativas: this.incluirInativas,
    };
  }
}
