import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

 
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './settings.component.html'
}) 

export class SettingsComponent {
  
  changeLearningMode() {
    console.log("this.learningModeControl.value");
  }

  changeVocabMode() {
    console.log("this.learningModeControl.value");
  }
}