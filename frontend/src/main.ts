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
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule
import { ConfigService } from './app/services/config.service';


async function bootstrap() {
  await bootstrapApplication(AppComponent, {
    providers: [
      importProvidersFrom(HttpClientModule),
      provideRouter(APP_ROUTES, 
        withPreloading(PreloadAllModules), //withDebugTracing(),
        
      )
    ]
  })
}

bootstrap()
  .then(() => {
    console.log("App started successfully.");

  })
  .catch((err) => {
    console.error('Error bootstrapping the application:', err);
  });