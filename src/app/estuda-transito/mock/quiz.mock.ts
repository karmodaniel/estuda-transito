import {
  QuizResponse,
  QuestaoResponse,
  QuizResultadoResponse,
  EstatisticaQuizResponse,
} from '@infrastructure/api/contract/response/quiz.response';
import { IQuizConfig } from '@domain/interface/quiz.interface';
import { DificuldadeQuizEnum, ModoQuizEnum } from '@domain/enum/modo-quiz.enum';

export const QUIZ_CONFIG_MOCK: IQuizConfig = {
  categorias: ['A', 'R', 'I', 'S'],
  categoriaSelecionada: 'A',
  numOpcoes: 4,
  mostrarEstatisticas: true,
  modoAleatorio: true,
};

export const QUIZ_RESPONSE_MOCK = new QuizResponse({
  id: 'quiz-001',
  categoria: 'A',
  dificuldade: DificuldadeQuizEnum.MEDIO,
  numeroQuestoes: 10,
  modo: ModoQuizEnum.TREINO,
  tempoLimite: undefined,
  status: 'ativo',
  dataCriacao: '2024-01-01T10:00:00Z',
});

export const QUESTAO_MOCK = new QuestaoResponse({
  id: 'questao-001',
  codigoPlaca: 'A-1a',
  opcoes: [
    'Curva à Esquerda',
    'Curva à Direita',
    'Parada Obrigatória',
    'Posto de Abastecimento',
  ],
  respostaCorreta: 'Curva à Esquerda',
  dica: 'Placa triangular amarela com seta apontando para a esquerda',
  tempoLimite: 30,
});

export const QUESTAO_MOCK_2 = new QuestaoResponse({
  id: 'questao-002',
  codigoPlaca: 'R-1',
  opcoes: [
    'Parada Obrigatória',
    'Dê a Preferência',
    'Proibido Estacionar',
    'Velocidade Máxima',
  ],
  respostaCorreta: 'Parada Obrigatória',
  dica: 'Placa octogonal vermelha com a palavra "PARE"',
  tempoLimite: 30,
});

export const QUESTAO_MOCK_3 = new QuestaoResponse({
  id: 'questao-003',
  codigoPlaca: 'I-1',
  opcoes: ['Posto de Abastecimento', 'Restaurante', 'Hotel', 'Hospital'],
  respostaCorreta: 'Posto de Abastecimento',
  dica: 'Placa azul com símbolo de bomba de combustível',
  tempoLimite: 30,
});

export const QUESTOES_MOCK: QuestaoResponse[] = [
  QUESTAO_MOCK,
  QUESTAO_MOCK_2,
  QUESTAO_MOCK_3,
];

export const QUIZ_RESULTADO_MOCK = new QuizResultadoResponse({
  id: 'resultado-001',
  quizId: 'quiz-001',
  acertos: 8,
  totalQuestoes: 10,
  precisao: 80,
  tempoTotal: 245,
  melhorSequencia: 5,
  performance: 'good',
  dataFinalizacao: '2024-01-01T10:15:00Z',
});

export const ESTATISTICA_QUIZ_MOCK = new EstatisticaQuizResponse({
  totalQuizzes: 25,
  mediaAcertos: 7.2,
  melhorSequencia: 8,
  tempoMedio: 280,
  categoriaMaisAcertada: 'Advertência',
  categoriaMenosAcertada: 'Sinalização',
});

export const QUIZ_ESTADO_MOCK = {
  questaoAtual: 'A-1a',
  opcoes: [
    'Curva à Esquerda',
    'Curva à Direita',
    'Parada Obrigatória',
    'Posto de Abastecimento',
  ],
  respostaSelecionada: '',
  respostaCorreta: 'Curva à Esquerda',
  respostaRevelada: false,
  acertos: 0,
  totalQuestoes: 0,
};

export const QUIZ_ESTATISTICAS_MOCK = {
  acertos: 0,
  erros: 0,
  precisao: 0,
  sequenciaAtual: 0,
  melhorSequencia: 0,
};

export const QUIZ_CONFIGURACOES_MOCK = {
  facil: {
    numOpcoes: 3,
    tempoLimite: 45,
    mostrarDicas: true,
  },
  medio: {
    numOpcoes: 4,
    tempoLimite: 30,
    mostrarDicas: true,
  },
  dificil: {
    numOpcoes: 5,
    tempoLimite: 20,
    mostrarDicas: false,
  },
};
