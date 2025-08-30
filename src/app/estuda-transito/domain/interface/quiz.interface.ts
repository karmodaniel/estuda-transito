export interface IQuizConfig {
  categorias: string[];
  categoriaSelecionada: string;
  numOpcoes: 3 | 4 | 5;
  mostrarEstatisticas: boolean;
  modoAleatorio: boolean;
}

export interface IQuizEstado {
  questaoAtual: string | null;
  opcoes: string[];
  respostaSelecionada: string;
  respostaCorreta: string;
  respostaRevelada: boolean;
  acertos: number;
  totalQuestoes: number;
}

export interface IQuizEstatisticas {
  acertos: number;
  erros: number;
  precisao: number;
  sequenciaAtual: number;
  melhorSequencia: number;
}

export interface IQuizResultado {
  acertos: number;
  totalQuestoes: number;
  precisao: number;
  melhorSequencia: number;
  performance: 'excellent' | 'good' | 'needs-improvement';
}
