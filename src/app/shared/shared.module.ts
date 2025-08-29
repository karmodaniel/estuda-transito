import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { NgZorroComponentsModule } from './ng-zorro-components/ng-zorro-components.module';
import { PlacaCardComponent } from './components/placa-card/placa-card.component';

@NgModule({
  declarations: [PlacaCardComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    NgZorroComponentsModule,
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    NgZorroComponentsModule,
    PlacaCardComponent,
  ],
})
export class SharedModule {}
