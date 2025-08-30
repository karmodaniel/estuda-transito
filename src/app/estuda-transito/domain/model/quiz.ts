import {
  IQuizConfig,
  IQuizEstado,
  IQuizEstatisticas,
  IQuizResultado,
} from '../interface/quiz.interface';
import { Placa } from './placa';

export class Quiz {
  private configuracao: IQuizConfig;
  private estado: IQuizEstado;
  private estatisticas: IQuizEstatisticas;
  private placas: Placa[];
  private placasDisponiveis: Placa[];

  constructor(configuracao: IQuizConfig, placas: Placa[]) {
    this.configuracao = configuracao;
    this.placas = placas;
    this.placasDisponiveis = [...placas];
    this.estado = this.inicializarEstado();
    this.estatisticas = this.inicializarEstatisticas();
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

  iniciarQuiz(): void {
    this.estado = this.inicializarEstado();
    this.estatisticas = this.inicializarEstatisticas();
    this.gerarNovaQuestao();
  }

  gerarNovaQuestao(): void {
    if (this.placasDisponiveis.length === 0) {
      this.placasDisponiveis = [...this.placas];
    }

    const placaSelecionada = this.selecionarPlacaAleatoria();
    const opcoes = this.gerarOpcoes(placaSelecionada);

    this.estado.questaoAtual = placaSelecionada.codigo;
    this.estado.opcoes = opcoes;
    this.estado.respostaCorreta = placaSelecionada.nome;
    this.estado.respostaSelecionada = '';
    this.estado.respostaRevelada = false;
  }

  private selecionarPlacaAleatoria(): Placa {
    const indice = Math.floor(Math.random() * this.placasDisponiveis.length);
    const placa = this.placasDisponiveis[indice];
    this.placasDisponiveis.splice(indice, 1);
    return placa;
  }

  private gerarOpcoes(placaCorreta: Placa): string[] {
    const opcoes = [placaCorreta.nome];
    const outrasPlacas = this.placas.filter(
      (p) => p.codigo !== placaCorreta.codigo
    );

    while (
      opcoes.length < this.configuracao.numOpcoes &&
      outrasPlacas.length > 0
    ) {
      const indice = Math.floor(Math.random() * outrasPlacas.length);
      const placa = outrasPlacas.splice(indice, 1)[0];
      if (!opcoes.includes(placa.nome)) {
        opcoes.push(placa.nome);
      }
    }

    return this.embaralharArray(opcoes);
  }

  private embaralharArray<T>(array: T[]): T[] {
    const copia = [...array];
    for (let i = copia.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copia[i], copia[j]] = [copia[j], copia[i]];
    }
    return copia;
  }

  selecionarResposta(resposta: string): void {
    this.estado.respostaSelecionada = resposta;
  }

  verificarResposta(): boolean {
    const acertou =
      this.estado.respostaSelecionada === this.estado.respostaCorreta;
    this.estado.respostaRevelada = true;

    if (acertou) {
      this.estado.acertos++;
      this.estatisticas.acertos++;
      this.estatisticas.sequenciaAtual++;
      if (
        this.estatisticas.sequenciaAtual > this.estatisticas.melhorSequencia
      ) {
        this.estatisticas.melhorSequencia = this.estatisticas.sequenciaAtual;
      }
    } else {
      this.estatisticas.erros++;
      this.estatisticas.sequenciaAtual = 0;
    }

    this.estatisticas.precisao = this.calcularPrecisao();
    this.estado.totalQuestoes++;

    return acertou;
  }

  private calcularPrecisao(): number {
    const total = this.estatisticas.acertos + this.estatisticas.erros;
    return total > 0 ? (this.estatisticas.acertos / total) * 100 : 0;
  }

  obterEstado(): IQuizEstado {
    return { ...this.estado };
  }

  obterEstatisticas(): IQuizEstatisticas {
    return { ...this.estatisticas };
  }

  obterResultado(): IQuizResultado {
    const precisao = this.estatisticas.precisao;
    let performance: 'excellent' | 'good' | 'needs-improvement';

    if (precisao >= 90) performance = 'excellent';
    else if (precisao >= 70) performance = 'good';
    else performance = 'needs-improvement';

    return {
      acertos: this.estatisticas.acertos,
      totalQuestoes: this.estado.totalQuestoes,
      precisao: precisao,
      melhorSequencia: this.estatisticas.melhorSequencia,
      performance: performance,
    };
  }

  alterarConfiguracao(novaConfig: Partial<IQuizConfig>): void {
    this.configuracao = { ...this.configuracao, ...novaConfig };
  }

  obterConfiguracao(): IQuizConfig {
    return { ...this.configuracao };
  }
}
