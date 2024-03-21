import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VocabularyService } from '../../services/vocabulary.service';
 
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './progress.component.html'
}) 

export class ProgressComponent implements OnInit {
  
  
  constructor(private Vocab: VocabularyService) {}
  

  ngOnInit(): void {
  }

  title = 'ことばのせんせい - kotoba no sensei - Progress';
  public sortAndGroupUserData = this.Vocab.sortAndGroupUserData();

  public sortedUserDataString = JSON.stringify(this.Vocab.sortAndGroupUserData());

  //userData = this.Vocab.generateUserData();



  public numberPercent = this.Vocab.getProgressInPercent();
  public progress = this.Vocab.getProgress();

  changeLearningMode() {
    
    
  }

  changeVocabMode() {
    console.log("this.learningModeControl.value");
  }
}