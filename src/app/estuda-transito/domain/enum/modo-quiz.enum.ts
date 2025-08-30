export enum ModoQuizEnum {
  TREINO = 'treino',
  AVALIACAO = 'avaliacao',
  DESAFIO = 'desafio',
}

export enum DificuldadeQuizEnum {
  FACIL = 'facil',
  MEDIO = 'medio',
  DIFICIL = 'dificil',
}

export const NUMERO_OPCOES = {
  [DificuldadeQuizEnum.FACIL]: 3,
  [DificuldadeQuizEnum.MEDIO]: 4,
  [DificuldadeQuizEnum.DIFICIL]: 5,
};
