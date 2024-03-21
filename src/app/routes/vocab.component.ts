import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule, FormControl } from '@angular/forms';

 
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './vocab.component.html',
  styleUrl: './vocab.component.sass'
}) 

export class VocabComponent {
  public routerLinkNavVocab = "/vocab"

  vocabControl:FormControl = new FormControl(null);
  learningModeControl = new FormGroup({
    kanaButton: new FormControl(''),
    romanjiButton: new FormControl(''),
  });
  vocabModeControl = new FormGroup({
    kanaButton: new FormControl(''),
    kanjiButton: new FormControl(''),
  });

  submitVocab() {
    console.log(this.vocabControl.value);
    this.vocabControl.reset();
  }

  changeLearningMode() {
    console.log("this.learningModeControl.value");
  }

  changeVocabMode() {
    console.log("this.learningModeControl.value");
  }
}