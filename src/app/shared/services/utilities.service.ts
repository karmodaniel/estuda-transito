import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UtilitiesService {
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

  getOptionLetter(index: number): string {
    return String.fromCharCode(65 + index);
  }

  onImageError(
    event: any,
    fallbackImage: string = 'assets/placeholder-placa.jpg'
  ): void {
    event.target.src = fallbackImage;
  }

  formatarPercentual(valor: number): string {
    return `${valor.toFixed(1)}%`;
  }

  getPerformanceMessage(
    performance: 'excellent' | 'good' | 'needs-improvement'
  ): string {
    const mensagens = {
      excellent:
        '🎉 Excelente! Você demonstrou um conhecimento excepcional sobre placas de trânsito!',
      good: '👍 Bom trabalho! Você tem um bom conhecimento sobre placas de trânsito.',
      'needs-improvement': '📚 Continue estudando! A prática leva à perfeição.',
    };
    return mensagens[performance];
  }
}

