import { IPlaca } from '../interface/placa.interface';

export class Placa implements IPlaca {
  codigo: string;
  nome: string;
  descricao: string;
  categoria: string;
  nome_imagem: string;
  imagem_arquivo: string;
  imagem_url?: string;

  constructor(dados: IPlaca) {
    this.codigo = dados.codigo;
    this.nome = dados.nome;
    this.descricao = dados.descricao;
    this.categoria = dados.categoria;
    this.nome_imagem = dados.nome_imagem;
    this.imagem_arquivo = dados.imagem_arquivo;
    this.imagem_url = dados.imagem_url;
  }

  obterCategoria(): string {
    return this.categoria;
  }

  obterCodigo(): string {
    return this.codigo;
  }

  obterNome(): string {
    return this.nome;
  }

  obterDescricao(): string {
    return this.descricao;
  }

  obterImagemUrl(): string {
    return this.imagem_url || this.imagem_arquivo;
  }

  pertenceCategoria(categoria: string): boolean {
    return this.categoria.toLowerCase() === categoria.toLowerCase();
  }

  contemTermo(termo: string): boolean {
    const termoLower = termo.toLowerCase();
    return (
      this.nome.toLowerCase().includes(termoLower) ||
      this.descricao.toLowerCase().includes(termoLower) ||
      this.codigo.toLowerCase().includes(termoLower)
    );
  }
}
