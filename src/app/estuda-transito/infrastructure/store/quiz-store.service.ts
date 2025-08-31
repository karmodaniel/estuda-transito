import { Injectable, signal, computed } from '@angular/core';
import {
  IQuizEstado,
  IQuizEstatisticas,
  IQuizConfig,
} from '@domain/interface/quiz.interface';
import { Placa } from '@domain/model/placa';

@Injectable({
  providedIn: 'root',
})
export class QuizStoreService {
  // Signals para estado
  private readonly estadoSignal = signal<IQuizEstado>(this.inicializarEstado());
  private readonly estatisticasSignal = signal<IQuizEstatisticas>(
    this.inicializarEstatisticas()
  );
  private readonly configuracaoSignal = signal<IQuizConfig>(
    this.inicializarConfiguracao()
  );
  private readonly placasSignal = signal<Placa[]>([]);
  private readonly placasFiltradasSignal = signal<Placa[]>([]);

  // Computed signals
  readonly estado = computed(() => this.estadoSignal());
  readonly estatisticas = computed(() => this.estatisticasSignal());
  readonly configuracao = computed(() => this.configuracaoSignal());
  readonly placas = computed(() => this.placasSignal());
  readonly placasFiltradas = computed(() => this.placasFiltradasSignal());

  // Getters para valores atuais
  get estadoAtual(): IQuizEstado {
    return this.estadoSignal();
  }

  get estatisticasAtuais(): IQuizEstatisticas {
    return this.estatisticasSignal();
  }

  get configuracaoAtual(): IQuizConfig {
    return this.configuracaoSignal();
  }

  get placasAtuais(): Placa[] {
    return this.placasSignal();
  }

  get placasFiltradasAtuais(): Placa[] {
    return this.placasFiltradasSignal();
  }

  private inicializarEstado(): IQuizEstado {
    return {
      questaoAtual: null,
      opcoes: [],
      respostaSelecionada: '',
      respostaCorreta: '',
      respostaRevelada: false,
      acertos: 0,
      totalQuestoes: 0,
    };
  }

  private inicializarEstatisticas(): IQuizEstatisticas {
    return {
      acertos: 0,
      erros: 0,
      precisao: 0,
      sequenciaAtual: 0,
      melhorSequencia: 0,
    };
  }

  private inicializarConfiguracao(): IQuizConfig {
    return {
      categorias: [],
      categoriaSelecionada: '',
      numOpcoes: 4,
      mostrarEstatisticas: true,
      modoAleatorio: true,
    };
  }

  // Métodos para atualizar o estado
  atualizarEstado(novoEstado: Partial<IQuizEstado>): void {
    this.estadoSignal.update((estado) => ({ ...estado, ...novoEstado }));
  }

  atualizarEstatisticas(novasEstatisticas: Partial<IQuizEstatisticas>): void {
    this.estatisticasSignal.update((estatisticas) => ({
      ...estatisticas,
      ...novasEstatisticas,
    }));
  }

  atualizarConfiguracao(novaConfig: Partial<IQuizConfig>): void {
    this.configuracaoSignal.update((config) => ({ ...config, ...novaConfig }));
  }

  definirPlacas(placas: Placa[]): void {
    this.placasSignal.set(placas);
    this.placasFiltradasSignal.set(placas);
  }

  filtrarPlacas(categoria?: number, termoPesquisa?: string): void {
    let placasFiltradas = this.placasAtuais;

    if (categoria !== undefined) {
      placasFiltradas = placasFiltradas.filter((p) =>
        p.pertenceCategoria(categoria)
      );
    }

    if (termoPesquisa) {
      placasFiltradas = placasFiltradas.filter((p) =>
        p.contemTermo(termoPesquisa)
      );
    }

    this.placasFiltradasSignal.set(placasFiltradas);
  }

  limparFiltros(): void {
    this.placasFiltradasSignal.set(this.placasAtuais);
  }

  resetarEstado(): void {
    this.estadoSignal.set(this.inicializarEstado());
    this.estatisticasSignal.set(this.inicializarEstatisticas());
  }

  resetarConfiguracao(): void {
    this.configuracaoSignal.set(this.inicializarConfiguracao());
  }

  // Métodos específicos para o quiz
  iniciarQuiz(): void {
    this.resetarEstado();
    this.atualizarEstado({
      totalQuestoes: 0,
      acertos: 0,
    });
  }

  finalizarQuiz(): void {
    const estadoAtual = this.estadoAtual;
    this.atualizarEstatisticas({
      acertos: estadoAtual.acertos,
    });
  }

  registrarResposta(resposta: string, acertou: boolean): void {
    const estadoAtual = this.estadoAtual;
    const estatisticasAtuais = this.estatisticasAtuais;

    this.atualizarEstado({
      respostaSelecionada: resposta,
      respostaRevelada: true,
      totalQuestoes: estadoAtual.totalQuestoes + 1,
    });

    if (acertou) {
      this.atualizarEstado({
        acertos: estadoAtual.acertos + 1,
      });
      this.atualizarEstatisticas({
        acertos: estatisticasAtuais.acertos + 1,
        sequenciaAtual: estatisticasAtuais.sequenciaAtual + 1,
      });
    } else {
      this.atualizarEstatisticas({
        erros: estatisticasAtuais.erros + 1,
        sequenciaAtual: 0,
      });
    }

    this.atualizarEstatisticas({
      precisao: this.calcularPrecisao(),
    });
  }

  private calcularPrecisao(): number {
    const estatisticas = this.estatisticasAtuais;
    const total = estatisticas.acertos + estatisticas.erros;
    return total > 0 ? (estatisticas.acertos / total) * 100 : 0;
  }
}
