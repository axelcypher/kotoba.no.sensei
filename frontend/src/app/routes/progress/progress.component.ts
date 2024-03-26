import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VocabularyService, Vocabulary } from '../../services/vocabulary.service';
 
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './progress.component.html'
}) 

export class ProgressComponent implements OnInit {
  title = 'ことばのせんせい - kotoba no sensei - Progress';


  constructor(private Vocab: VocabularyService) {}
  
  public sortAndGroupUserData = this.Vocab.sortAndGroupUserData();
  public sortedUserDataString = JSON.stringify(this.Vocab.sortAndGroupUserData());
  public progress: { chapter: number; number: number; } = { chapter: 1, number: 1 };
  public vocabData: Vocabulary | null = null;

  
  //userData = this.Vocab.generateUserData();

  async ngOnInit() {
    await this.initializeVocabData();
    
  }
 
  async initializeVocabData() {
    this.progress = await this.Vocab.getProgress();
    this.vocabData = this.Vocab.selectRandomVocab(this.progress.chapter, this.progress.number);
  }

  public numberPercent = this.Vocab.getProgressInPercent();

  changeLearningMode() {
    
    
  }

  changeVocabMode() {
    console.log("this.learningModeControl.value");
  }
}