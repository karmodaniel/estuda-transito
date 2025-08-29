import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzProgressModule } from 'ng-zorro-antd/progress';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { PlacasService } from '../../services/placas.service';
import { Placa } from '../../shared/interfaces/placa.interface';

interface Questao {
  placa: Placa;
  opcoes: string[];
  respostaCorreta: string;
  respostaSelecionada?: string;
  respondida: boolean;
  acertou?: boolean;
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
    NzSpinModule,
    NzDescriptionsModule,
    NzIconModule,
    NzButtonModule,
    NzProgressModule,
    NzRadioModule,
    NzAlertModule
  ]
})
export class QuizPageComponent implements OnInit {
  placas: Placa[] = [];
  questoes: Questao[] = [];
  questaoAtual: number = 0;
  loading: boolean = false;
  quizIniciado: boolean = false;
  quizFinalizado: boolean = false;
  pontuacao: number = 0;
  totalQuestoes: number = 10;

  constructor(private placasService: PlacasService) {}

  ngOnInit(): void {
    this.carregarPlacas();
  }

  carregarPlacas(): void {
    this.loading = true;
    this.placasService.getPlacas().subscribe({
      next: (placas) => {
        this.placas = placas;
        this.loading = false;
      },
      error: (error) => {
        console.error('Erro ao carregar placas:', error);
        this.loading = false;
      },
    });
  }

  iniciarQuiz(): void {
    this.quizIniciado = true;
    this.quizFinalizado = false;
    this.questaoAtual = 0;
    this.pontuacao = 0;
    this.gerarQuestoes();
  }

  gerarQuestoes(): void {
    // Embaralhar placas e pegar as primeiras
    const placasEmbaralhadas = this.embaralharArray([...this.placas]);
    const placasSelecionadas = placasEmbaralhadas.slice(0, this.totalQuestoes);

    this.questoes = placasSelecionadas.map((placa) => {
      // Gerar opções incorretas
      const opcoesIncorretas = this.gerarOpcoesIncorretas(
        placa,
        placasEmbaralhadas
      );

      // Embaralhar todas as opções
      const todasOpcoes = [placa.nome, ...opcoesIncorretas];
      const opcoesEmbaralhadas = this.embaralharArray(todasOpcoes);

      return {
        placa: placa,
        opcoes: opcoesEmbaralhadas,
        respostaCorreta: placa.nome,
        respondida: false,
      };
    });
  }

  gerarOpcoesIncorretas(placaCorreta: Placa, todasPlacas: Placa[]): string[] {
    const opcoesIncorretas: string[] = [];
    const placasFiltradas = todasPlacas.filter(
      (p) => p.codigo !== placaCorreta.codigo
    );

    // Embaralhar e pegar 3 opções diferentes
    const embaralhadas = this.embaralharArray([...placasFiltradas]);

    for (let i = 0; i < 3 && i < embaralhadas.length; i++) {
      opcoesIncorretas.push(embaralhadas[i].nome);
    }

    return opcoesIncorretas;
  }

  embaralharArray<T>(array: T[]): T[] {
    const novoArray = [...array];
    for (let i = novoArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [novoArray[i], novoArray[j]] = [novoArray[j], novoArray[i]];
    }
    return novoArray;
  }

  selecionarResposta(questao: Questao, resposta: string): void {
    if (questao.respondida) return;

    questao.respostaSelecionada = resposta;
    questao.respondida = true;
    questao.acertou = resposta === questao.respostaCorreta;

    if (questao.acertou) {
      this.pontuacao++;
    }
  }

  proximaQuestao(): void {
    if (this.questaoAtual < this.questoes.length - 1) {
      this.questaoAtual++;
    } else {
      this.finalizarQuiz();
    }
  }

  questaoAnterior(): void {
    if (this.questaoAtual > 0) {
      this.questaoAtual--;
    }
  }

  finalizarQuiz(): void {
    this.quizFinalizado = true;
  }

  reiniciarQuiz(): void {
    this.quizIniciado = false;
    this.quizFinalizado = false;
    this.questaoAtual = 0;
    this.pontuacao = 0;
    this.questoes = [];
  }

  getProgresso(): number {
    return ((this.questaoAtual + 1) / this.questoes.length) * 100;
  }

  getQuestaoAtual(): Questao | null {
    return this.questoes[this.questaoAtual] || null;
  }

  onImageError(event: any): void {
    event.target.src = 'assets/placeholder-placa.jpg';
  }
}

