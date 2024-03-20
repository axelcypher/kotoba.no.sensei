import { Routes } from '@angular/router';
import { VocabComponent } from './routes/vocab.component';
import { KanaComponent } from './routes/kana.component';
import { PageNotFoundComponent } from './routes/pagenotfound.component';

//import { AuthGuard } from './services/auth.service';




export const APP_ROUTES: Routes = [
  { path: '**', component: PageNotFoundComponent },
  {path: '', redirectTo: 'kana', pathMatch: 'full'},
  { path: 'vocab', component: VocabComponent }, 
  { path: 'kana', component: KanaComponent },
  //{ path: 'settings', component: KanaComponent, canActivate: [AuthGuard] },

  ]; 
 
  