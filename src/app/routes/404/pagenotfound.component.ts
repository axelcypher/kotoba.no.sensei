import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

 
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pagenotfound.component.html',
  styleUrl: './pagenotfound.component.sass'
}) 

export class PageNotFoundComponent {
  
  changeLearningMode() {
    console.log("this.learningModeControl.value");
  }

  changeVocabMode() {
    console.log("this.learningModeControl.value");
  }
}