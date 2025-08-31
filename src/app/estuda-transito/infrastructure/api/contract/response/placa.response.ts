import { Placa } from '@domain/model/placa';

export class PlacaResponse {
  codigo: string;
  nome: string;
  descricao: string;
  categoria: number;
  nome_imagem: string;
  imagem_arquivo: string;
  imagem_url?: string;
  ativa: boolean;
  dataCriacao: string;
  dataAtualizacao: string;

  constructor(dados: Partial<PlacaResponse>) {
    this.codigo = dados.codigo || '';
    this.nome = dados.nome || '';
    this.descricao = dados.descricao || '';
    this.categoria = dados.categoria || 0;
    this.nome_imagem = dados.nome_imagem || '';
    this.imagem_arquivo = dados.imagem_arquivo || '';
    this.imagem_url = dados.imagem_url;
    this.ativa = dados.ativa ?? true;
    this.dataCriacao = dados.dataCriacao || '';
    this.dataAtualizacao = dados.dataAtualizacao || '';
  }

  static converter(response: PlacaResponse): Placa {
    return new Placa({
      codigo: response.codigo,
      nome: response.nome,
      descricao: response.descricao,
      categoria: response.categoria,
      nome_imagem: response.nome_imagem,
      imagem_arquivo: response.imagem_arquivo,
      imagem_url: response.imagem_url,
    });
  }
}

export class PlacaListaResponse {
  placas: PlacaResponse[];
  total: number;
  pagina: number;
  limite: number;
  totalPaginas: number;

  constructor(dados: Partial<PlacaListaResponse>) {
    this.placas = dados.placas?.map((p) => new PlacaResponse(p)) || [];
    this.total = dados.total || 0;
    this.pagina = dados.pagina || 1;
    this.limite = dados.limite || 10;
    this.totalPaginas = dados.totalPaginas || 1;
  }

  static converter(response: PlacaListaResponse): Placa[] {
    return response.placas.map((placa) => PlacaResponse.converter(placa));
  }
}

export class CategoriaResponse {
  codigo: string;
  nome: string;
  descricao: string;
  quantidadePlacas: number;

  constructor(dados: Partial<CategoriaResponse>) {
    this.codigo = dados.codigo || '';
    this.nome = dados.nome || '';
    this.descricao = dados.descricao || '';
    this.quantidadePlacas = dados.quantidadePlacas || 0;
  }
}
