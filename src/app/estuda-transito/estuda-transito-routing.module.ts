import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlacasPageComponent } from './presentation/page/placas-page/placas-page.component';
import { QuizPageComponent } from './presentation/page/quiz-page/quiz-page.component';

const routes: Routes = [
  { path: '', redirectTo: 'placas', pathMatch: 'full' },
  { path: 'placas', component: PlacasPageComponent },
  { path: 'quiz', component: QuizPageComponent },
  { path: '**', redirectTo: 'placas' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EstudaTransitoRoutingModule {}
