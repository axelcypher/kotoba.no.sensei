import { Injectable, OnInit } from '@angular/core';
import { CookiesService } from './cookie.service'; 


import { VocabularyService, Vocabulary } from './vocabulary.service';
import { ConfigService } from './config.service';


export interface Progress {
    chapter: number;
    number: number;
  }

 
@Injectable({
  providedIn: 'root'
})

export class ProgressService implements OnInit {

  public progressData: Progress | Progress = { chapter: 1, number: 3 };

  constructor(
    private Vocab: VocabularyService,
    private config: ConfigService,
  ) {}
  
  ngOnInit(): void {
  }

  get getProgress(): Progress {

    const data: Vocabulary[] = this.Vocab.getVocabularyData;

    if (!data) {
      let maxChapter = Math.max(...this.Vocab.getVocabularyData.map(item => item.chapter));
      let maxNumberInMaxChapter = Math.max(...this.Vocab.getVocabularyData.filter(item => item.chapter === maxChapter).map(item => item.number));
      // Find the object with the highest chapter and number
      let highestProgressObject = this.Vocab.getVocabularyData.find(item => item.chapter === maxChapter && item.number === maxNumberInMaxChapter);
      let progress: {chapter: number; number: number;};
      if (highestProgressObject) {
        progress = {
          chapter: highestProgressObject.chapter,
          number: highestProgressObject.number
        };
        return progress
      }
    }
  
    return {chapter: 4, number: 23}; 
  }

  calcChProgressInPercent() {
    const vocabWithProgress: Vocabulary[] = this.Vocab.getVocabularyData;
    const prog: Progress = this.progressData;

    const currentNumberData = vocabWithProgress.filter(entry => entry.number === prog.number);
    const totalCards =currentNumberData.length;
    const maxRankCards = currentNumberData.filter(entry => entry.progress?.rank === this.config.defaultRanksCount).length;
    const progress = Math.floor((maxRankCards / totalCards) * 100)+1;

    return progress;
}


}