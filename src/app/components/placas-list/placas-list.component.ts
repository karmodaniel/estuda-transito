import { Component, OnInit } from '@angular/core';
import { PlacasService } from '../../services/placas.service';
import { Placa } from '../../shared/interfaces/placa.interface';

@Component({
  selector: 'app-placas-list',
  templateUrl: './placas-list.component.html',
  styleUrls: ['./placas-list.component.less'],
})
export class PlacasListComponent implements OnInit {
  placas: Placa[] = [];
  loading = false;

  constructor(private placasService: PlacasService) {}

  ngOnInit(): void {
    this.carregarPlacas();
  }

  carregarPlacas(): void {
    this.loading = true;
    this.placasService.getPlacas().subscribe({
      next: (placas) => {
        this.placas = placas;
        this.loading = false;
      },
      error: (error) => {
        console.error('Erro ao carregar placas:', error);
        this.loading = false;
      },
    });
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
}
