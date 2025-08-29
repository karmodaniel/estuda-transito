import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import {
  QuizConfig,
  QuizEstado,
  QuizEstatisticas,
  QuizResultado,
} from '../interfaces/quiz.interface';

@Injectable({
  providedIn: 'root',
})
export class QuizStateService {
  private configSubject = new BehaviorSubject<QuizConfig>({
    categorias: [],
    categoriaSelecionada: '',
    numOpcoes: 4,
    mostrarEstatisticas: true,
    modoAleatorio: true,
  });

  private estadoSubject = new BehaviorSubject<QuizEstado>({
    questaoAtual: null,
    opcoes: [],
    respostaSelecionada: '',
    respostaCorreta: '',
    respostaRevelada: false,
    acertos: 0,
    totalQuestoes: 0,
  });

  private estatisticasSubject = new BehaviorSubject<QuizEstatisticas>({
    acertos: 0,
    erros: 0,
    precisao: 0,
    sequenciaAtual: 0,
    melhorSequencia: 0,
  });

  // Observables públicos
  config$ = this.configSubject.asObservable();
  estado$ = this.estadoSubject.asObservable();
  estatisticas$ = this.estatisticasSubject.asObservable();

  // Getters para valores atuais
  get config(): QuizConfig {
    return this.configSubject.value;
  }

  get estado(): QuizEstado {
    return this.estadoSubject.value;
  }

  get estatisticas(): QuizEstatisticas {
    return this.estatisticasSubject.value;
  }

  // Métodos para atualizar configuração
  atualizarConfig(config: Partial<QuizConfig>): void {
    this.configSubject.next({ ...this.config, ...config });
  }

  // Métodos para atualizar estado
  atualizarEstado(estado: Partial<QuizEstado>): void {
    this.estadoSubject.next({ ...this.estado, ...estado });
  }

  // Métodos para atualizar estatísticas
  atualizarEstatisticas(estatisticas: Partial<QuizEstatisticas>): void {
    this.estatisticasSubject.next({ ...this.estatisticas, ...estatisticas });
  }

  // Resetar estado
  resetarEstado(): void {
    this.estadoSubject.next({
      questaoAtual: null,
      opcoes: [],
      respostaSelecionada: '',
      respostaCorreta: '',
      respostaRevelada: false,
      acertos: 0,
      totalQuestoes: 0,
    });

    this.estatisticasSubject.next({
      acertos: 0,
      erros: 0,
      precisao: 0,
      sequenciaAtual: 0,
      melhorSequencia: 0,
    });
  }

  // Calcular resultado final
  calcularResultado(): QuizResultado {
    const { acertos, totalQuestoes, melhorSequencia } = this.estatisticas;
    const precisao = totalQuestoes > 0 ? (acertos / totalQuestoes) * 100 : 0;

    let performance: 'excellent' | 'good' | 'needs-improvement';
    if (precisao >= 80) {
      performance = 'excellent';
    } else if (precisao >= 60) {
      performance = 'good';
    } else {
      performance = 'needs-improvement';
    }

    return {
      acertos,
      totalQuestoes,
      precisao,
      melhorSequencia,
      performance,
    };
  }
}

