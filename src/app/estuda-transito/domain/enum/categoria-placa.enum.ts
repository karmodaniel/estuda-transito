export enum CategoriaPlacaEnum {
  ADVERTENCIA = 'A',
  INFORMACAO = 'I',
  REGULAMENTACAO = 'R',
  SINALIZACAO = 'S',
}

export const CATEGORIAS_PLACAS = {
  [CategoriaPlacaEnum.ADVERTENCIA]: 'Advertência',
  [CategoriaPlacaEnum.INFORMACAO]: 'Informação',
  [CategoriaPlacaEnum.REGULAMENTACAO]: 'Regulamentação',
  [CategoriaPlacaEnum.SINALIZACAO]: 'Sinalização',
};
