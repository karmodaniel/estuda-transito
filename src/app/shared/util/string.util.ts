export class StringUtil {
  /**
   * Capitaliza a primeira letra de uma string
   */
  static capitalizar(texto: string): string {
    if (!texto) return texto;
    return texto.charAt(0).toUpperCase() + texto.slice(1).toLowerCase();
  }

  /**
   * Remove acentos de uma string
   */
  static removerAcentos(texto: string): string {
    return texto.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  }

  /**
   * Normaliza uma string para busca (remove acentos e converte para minúsculas)
   */
  static normalizarParaBusca(texto: string): string {
    return this.removerAcentos(texto.toLowerCase().trim());
  }

  /**
   * Verifica se uma string contém outra, ignorando acentos e case
   */
  static contemIgnorandoAcentos(texto: string, termo: string): boolean {
    const textoNormalizado = this.normalizarParaBusca(texto);
    const termoNormalizado = this.normalizarParaBusca(termo);
    return textoNormalizado.includes(termoNormalizado);
  }

  /**
   * Trunca uma string se exceder o comprimento máximo
   */
  static truncar(
    texto: string,
    maxLength: number,
    sufixo: string = '...'
  ): string {
    if (texto.length <= maxLength) return texto;
    return texto.substring(0, maxLength - sufixo.length) + sufixo;
  }

  /**
   * Formata um número com separadores de milhares
   */
  static formatarNumero(numero: number): string {
    return numero.toLocaleString('pt-BR');
  }

  /**
   * Formata uma porcentagem
   */
  static formatarPorcentagem(valor: number, casasDecimais: number = 1): string {
    return `${valor.toFixed(casasDecimais)}%`;
  }

  /**
   * Gera um slug a partir de uma string
   */
  static gerarSlug(texto: string): string {
    return this.removerAcentos(texto)
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  }

  /**
   * Verifica se uma string está vazia ou contém apenas espaços
   */
  static estaVazio(texto: string): boolean {
    return !texto || texto.trim().length === 0;
  }

  /**
   * Conta o número de palavras em uma string
   */
  static contarPalavras(texto: string): number {
    if (this.estaVazio(texto)) return 0;
    return texto.trim().split(/\s+/).length;
  }
}

