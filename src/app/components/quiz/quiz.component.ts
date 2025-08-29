import { Component, OnInit } from '@angular/core';
import { PlacasService } from '../../services/placas.service';
import { Placa } from '../../shared/interfaces/placa.interface';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.less'],
})
export class QuizComponent implements OnInit {
  placas: Placa[] = [];
  placasDisponiveis: Placa[] = [];
  placasUsadas: Placa[] = [];

  // Estado do quiz
  questaoAtual: Placa | null = null;
  opcoes: string[] = [];
  respostaSelecionada: string = '';
  respostaCorreta: string = '';
  respostaRevelada: boolean = false;
  acertos: number = 0;
  totalQuestoes: number = 0;

  // Configurações do quiz
  configQuiz = {
    categorias: [] as string[],
    categoriaSelecionada: '',
    numOpcoes: 4,
    mostrarEstatisticas: true,
    modoAleatorio: true,
  };

  // Estatísticas
  estatisticas = {
    acertos: 0,
    erros: 0,
    precisao: 0,
    sequenciaAtual: 0,
    melhorSequencia: 0,
  };

  loading: boolean = false;
  quizIniciado: boolean = false;
  quizFinalizado: boolean = false;

  constructor(private placasService: PlacasService) {}

  ngOnInit(): void {
    this.carregarPlacas();
    this.configQuiz.categorias = this.placasService.getCategorias();
  }

  carregarPlacas(): void {
    this.loading = true;
    this.placasService.getPlacas().subscribe({
      next: (placas) => {
        this.placas = placas;
        this.placasDisponiveis = [...placas];
        this.loading = false;
      },
      error: (error) => {
        console.error('Erro ao carregar placas:', error);
        this.loading = false;
      },
    });
  }

  iniciarQuiz(): void {
    if (this.configQuiz.categoriaSelecionada) {
      this.placasDisponiveis = this.placas.filter(
        (p) => p.categoria === this.configQuiz.categoriaSelecionada
      );
    } else {
      this.placasDisponiveis = [...this.placas];
    }

    this.quizIniciado = true;
    this.quizFinalizado = false;
    this.acertos = 0;
    this.totalQuestoes = 0;
    this.placasUsadas = [];
    this.estatisticas = {
      acertos: 0,
      erros: 0,
      precisao: 0,
      sequenciaAtual: 0,
      melhorSequencia: 0,
    };

    this.gerarNovaQuestao();
  }

  gerarNovaQuestao(): void {
    if (this.placasDisponiveis.length === 0) {
      this.finalizarQuiz();
      return;
    }

    // Selecionar placa aleatória
    const indiceAleatorio = Math.floor(
      Math.random() * this.placasDisponiveis.length
    );
    this.questaoAtual = this.placasDisponiveis[indiceAleatorio];

    // Remover placa da lista disponível
    this.placasDisponiveis.splice(indiceAleatorio, 1);
    this.placasUsadas.push(this.questaoAtual);

    // Gerar opções
    this.gerarOpcoes();

    // Resetar estado
    this.respostaSelecionada = '';
    this.respostaRevelada = false;
    this.totalQuestoes++;
  }

  gerarOpcoes(): void {
    if (!this.questaoAtual) return;

    this.opcoes = [this.questaoAtual.nome];
    this.respostaCorreta = this.questaoAtual.nome;

    // Gerar opções incorretas
    const placasRestantes = this.placas.filter(
      (p) =>
        p.codigo !== this.questaoAtual?.codigo && !this.opcoes.includes(p.nome)
    );

    while (
      this.opcoes.length < this.configQuiz.numOpcoes &&
      placasRestantes.length > 0
    ) {
      const indiceAleatorio = Math.floor(
        Math.random() * placasRestantes.length
      );
      const placaAleatoria = placasRestantes[indiceAleatorio];

      if (!this.opcoes.includes(placaAleatoria.nome)) {
        this.opcoes.push(placaAleatoria.nome);
      }

      placasRestantes.splice(indiceAleatorio, 1);
    }

    // Embaralhar opções
    this.opcoes = this.embaralharArray(this.opcoes);
  }

  embaralharArray(array: string[]): string[] {
    const novoArray = [...array];
    for (let i = novoArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [novoArray[i], novoArray[j]] = [novoArray[j], novoArray[i]];
    }
    return novoArray;
  }

  selecionarResposta(resposta: string): void {
    if (this.respostaRevelada) return;
    this.respostaSelecionada = resposta;
  }

  verificarResposta(): void {
    if (!this.respostaSelecionada || this.respostaRevelada) return;

    this.respostaRevelada = true;

    if (this.respostaSelecionada === this.respostaCorreta) {
      this.acertos++;
      this.estatisticas.acertos++;
      this.estatisticas.sequenciaAtual++;
      this.estatisticas.melhorSequencia = Math.max(
        this.estatisticas.melhorSequencia,
        this.estatisticas.sequenciaAtual
      );
    } else {
      this.estatisticas.erros++;
      this.estatisticas.sequenciaAtual = 0;
    }

    this.estatisticas.precisao =
      (this.estatisticas.acertos /
        (this.estatisticas.acertos + this.estatisticas.erros)) *
      100;
  }

  proximaQuestao(): void {
    if (this.placasDisponiveis.length === 0) {
      this.finalizarQuiz();
    } else {
      this.gerarNovaQuestao();
    }
  }

  finalizarQuiz(): void {
    this.quizFinalizado = true;
    this.questaoAtual = null;
  }

  reiniciarQuiz(): void {
    this.quizIniciado = false;
    this.quizFinalizado = false;
    this.questaoAtual = null;
    this.opcoes = [];
    this.respostaSelecionada = '';
    this.respostaRevelada = false;
    this.acertos = 0;
    this.totalQuestoes = 0;
    this.placasDisponiveis = [...this.placas];
    this.placasUsadas = [];
    this.estatisticas = {
      acertos: 0,
      erros: 0,
      precisao: 0,
      sequenciaAtual: 0,
      melhorSequencia: 0,
    };
  }

  alterarCategoria(categoria: string): void {
    this.configQuiz.categoriaSelecionada = categoria;
  }

  getNomeCategoria(codigo: string): string {
    return this.placasService.getNomeCategoria(codigo);
  }

  getCategoriaColor(categoria: string): string {
    if (!categoria || categoria.trim() === '') {
      return 'default';
    }
    
    const cores: { [key: string]: string } = {
      R: 'red',
      A: 'orange',
      I: 'blue',
      S: 'green',
    };
    return cores[categoria] || 'default';
  }

  onImageError(event: any): void {
    event.target.src = 'assets/placeholder-placa.jpg';
  }

  getOptionLetter(index: number): string {
    return String.fromCharCode(65 + index);
  }
}
