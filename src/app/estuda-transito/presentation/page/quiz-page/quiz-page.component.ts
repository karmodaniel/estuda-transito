import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzProgressModule } from 'ng-zorro-antd/progress';
import { NzResultModule } from 'ng-zorro-antd/result';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { QuizFacadeService } from '../../../abstraction/quiz-facade.service';
import { Placa } from '../../../domain/model/placa';

interface Questao {
  placa: Placa;
  opcoes: string[];
  respostaCorreta: string;
  respostaSelecionada?: string;
  respondida: boolean;
  acertou: boolean;
}

@Component({
  selector: 'app-quiz-page',
  templateUrl: './quiz-page.component.html',
  styleUrls: ['./quiz-page.component.less'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NzCardModule,
    NzIconModule,
    NzRadioModule,
    NzButtonModule,
    NzSpinModule,
    NzProgressModule,
    NzResultModule,
    NzToolTipModule,
  ],
})
export class QuizPageComponent implements OnInit {
  private readonly quizFacadeService = inject(QuizFacadeService);

  // Signals para estado do componente
  readonly loading = signal<boolean>(false);
  readonly quizIniciado = signal<boolean>(false);
  readonly quizFinalizado = signal<boolean>(false);
  readonly questoes = signal<Questao[]>([]);
  readonly questaoAtual = signal<number>(0);
  readonly pontuacao = signal<number>(0);
  readonly configQuiz = signal({
    categoriaSelecionada: '',
    numOpcoes: 4,
    modoAleatorio: true,
  });

  // Computed para valores derivados
  readonly totalQuestoes = computed(() => this.questoes().length);
  readonly progresso = computed(() =>
    this.questaoAtual() > 0
      ? (this.questaoAtual() / this.totalQuestoes()) * 100
      : 0
  );

  ngOnInit(): void {
    this.carregarConfiguracoes();
  }

  private carregarConfiguracoes(): void {
    // Aqui você pode carregar configurações salvas ou padrões
    this.configQuiz.set({
      categoriaSelecionada: '',
      numOpcoes: 4,
      modoAleatorio: true,
    });
  }

  iniciarQuiz(): void {
    this.loading.set(true);

    // Gerar questões baseado na configuração
    this.gerarQuestoes();

    this.quizIniciado.set(true);
    this.questaoAtual.set(0);
    this.pontuacao.set(0);
    this.loading.set(false);
  }

  private gerarQuestoes(): void {
    // Aqui você implementaria a lógica para gerar questões
    // Por enquanto, vamos criar questões de exemplo
    const questoesExemplo: Questao[] = [
      {
        placa: {
          codigo: 'A-1',
          nome: 'Placa de Advertência',
          descricao: 'Adverte sobre perigo à frente',
          categoria: 'A',
          imagem_url: '/assets/placas/A-1.jpg',
        } as Placa,
        opcoes: ['Advertência', 'Regulamentação', 'Indicação', 'Serviços'],
        respostaCorreta: 'Advertência',
        respondida: false,
        acertou: false,
      },
    ];

    this.questoes.set(questoesExemplo);
  }

  selecionarResposta(questao: Questao, opcao: string): void {
    if (questao.respondida) return;

    questao.respostaSelecionada = opcao;
    questao.respondida = true;
    questao.acertou = opcao === questao.respostaCorreta;

    if (questao.acertou) {
      this.pontuacao.update((pontos) => pontos + 1);
    }
  }

  proximaQuestao(): void {
    if (this.questaoAtual() < this.totalQuestoes() - 1) {
      this.questaoAtual.update((atual) => atual + 1);
    } else {
      this.finalizarQuiz();
    }
  }

  questaoAnterior(): void {
    if (this.questaoAtual() > 0) {
      this.questaoAtual.update((atual) => atual - 1);
    }
  }

  private finalizarQuiz(): void {
    this.quizFinalizado.set(true);
    this.quizIniciado.set(false);
  }

  reiniciarQuiz(): void {
    this.quizIniciado.set(false);
    this.quizFinalizado.set(false);
    this.questaoAtual.set(0);
    this.pontuacao.set(0);
    this.questoes.set([]);
  }

  getQuestaoAtual(): Questao | undefined {
    return this.questoes()[this.questaoAtual()];
  }

  getProgresso(): number {
    return this.progresso();
  }

  onImageError(event: Event): void {
    const img = event.target as HTMLImageElement;
    img.src = '/assets/placas/placeholder.jpg'; // Imagem padrão
  }
}
