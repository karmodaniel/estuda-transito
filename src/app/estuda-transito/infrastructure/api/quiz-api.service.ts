import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, map } from 'rxjs';
import {
  QuizRequest,
  QuizRespostaRequest,
  QuizResultadoRequest,
} from './contract/request/quiz.request';
import {
  QuizResponse,
  QuestaoResponse,
  QuizResultadoResponse,
  EstatisticaQuizResponse,
} from './contract/response/quiz.response';
import { environment } from '@environment/environment';

@Injectable({
  providedIn: 'root',
})
export class QuizApiService {
  private readonly baseUrl = `${environment.apiUrl}/quiz`;

  constructor(private http: HttpClient) {}

  criarQuiz(quizRequest: QuizRequest): Observable<QuizResponse> {
    // Para desenvolvimento, criar um quiz baseado na configuração
    const quizResponse = new QuizResponse({
      id: `quiz-${Date.now()}`,
      categoria: quizRequest.categoria || 'A',
      dificuldade: quizRequest.dificuldade || 'medio',
      numeroQuestoes: quizRequest.numeroQuestoes || 10,
      modo: quizRequest.modo || 'treino',
      tempoLimite: quizRequest.tempoLimite,
      status: 'ativo',
      dataCriacao: new Date().toISOString(),
    });

    return of(quizResponse);
  }

  obterQuestoes(quizId: string): Observable<QuestaoResponse[]> {
    // Para desenvolvimento, gerar questões baseadas no quiz
    const questoes = this.gerarQuestoesMock(10);
    return of(questoes);
  }

  enviarResposta(
    quizId: string,
    resposta: QuizRespostaRequest
  ): Observable<{ acertou: boolean; respostaCorreta: string }> {
    // Para desenvolvimento, simular resposta
    const acertou = Math.random() > 0.5;
    return of({
      acertou,
      respostaCorreta: acertou
        ? resposta.respostaSelecionada
        : 'Resposta Correta',
    });
  }

  finalizarQuiz(
    quizId: string,
    resultado: QuizResultadoRequest
  ): Observable<QuizResultadoResponse> {
    // Para desenvolvimento, criar resultado baseado nos dados
    const resultadoResponse = new QuizResultadoResponse({
      id: `resultado-${Date.now()}`,
      quizId: quizId,
      acertos: resultado.acertos,
      totalQuestoes: resultado.totalQuestoes,
      precisao: (resultado.acertos / resultado.totalQuestoes) * 100,
      tempoTotal: resultado.tempoTotal || 0,
      melhorSequencia: 0, // Valor padrão para desenvolvimento
      performance: this.calcularPerformance(
        resultado.acertos,
        resultado.totalQuestoes
      ),
      dataFinalizacao: new Date().toISOString(),
    });

    return of(resultadoResponse);
  }

  obterResultado(quizId: string): Observable<QuizResultadoResponse> {
    // Para desenvolvimento, retornar resultado padrão
    const resultadoResponse = new QuizResultadoResponse({
      id: `resultado-${quizId}`,
      quizId: quizId,
      acertos: 8,
      totalQuestoes: 10,
      precisao: 80,
      tempoTotal: 245,
      melhorSequencia: 5,
      performance: 'good',
      dataFinalizacao: new Date().toISOString(),
    });

    return of(resultadoResponse);
  }

  obterEstatisticas(usuarioId?: string): Observable<EstatisticaQuizResponse> {
    // Para desenvolvimento, retornar estatísticas padrão
    const estatisticas = new EstatisticaQuizResponse({
      totalQuizzes: 25,
      mediaAcertos: 7.2,
      melhorSequencia: 8,
      tempoMedio: 280,
      categoriaMaisAcertada: 'Advertência',
      categoriaMenosAcertada: 'Sinalização',
    });

    return of(estatisticas);
  }

  cancelarQuiz(quizId: string): Observable<void> {
    // Para desenvolvimento, simular cancelamento
    return of(void 0);
  }

  obterQuizAtivo(usuarioId?: string): Observable<QuizResponse | null> {
    // Para desenvolvimento, sem quiz ativo por padrão
    return of(null);
  }

  private gerarQuestoesMock(quantidade: number): QuestaoResponse[] {
    const questoes: QuestaoResponse[] = [];

    for (let i = 0; i < quantidade; i++) {
      const questao = new QuestaoResponse({
        id: `questao-${i + 1}`,
        codigoPlaca: `A-${i + 1}`,
        opcoes: ['Opção A', 'Opção B', 'Opção C', 'Opção D'],
        respostaCorreta: 'Opção A',
        dica: 'Dica para a questão',
        tempoLimite: 30,
      });

      questoes.push(questao);
    }

    return questoes;
  }

  private calcularPerformance(
    acertos: number,
    total: number
  ): 'excellent' | 'good' | 'needs-improvement' {
    const percentual = (acertos / total) * 100;

    if (percentual >= 90) return 'excellent';
    if (percentual >= 70) return 'good';
    return 'needs-improvement';
  }
}
