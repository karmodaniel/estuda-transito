import { Routes } from '@angular/router';
import { PlacasStudyComponent } from './components/placas-study/placas-study.component';
import { QuizComponent } from './components/quiz/quiz.component';

export const routes: Routes = [
  { path: '', redirectTo: '/placas', pathMatch: 'full' },
  { path: 'placas', component: PlacasStudyComponent },
  { path: 'quiz', component: QuizComponent },
  { path: '**', redirectTo: '/placas' },
];
