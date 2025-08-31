import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { Placa } from '../../../domain/model/placa';
import { PlacaFacadeService } from '../../../abstraction/placa-facade.service';

interface Questao {
  placa: Placa;
  opcoes: string[];
  respostaCorreta: string;
}

interface ResultadoQuiz {
  totalQuestoes: number;
  acertos: number;
  erros: number;
  percentualAcertos: number;
}

@Component({
  selector: 'app-quiz-page',
  templateUrl: './quiz-page.component.html',
  styleUrls: ['./quiz-page.component.less'],
  standalone: true,
  imports: [CommonModule],
})
export class QuizPageComponent implements OnInit {
  private readonly router = inject(Router);
  private readonly placaFacadeService = inject(PlacaFacadeService);

  // Estados do componente
  readonly sidebarCollapsed = signal(false);
  readonly questoes = signal<Questao[]>([]);
  readonly questaoAtualIndex = signal(0);
  readonly respostaSelecionada = signal<string | null>(null);
  readonly quizFinalizado = signal(false);
  readonly resultadoQuiz = signal<ResultadoQuiz | null>(null);
  readonly loading = signal(false);

  // Computed properties
  readonly questaoAtual = computed(
    () => this.questoes()[this.questaoAtualIndex()]
  );

  ngOnInit(): void {
    this.inicializarQuiz();
  }

  private async inicializarQuiz(): Promise<void> {
    this.loading.set(true);

    try {
      // Buscar todas as placas do serviço
      const placas = await firstValueFrom(
        this.placaFacadeService.carregarPlacas()
      );

      if (placas && placas.length > 0) {
        // Criar 10 questões aleatórias a partir das placas reais
        const questoesAleatorias = this.gerarQuestoesAleatorias(placas, 10);
        this.questoes.set(questoesAleatorias);
      }

      this.questaoAtualIndex.set(0);
      this.respostaSelecionada.set(null);
      this.quizFinalizado.set(false);
      this.resultadoQuiz.set(null);
    } catch (error) {
      console.error('Erro ao carregar placas:', error);
    } finally {
      this.loading.set(false);
    }
  }

  private gerarQuestoesAleatorias(
    placas: Placa[],
    quantidade: number
  ): Questao[] {
    // Embaralhar as placas
    const placasEmbaralhadas = this.embaralharArray([...placas]);

    // Pegar apenas a quantidade necessária
    const placasSelecionadas = placasEmbaralhadas.slice(0, quantidade);

    // Gerar opções para cada placa
    return placasSelecionadas.map((placa) => {
      const opcoes = this.gerarOpcoesAleatorias(placa, placas);
      return {
        placa,
        opcoes,
        respostaCorreta: placa.obterNome(),
      };
    });
  }

  private gerarOpcoesAleatorias(
    placaCorreta: Placa,
    todasPlacas: Placa[]
  ): string[] {
    // Pegar nomes de outras placas para opções incorretas
    const nomesOutrasPlacas = todasPlacas
      .filter((placa) => placa.obterNome() !== placaCorreta.obterNome())
      .map((placa) => placa.obterNome());

    // Embaralhar e pegar 3 opções incorretas
    const opcoesIncorretas = this.embaralharArray([...nomesOutrasPlacas]).slice(
      0,
      3
    );

    // Adicionar a resposta correta e embaralhar tudo
    const opcoesFinais = [...opcoesIncorretas, placaCorreta.obterNome()];
    return this.embaralharArray(opcoesFinais);
  }

  private embaralharArray<T>(array: T[]): T[] {
    const novoArray = [...array];
    for (let i = novoArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [novoArray[i], novoArray[j]] = [novoArray[j], novoArray[i]];
    }
    return novoArray;
  }

  toggleSidebar(): void {
    this.sidebarCollapsed.update((collapsed) => !collapsed);
  }

  voltar(): void {
    this.router.navigate(['/estuda-transito']);
  }

  selecionarResposta(opcao: string): void {
    if (!this.respostaSelecionada()) {
      this.respostaSelecionada.set(opcao);
    }
  }

  proximaQuestao(): void {
    if (this.questaoAtualIndex() < this.questoes().length - 1) {
      this.questaoAtualIndex.update((index) => index + 1);
      this.respostaSelecionada.set(null);
    } else {
      this.finalizarQuiz();
    }
  }

  private finalizarQuiz(): void {
    const acertos = this.questoes().reduce((total, questao, index) => {
      // Simular resposta correta para questões não respondidas
      const resposta =
        index === this.questaoAtualIndex()
          ? this.respostaSelecionada()
          : questao.respostaCorreta;
      return total + (resposta === questao.respostaCorreta ? 1 : 0);
    }, 0);

    const totalQuestoes = this.questoes().length;
    const erros = totalQuestoes - acertos;
    const percentualAcertos = (acertos / totalQuestoes) * 100;

    this.resultadoQuiz.set({
      totalQuestoes,
      acertos,
      erros,
      percentualAcertos,
    });

    this.quizFinalizado.set(true);
  }

  recomecarQuiz(): void {
    this.inicializarQuiz();
  }

  obterLetraOpcao(index: number): string {
    return String.fromCharCode(65 + index); // A, B, C, D...
  }
}
