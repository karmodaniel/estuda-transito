import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export abstract class BaseService<T> {
  protected constructor(
    protected http: HttpClient,
    protected baseUrl: string
  ) {}

  protected handleError(error: any): Observable<never> {
    console.error('Erro no serviço:', error);
    return throwError(() => new Error('Erro no serviço'));
  }

  protected getUrl(path: string = ''): string {
    return `${this.baseUrl}${path}`;
  }
}
