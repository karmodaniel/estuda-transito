import { Injectable, inject } from '@angular/core';
import { Observable, map, switchMap } from 'rxjs';
import { QuizApiService } from '@infrastructure/api/quiz-api.service';
import { QuizStoreService } from '@infrastructure/store/quiz-store.service';
import { PlacaFacadeService } from './placa-facade.service';
import {
  QuizRequest,
  QuizRespostaRequest,
  QuizResultadoRequest,
} from '@infrastructure/api/contract/request/quiz.request';
import {
  QuizResponse,
  QuestaoResponse,
  QuizResultadoResponse,
  EstatisticaQuizResponse,
} from '@infrastructure/api/contract/response/quiz.response';
import { Quiz } from '@domain/model/quiz';
import { Placa } from '@domain/model/placa';
import {
  IQuizConfig,
  IQuizEstado,
  IQuizEstatisticas,
  IQuizResultado,
} from '@domain/interface/quiz.interface';
import {
  DificuldadeQuizEnum,
  NUMERO_OPCOES,
} from '@domain/enum/modo-quiz.enum';

@Injectable({
  providedIn: 'root'
})
export class QuizFacadeService {
  private readonly quizApiService = inject(QuizApiService);
  private readonly quizStoreService = inject(QuizStoreService);
  private readonly placaFacadeService = inject(PlacaFacadeService);

  private quizAtual: Quiz | null = null;

  // Métodos para gerenciar o quiz
  criarQuiz(configuracao: IQuizConfig): Observable<Quiz> {
    const quizRequest = new QuizRequest({
      categoria: configuracao.categoriaSelecionada || undefined,
      dificuldade: this.mapearDificuldade(configuracao.numOpcoes),
      numeroQuestoes: 10, // Valor padrão, pode ser configurável
      modo: 'treino',
      tempoLimite: undefined,
    });

    return this.quizApiService
      .criarQuiz(quizRequest)
      .pipe(
        switchMap((quizResponse) =>
          this.inicializarQuizLocal(quizResponse, configuracao)
        )
      );
  }

  private inicializarQuizLocal(
    quizResponse: QuizResponse,
    configuracao: IQuizConfig
  ): Observable<Quiz> {
    return this.placaFacadeService
      .obterPlacasAleatorias(20, configuracao.categoriaSelecionada)
      .pipe(
        map((placas) => {
          this.quizAtual = new Quiz(configuracao, placas);
          this.quizStoreService.atualizarConfiguracao(configuracao);
          this.quizStoreService.iniciarQuiz();
          return this.quizAtual;
        })
      );
  }

  iniciarQuiz(): void {
    if (this.quizAtual) {
      this.quizAtual.iniciarQuiz();
      this.quizStoreService.iniciarQuiz();
      this.atualizarEstadoStore();
    }
  }

  gerarNovaQuestao(): void {
    if (this.quizAtual) {
      this.quizAtual.gerarNovaQuestao();
      this.atualizarEstadoStore();
    }
  }

  selecionarResposta(resposta: string): void {
    if (this.quizAtual) {
      this.quizAtual.selecionarResposta(resposta);
      this.atualizarEstadoStore();
    }
  }

  verificarResposta(): boolean {
    if (this.quizAtual) {
      const acertou = this.quizAtual.verificarResposta();
      this.atualizarEstadoStore();
      this.quizStoreService.registrarResposta(
        this.quizAtual.obterEstado().respostaSelecionada,
        acertou
      );
      return acertou;
    }
    return false;
  }

  finalizarQuiz(): Observable<QuizResultadoResponse> {
    if (this.quizAtual) {
      const resultado = this.quizAtual.obterResultado();
      const resultadoRequest = new QuizResultadoRequest({
        quizId: 'local', // Para quizzes locais
        acertos: resultado.acertos,
        totalQuestoes: resultado.totalQuestoes,
        tempoTotal: 0, // Implementar cronômetro
        respostas: [], // Implementar histórico de respostas
      });

      this.quizStoreService.finalizarQuiz();
      return this.quizApiService.finalizarQuiz('local', resultadoRequest);
    }

    throw new Error('Nenhum quiz ativo para finalizar');
  }

  // Métodos para obter dados do store
  obterEstado(): Observable<IQuizEstado> {
    return new Observable((observer) => {
      observer.next(this.quizStoreService.estadoAtual);
      observer.complete();
    });
  }

  obterEstatisticas(): Observable<IQuizEstatisticas> {
    return new Observable((observer) => {
      observer.next(this.quizStoreService.estatisticasAtuais);
      observer.complete();
    });
  }

  obterConfiguracao(): Observable<IQuizConfig> {
    return new Observable((observer) => {
      observer.next(this.quizStoreService.configuracaoAtual);
      observer.complete();
    });
  }

  obterResultado(): Observable<IQuizResultado> {
    if (this.quizAtual) {
      return new Observable((observer) => {
        observer.next(this.quizAtual!.obterResultado());
        observer.complete();
      });
    }
    return new Observable((observer) => observer.complete());
  }

  // Métodos para configuração
  alterarConfiguracao(novaConfig: Partial<IQuizConfig>): void {
    if (this.quizAtual) {
      this.quizAtual.alterarConfiguracao(novaConfig);
    }
    this.quizStoreService.atualizarConfiguracao(novaConfig);
  }

  alterarDificuldade(dificuldade: DificuldadeQuizEnum): void {
    const numOpcoes = NUMERO_OPCOES[dificuldade] as 3 | 4 | 5;
    this.alterarConfiguracao({ numOpcoes });
  }

  alterarCategoria(categoria: string): void {
    this.alterarConfiguracao({ categoriaSelecionada: categoria });
  }

  // Métodos para estatísticas e histórico
  obterEstatisticasGlobais(): Observable<EstatisticaQuizResponse> {
    return this.quizApiService.obterEstatisticas();
  }

  obterHistoricoQuizzes(): Observable<QuizResponse[]> {
    // Implementar quando houver histórico
    return new Observable((observer) => observer.complete());
  }

  // Métodos privados
  private atualizarEstadoStore(): void {
    if (this.quizAtual) {
      const estado = this.quizAtual.obterEstado();
      const estatisticas = this.quizAtual.obterEstatisticas();

      this.quizStoreService.atualizarEstado(estado);
      this.quizStoreService.atualizarEstatisticas(estatisticas);
    }
  }

  private mapearDificuldade(numOpcoes: number): 'facil' | 'medio' | 'dificil' {
    const mapeamento = {
      3: 'facil',
      4: 'medio',
      5: 'dificil',
    } as const;

    return mapeamento[numOpcoes as keyof typeof mapeamento] || 'medio';
  }

  // Métodos para controle do quiz
  pausarQuiz(): void {
    // Implementar lógica de pausa
  }

  retomarQuiz(): void {
    // Implementar lógica de retomada
  }

  reiniciarQuiz(): void {
    if (this.quizAtual) {
      this.quizAtual.iniciarQuiz();
      this.quizStoreService.resetarEstado();
      this.atualizarEstadoStore();
    }
  }

  // Métodos para validação
  podeFinalizarQuiz(): boolean {
    if (this.quizAtual) {
      const estado = this.quizAtual.obterEstado();
      return estado.totalQuestoes > 0;
    }
    return false;
  }

  podeGerarNovaQuestao(): boolean {
    if (this.quizAtual) {
      const estado = this.quizAtual.obterEstado();
      return estado.respostaRevelada;
    }
    return false;
  }
}
