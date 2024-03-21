import { Routes } from '@angular/router';
import { HomeComponent } from './routes/home/home.component';
import { VocabComponent } from './routes/vocab/vocab.component';
import { KanaComponent } from './routes/kana/kana.component';
import { SettingsComponent } from './routes/settings/settings.component';

import { PageNotFoundComponent } from './routes/404/pagenotfound.component';
import { ProgressComponent } from './routes/progress/progress.component';

//import { AuthGuard } from './services/auth.service';




export const APP_ROUTES: Routes = [
  { path: 'home',         redirectTo: '', pathMatch: 'full'     },
  { path: '',             component: HomeComponent              }, 
  { path: 'vocab',        component: VocabComponent             }, 
  { path: 'kana',         component: KanaComponent              },
  { path: 'progress',     component: ProgressComponent          },
  { path: 'settings',     component: SettingsComponent          }, 
  { path: '**',           component: PageNotFoundComponent      },

  //{ path: 'settings', component: KanaComponent, canActivate: [AuthGuard] },

  ];  
 
  