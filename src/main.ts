import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';



bootstrapApplication(AppComponent)
  .then(() => {
    console.log("App started successfully.");
  })
  .catch((err) => {
    console.error('Error bootstrapping the application:', err);
  });