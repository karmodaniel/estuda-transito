export class ArrayUtil {
  /**
   * Embaralha um array usando o algoritmo Fisher-Yates
   */
  static embaralhar<T>(array: T[]): T[] {
    const copia = [...array];
    for (let i = copia.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copia[i], copia[j]] = [copia[j], copia[i]];
    }
    return copia;
  }

  /**
   * Remove elementos duplicados de um array
   */
  static removerDuplicados<T>(array: T[]): T[] {
    return [...new Set(array)];
  }

  /**
   * Agrupa elementos de um array por uma chave específica
   */
  static agruparPor<T, K extends keyof T>(
    array: T[],
    chave: K
  ): Record<string, T[]> {
    return array.reduce((grupos, item) => {
      const valorChave = String(item[chave]);
      if (!grupos[valorChave]) {
        grupos[valorChave] = [];
      }
      grupos[valorChave].push(item);
      return grupos;
    }, {} as Record<string, T[]>);
  }

  /**
   * Filtra um array por múltiplas condições
   */
  static filtrarPor<T>(array: T[], filtros: Partial<T>): T[] {
    return array.filter((item) => {
      return Object.entries(filtros).every(([chave, valor]) => {
        if (valor === undefined || valor === null) return true;
        return item[chave as keyof T] === valor;
      });
    });
  }

  /**
   * Ordena um array por múltiplas chaves
   */
  static ordenarPor<T>(
    array: T[],
    chaves: Array<{ chave: keyof T; direcao: 'asc' | 'desc' }>
  ): T[] {
    return [...array].sort((a, b) => {
      for (const { chave, direcao } of chaves) {
        const valorA = a[chave];
        const valorB = b[chave];

        if (valorA < valorB) return direcao === 'asc' ? -1 : 1;
        if (valorA > valorB) return direcao === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }

  /**
   * Divide um array em chunks de tamanho específico
   */
  static dividirEmChunks<T>(array: T[], tamanhoChunk: number): T[][] {
    const chunks: T[][] = [];
    for (let i = 0; i < array.length; i += tamanhoChunk) {
      chunks.push(array.slice(i, i + tamanhoChunk));
    }
    return chunks;
  }

  /**
   * Obtém elementos aleatórios de um array
   */
  static obterElementosAleatorios<T>(array: T[], quantidade: number): T[] {
    if (quantidade >= array.length) return [...array];

    const indices = Array.from({ length: array.length }, (_, i) => i);
    const indicesAleatorios = this.embaralhar(indices).slice(0, quantidade);

    return indicesAleatorios.map((indice) => array[indice]);
  }

  /**
   * Verifica se dois arrays são iguais (mesmos elementos na mesma ordem)
   */
  static saoIguais<T>(array1: T[], array2: T[]): boolean {
    if (array1.length !== array2.length) return false;
    return array1.every((item, index) => item === array2[index]);
  }

  /**
   * Verifica se dois arrays contêm os mesmos elementos (ordem não importa)
   */
  static contemMesmosElementos<T>(array1: T[], array2: T[]): boolean {
    if (array1.length !== array2.length) return false;

    const contagem1 = this.contarElementos(array1);
    const contagem2 = this.contarElementos(array2);

    return (
      this.saoIguais(Object.keys(contagem1), Object.keys(contagem2)) &&
      Object.keys(contagem1).every(
        (chave) => contagem1[chave] === contagem2[chave]
      )
    );
  }

  /**
   * Conta a ocorrência de cada elemento em um array
   */
  static contarElementos<T>(array: T[]): Record<string, number> {
    return array.reduce((contagem, item) => {
      const chave = String(item);
      contagem[chave] = (contagem[chave] || 0) + 1;
      return contagem;
    }, {} as Record<string, number>);
  }

  /**
   * Encontra o elemento mais frequente em um array
   */
  static elementoMaisFrequente<T>(array: T[]): T | null {
    if (array.length === 0) return null;

    const contagem = this.contarElementos(array);
    const elementoMaisFrequente = Object.entries(contagem).reduce(
      (maisFrequente, [elemento, contagem]) => {
        return contagem > maisFrequente.contagem
          ? { elemento, contagem }
          : maisFrequente;
      },
      { elemento: '', contagem: 0 }
    );

    return elementoMaisFrequente.elemento as T;
  }

  /**
   * Calcula a média dos valores numéricos em um array
   */
  static calcularMedia(array: number[]): number {
    if (array.length === 0) return 0;
    return array.reduce((soma, valor) => soma + valor, 0) / array.length;
  }

  /**
   * Encontra o valor máximo em um array
   */
  static encontrarMaximo(array: number[]): number | null {
    if (array.length === 0) return null;
    return Math.max(...array);
  }

  /**
   * Encontra o valor mínimo em um array
   */
  static encontrarMinimo(array: number[]): number | null {
    if (array.length === 0) return null;
    return Math.min(...array);
  }
}
