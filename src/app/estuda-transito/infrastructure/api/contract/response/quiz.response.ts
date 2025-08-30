export class QuizResponse {
  id: string;
  categoria?: string;
  dificuldade: string;
  numeroQuestoes: number;
  modo: string;
  tempoLimite?: number;
  status: 'ativo' | 'finalizado' | 'cancelado';
  dataCriacao: string;

  constructor(dados: Partial<QuizResponse>) {
    this.id = dados.id || '';
    this.categoria = dados.categoria;
    this.dificuldade = dados.dificuldade || '';
    this.numeroQuestoes = dados.numeroQuestoes || 0;
    this.modo = dados.modo || '';
    this.tempoLimite = dados.tempoLimite;
    this.status = dados.status || 'ativo';
    this.dataCriacao = dados.dataCriacao || '';
  }
}

export class QuestaoResponse {
  id: string;
  codigoPlaca: string;
  opcoes: string[];
  respostaCorreta: string;
  dica?: string;
  tempoLimite?: number;

  constructor(dados: Partial<QuestaoResponse>) {
    this.id = dados.id || '';
    this.codigoPlaca = dados.codigoPlaca || '';
    this.opcoes = dados.opcoes || [];
    this.respostaCorreta = dados.respostaCorreta || '';
    this.dica = dados.dica;
    this.tempoLimite = dados.tempoLimite;
  }
}

export class QuizResultadoResponse {
  id: string;
  quizId: string;
  acertos: number;
  totalQuestoes: number;
  precisao: number;
  tempoTotal: number;
  melhorSequencia: number;
  performance: string;
  dataFinalizacao: string;

  constructor(dados: Partial<QuizResultadoResponse>) {
    this.id = dados.id || '';
    this.quizId = dados.quizId || '';
    this.acertos = dados.acertos || 0;
    this.totalQuestoes = dados.totalQuestoes || 0;
    this.precisao = dados.precisao || 0;
    this.tempoTotal = dados.tempoTotal || 0;
    this.melhorSequencia = dados.melhorSequencia || 0;
    this.performance = dados.performance || '';
    this.dataFinalizacao = dados.dataFinalizacao || '';
  }
}

export class EstatisticaQuizResponse {
  totalQuizzes: number;
  mediaAcertos: number;
  melhorSequencia: number;
  tempoMedio: number;
  categoriaMaisAcertada: string;
  categoriaMenosAcertada: string;

  constructor(dados: Partial<EstatisticaQuizResponse>) {
    this.totalQuizzes = dados.totalQuizzes || 0;
    this.mediaAcertos = dados.mediaAcertos || 0;
    this.melhorSequencia = dados.melhorSequencia || 0;
    this.tempoMedio = dados.tempoMedio || 0;
    this.categoriaMaisAcertada = dados.categoriaMaisAcertada || '';
    this.categoriaMenosAcertada = dados.categoriaMenosAcertada || '';
  }
}
