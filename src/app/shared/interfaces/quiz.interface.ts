export interface QuizConfig {
  categorias: string[];
  categoriaSelecionada: string;
  numOpcoes: 3 | 4 | 5;
  mostrarEstatisticas: boolean;
  modoAleatorio: boolean;
}

export interface QuizEstado {
  questaoAtual: string | null;
  opcoes: string[];
  respostaSelecionada: string;
  respostaCorreta: string;
  respostaRevelada: boolean;
  acertos: number;
  totalQuestoes: number;
}

export interface QuizEstatisticas {
  acertos: number;
  erros: number;
  precisao: number;
  sequenciaAtual: number;
  melhorSequencia: number;
}

export interface QuizResultado {
  acertos: number;
  totalQuestoes: number;
  precisao: number;
  melhorSequencia: number;
  performance: 'excellent' | 'good' | 'needs-improvement';
}

