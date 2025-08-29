import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlacasStudyComponent } from './components/placas-study/placas-study.component';
import { QuizComponent } from './components/quiz/quiz.component';

const routes: Routes = [
  { path: '', redirectTo: '/placas', pathMatch: 'full' },
  { path: 'placas', component: PlacasStudyComponent },
  { path: 'quiz', component: QuizComponent },
  { path: '**', redirectTo: '/placas' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
