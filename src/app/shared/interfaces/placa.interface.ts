export interface Placa {
  codigo: string;
  nome: string;
  descricao: string;
  categoria: string;
  nome_imagem: string;
  imagem_arquivo: string;
  imagem_url?: string;
}

export interface PlacaFiltros {
  categoria?: string;
  termoPesquisa?: string;
}

export interface PlacaVisualizacao {
  mostrarCodigo: boolean;
  mostrarNome: boolean;
  mostrarDescricao: boolean;
  mostrarCategoria: boolean;
  mostrarImagem: boolean;
}

export interface PlacaLayout {
  modoVisualizacao: 'grid' | 'lista' | 'cards';
  tamanhoImagem: 'small' | 'medium' | 'large';
  mostrarFiltros: boolean;
}

