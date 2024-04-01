import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConfigService } from '../../services/config.service';
import { VocabularyService, GroupedVocabulary, Vocabulary } from '../../services/vocabulary.service';
import { ProgressService, Progress } from '../../services/progress.service';
 



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './progress.component.html'
}) 

export class ProgressComponent implements OnInit {

  public title = 'ことばのせんせい - kotoba no sensei - Progress';

  public vocabData:         GroupedVocabulary[] | null = null;
  public progress:          Progress | Progress = { chapter: 1, number: 3 };
  public numberPercent =    this.Progr.calcChProgressInPercent();

  constructor(
    private Vocab:          VocabularyService,
    private Progr:          ProgressService,
    private config:         ConfigService,
    ) {}
  
  ngOnInit(): void {
    this.vocabData =        this.Vocab.getSortedAndGroupedVocabularyData;
    this.progress =         this.Progr.getProgress;
    this.numberPercent =    this.Progr.calcChProgressInPercent();
  }
 
  


}