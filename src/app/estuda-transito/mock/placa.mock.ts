import {
  PlacaResponse,
  CategoriaResponse,
} from '@infrastructure/api/contract/response/placa.response';
import { CategoriaPlacaEnum } from '@domain/enum/categoria-placa.enum';

export const PLACAS_MOCK: PlacaResponse[] = [
  new PlacaResponse({
    codigo: 'A-1a',
    nome: 'Curva à Esquerda',
    descricao: 'Indica curva à esquerda na via',
    categoria: CategoriaPlacaEnum.ADVERTENCIA,
    nome_imagem: 'A-1a.jpg',
    imagem_arquivo: 'assets/placas/A-1a.jpg',
    imagem_url: 'assets/placas/A-1a.jpg',
    ativa: true,
    dataCriacao: '2024-01-01T00:00:00Z',
    dataAtualizacao: '2024-01-01T00:00:00Z',
  }),
  new PlacaResponse({
    codigo: 'A-1b',
    nome: 'Curva à Direita',
    descricao: 'Indica curva à direita na via',
    categoria: CategoriaPlacaEnum.ADVERTENCIA,
    nome_imagem: 'A-1b.jpg',
    imagem_arquivo: 'assets/placas/A-1b.jpg',
    imagem_url: 'assets/placas/A-1b.jpg',
    ativa: true,
    dataCriacao: '2024-01-01T00:00:00Z',
    dataAtualizacao: '2024-01-01T00:00:00Z',
  }),
  new PlacaResponse({
    codigo: 'R-1',
    nome: 'Parada Obrigatória',
    descricao: 'Obriga a parada do veículo',
    categoria: CategoriaPlacaEnum.REGULAMENTACAO,
    nome_imagem: 'R-1.jpg',
    imagem_arquivo: 'assets/placas/R-1.jpg',
    imagem_url: 'assets/placas/R-1.jpg',
    ativa: true,
    dataCriacao: '2024-01-01T00:00:00Z',
    dataAtualizacao: '2024-01-01T00:00:00Z',
  }),
  new PlacaResponse({
    codigo: 'I-1',
    nome: 'Posto de Abastecimento',
    descricao: 'Indica localização de posto de combustível',
    categoria: CategoriaPlacaEnum.INFORMACAO,
    nome_imagem: 'I-1.jpg',
    imagem_arquivo: 'assets/placas/I-1.jpg',
    imagem_url: 'assets/placas/I-1.jpg',
    ativa: true,
    dataCriacao: '2024-01-01T00:00:00Z',
    dataAtualizacao: '2024-01-01T00:00:00Z',
  }),
  new PlacaResponse({
    codigo: 'S-1',
    nome: 'Faixa de Pedestres',
    descricao: 'Indica faixa de travessia de pedestres',
    categoria: CategoriaPlacaEnum.SINALIZACAO,
    nome_imagem: 'S-1.jpg',
    imagem_arquivo: 'assets/placas/S-1.jpg',
    imagem_url: 'assets/placas/S-1.jpg',
    ativa: true,
    dataCriacao: '2024-01-01T00:00:00Z',
    dataAtualizacao: '2024-01-01T00:00:00Z',
  }),
];

export const CATEGORIAS_MOCK = [
  new CategoriaResponse({
    codigo: CategoriaPlacaEnum.ADVERTENCIA,
    nome: 'Advertência',
    descricao: 'Placas que alertam sobre condições da via',
    quantidadePlacas: 48,
  }),
  new CategoriaResponse({
    codigo: CategoriaPlacaEnum.REGULAMENTACAO,
    nome: 'Regulamentação',
    descricao: 'Placas que estabelecem regras de trânsito',
    quantidadePlacas: 40,
  }),
  new CategoriaResponse({
    codigo: CategoriaPlacaEnum.INFORMACAO,
    nome: 'Informação',
    descricao: 'Placas que informam sobre serviços e locais',
    quantidadePlacas: 5,
  }),
  new CategoriaResponse({
    codigo: CategoriaPlacaEnum.SINALIZACAO,
    nome: 'Sinalização',
    descricao: 'Placas que orientam o tráfego',
    quantidadePlacas: 16,
  }),
];

export const PLACA_INDIVIDUAL_MOCK: PlacaResponse = PLACAS_MOCK[0];

export const PLACAS_FILTRADAS_MOCK = {
  categoria: CategoriaPlacaEnum.ADVERTENCIA,
  placas: PLACAS_MOCK.filter(
    (p) => p.categoria === CategoriaPlacaEnum.ADVERTENCIA
  ),
};
