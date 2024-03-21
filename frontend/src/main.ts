import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { importProvidersFrom } from '@angular/core';
import { 
    PreloadAllModules, 
    provideRouter, 
    withDebugTracing, 
    withPreloading, 
    withRouterConfig 
} 
from '@angular/router';
import { APP_ROUTES } from './app/app.routes';


bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(APP_ROUTES, 
      withPreloading(PreloadAllModules),
      withDebugTracing(),
    ),
  ]
})
  .then(() => {
    console.log("App started successfully.");
  })
  .catch((err) => {
    console.error('Error bootstrapping the application:', err);
  });