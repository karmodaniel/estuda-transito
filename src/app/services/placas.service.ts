import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, catchError } from 'rxjs';
import { BaseService } from '../shared/services/base.service';
import { Placa } from '../shared/interfaces/placa.interface';

@Injectable({
  providedIn: 'root',
})
export class PlacasService extends BaseService<Placa> {
  private readonly CATEGORIAS = {
    R: 'Regulamentação',
    A: 'Advertência',
    I: 'Indicação',
    S: 'Serviços',
  };

  constructor(http: HttpClient) {
    super(http, 'assets');
  }

  getPlacas(): Observable<Placa[]> {
    return this.http.get<Placa[]>(this.getUrl('/placas.json')).pipe(
      map((placas) => this.processarPlacas(placas)),
      catchError((error) => this.handleError(error))
    );
  }

  getCategorias(): string[] {
    return Object.keys(this.CATEGORIAS);
  }

  getNomeCategoria(codigo: string): string {
    if (!codigo || codigo.trim() === '') {
      return 'Não categorizada';
    }
    
    return (
      this.CATEGORIAS[codigo as keyof typeof this.CATEGORIAS] || 'Desconhecida'
    );
  }

  private processarPlacas(placas: Placa[]): Placa[] {
    return placas.map((placa) => ({
      ...placa,
      imagem_url: this.construirUrlImagem(placa.nome_imagem),
    }));
  }

  private construirUrlImagem(nomeImagem: string): string {
    return `assets/placas/${nomeImagem}`;
  }
}
