import { Injectable } from '@angular/core';
import { Placa } from '../interfaces/placa.interface';

@Injectable({
  providedIn: 'root',
})
export class QuizLogicService {
  gerarOpcoes(
    placaCorreta: Placa,
    placasDisponiveis: Placa[],
    numOpcoes: number
  ): string[] {
    const opcoes = [placaCorreta.nome];

    // Gerar opções incorretas
    const placasRestantes = placasDisponiveis.filter(
      (p) => p.codigo !== placaCorreta.codigo && !opcoes.includes(p.nome)
    );

    while (opcoes.length < numOpcoes && placasRestantes.length > 0) {
      const indiceAleatorio = Math.floor(
        Math.random() * placasRestantes.length
      );
      const placaAleatoria = placasRestantes[indiceAleatorio];

      if (!opcoes.includes(placaAleatoria.nome)) {
        opcoes.push(placaAleatoria.nome);
      }

      placasRestantes.splice(indiceAleatorio, 1);
    }

    return this.embaralharArray(opcoes);
  }

  selecionarPlacaAleatoria(placas: Placa[]): Placa | null {
    if (placas.length === 0) return null;

    const indiceAleatorio = Math.floor(Math.random() * placas.length);
    return placas[indiceAleatorio];
  }

  removerPlacaDaLista(placas: Placa[], placa: Placa): Placa[] {
    return placas.filter((p) => p.codigo !== placa.codigo);
  }

  calcularProgresso(placasUsadas: number, totalPlacas: number): number {
    if (totalPlacas <= 1) return 0;
    return ((placasUsadas - 1) / (totalPlacas - 1)) * 100;
  }

  calcularPrecisao(acertos: number, totalQuestoes: number): number {
    return totalQuestoes > 0 ? (acertos / totalQuestoes) * 100 : 0;
  }

  private embaralharArray<T>(array: T[]): T[] {
    const novoArray = [...array];
    for (let i = novoArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [novoArray[i], novoArray[j]] = [novoArray[j], novoArray[i]];
    }
    return novoArray;
  }
}

