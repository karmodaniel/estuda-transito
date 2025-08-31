export enum CategoriaPlacaEnum {
  REGULAMENTACAO = 1,
  ADVERTENCIA = 2,
  SERVICOS_AUXILIARES = 3,
}

export const CATEGORIAS_PLACAS = {
  [CategoriaPlacaEnum.REGULAMENTACAO]: 'Regulamentação',
  [CategoriaPlacaEnum.ADVERTENCIA]: 'Advertência',
  [CategoriaPlacaEnum.SERVICOS_AUXILIARES]: 'Serviços Auxiliares',
};
