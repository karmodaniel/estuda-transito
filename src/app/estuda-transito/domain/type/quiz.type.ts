export type TRespostaQuiz = string;

export type TOpcaoQuiz = string;

export type TQuestaoQuiz = {
  codigoPlaca: string;
  opcoes: TOpcaoQuiz[];
  respostaCorreta: TRespostaQuiz;
};

export type TConfiguracaoQuiz = {
  modo: 'treino' | 'avaliacao' | 'desafio';
  dificuldade: 'facil' | 'medio' | 'dificil';
  categoria?: string;
  tempoLimite?: number;
  mostrarDicas: boolean;
};

export type TProgressoQuiz = {
  questaoAtual: number;
  totalQuestoes: number;
  acertos: number;
  erros: number;
  tempoDecorrido: number;
};
