import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

 
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
}) 

export class HomeComponent {
  title = 'ことばのせんせい - kotoba no sensei';
  
  changeLearningMode() {
    console.log("this.learningModeControl.value");
  }

  changeVocabMode() {
    console.log("this.learningModeControl.value");
  }
}