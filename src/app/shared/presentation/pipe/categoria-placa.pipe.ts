import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'categoriaPlaca',
})
export class CategoriaPlacaPipe implements PipeTransform {
  transform(codigo: string): string {
    const categorias: Record<string, string> = {
      A: 'Advertência',
      R: 'Regulamentação',
      I: 'Informação',
      S: 'Sinalização',
    };

    return categorias[codigo] || 'Desconhecida';
  }
}

