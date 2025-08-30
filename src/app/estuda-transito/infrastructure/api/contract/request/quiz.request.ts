import { HttpParams } from '@angular/common/http';

export class QuizRequest {
  categoria?: string;
  dificuldade: 'facil' | 'medio' | 'dificil';
  numeroQuestoes: number;
  modo: 'treino' | 'avaliacao' | 'desafio';
  tempoLimite?: number;

  constructor(dados: Partial<QuizRequest>) {
    this.categoria = dados.categoria;
    this.dificuldade = dados.dificuldade || 'medio';
    this.numeroQuestoes = dados.numeroQuestoes || 10;
    this.modo = dados.modo || 'treino';
    this.tempoLimite = dados.tempoLimite;
  }

  formatarCorpo(): any {
    return {
      categoria: this.categoria,
      dificuldade: this.dificuldade,
      numeroQuestoes: this.numeroQuestoes,
      modo: this.modo,
      tempoLimite: this.tempoLimite,
    };
  }
}

export class QuizRespostaRequest {
  questaoId: string;
  respostaSelecionada: string;
  tempoResposta: number;

  constructor(dados: Partial<QuizRespostaRequest>) {
    this.questaoId = dados.questaoId || '';
    this.respostaSelecionada = dados.respostaSelecionada || '';
    this.tempoResposta = dados.tempoResposta || 0;
  }

  formatarCorpo(): any {
    return {
      questaoId: this.questaoId,
      respostaSelecionada: this.respostaSelecionada,
      tempoResposta: this.tempoResposta,
    };
  }
}

export class QuizResultadoRequest {
  quizId: string;
  acertos: number;
  totalQuestoes: number;
  tempoTotal: number;
  respostas: QuizRespostaRequest[];

  constructor(dados: Partial<QuizResultadoRequest>) {
    this.quizId = dados.quizId || '';
    this.acertos = dados.acertos || 0;
    this.totalQuestoes = dados.totalQuestoes || 0;
    this.tempoTotal = dados.tempoTotal || 0;
    this.respostas =
      dados.respostas?.map((r) => new QuizRespostaRequest(r)) || [];
  }

  formatarCorpo(): any {
    return {
      quizId: this.quizId,
      acertos: this.acertos,
      totalQuestoes: this.totalQuestoes,
      tempoTotal: this.tempoTotal,
      respostas: this.respostas.map((r) => r.formatarCorpo()),
    };
  }
}
