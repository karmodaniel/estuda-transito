export interface IPlaca {
  codigo: string;
  nome: string;
  descricao: string;
  categoria: number;
  nome_imagem: string;
  imagem_arquivo: string;
  imagem_url?: string;
}

export interface IPlacaFiltros {
  categoria?: number;
  termoPesquisa?: string;
}

export interface IPlacaVisualizacao {
  mostrarCodigo: boolean;
  mostrarNome: boolean;
  mostrarDescricao: boolean;
  mostrarCategoria: boolean;
  mostrarImagem: boolean;
}

export interface IPlacaLayout {
  modoVisualizacao: 'grid' | 'lista' | 'cards';
  tamanhoImagem: 'small' | 'medium' | 'large';
  mostrarFiltros: boolean;
}
