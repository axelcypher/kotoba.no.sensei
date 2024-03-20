import { Routes } from '@angular/router';
import { VocabComponent } from './routes/vocab.component';
import { KanaComponent } from './routes/kana.component';

//import { AuthGuard } from './auth.guard'; // Import the AuthGuard


export const routes: Routes = [
  { path: '/vocab', component: VocabComponent }, 
  { path: '/kana', component: KanaComponent },
  //{ path: '/settings', component: KanaComponent, canActivate: [AuthGuard] },

  ]; 

 