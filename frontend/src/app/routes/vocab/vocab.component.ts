import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule, FormControl } from '@angular/forms';
import { VocabularyService, Vocabulary } from '../../services/vocabulary.service';
import { ProgressService, Progress } from '../../services/progress.service';
import { ApiService } from '../../services/api.service';
import { UserService } from '../../services/user.services'; 
import { ConfigService } from '../../services/config.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './vocab.component.html',
  styleUrl: './vocab.component.sass'
}) 

export class VocabComponent implements OnInit {
  title = 'ことばのせんせい - kotoba no sensei - Progress';

  
  constructor(
    private Progr: ProgressService,
    private Vocab: VocabularyService,
    private API: ApiService,
    private userService: UserService,
    private config: ConfigService,
  ) {}

  private learningMode: any | null = null;

  public lastVocab = this.Vocab.lastVocab;
  public currentVocab: Vocabulary | Vocabulary = { 
    kana:"", 
    romanji:"", 
    translated:"", 
    progress: {
      points: 1 
    },
    chapter: 1, 
    number: 1
  };
  public rank = this.currentVocab?.progress?.rank ?? 0;
  public userProgress: Progress | Progress = { chapter: 1, number: 1 };
  public userProgressInPercent = this.Progr.calcChProgressInPercent();

  public feedback = '';

  
  vocabControl:FormControl = new FormControl(null);

  learningModeControl = new FormGroup({
    kanaButton: new FormControl(''),
    romanjiButton: new FormControl(''),
  });

  async ngOnInit() {
    await this.Vocab.initVocabularyData();
    this.currentVocab = await this.Vocab.selectRandomVocab(this.userProgress.chapter, this.userProgress.number);
  }

  async initializeVocabData() {
    try {
      this.userProgress = await this.Progr.getProgress; // This should be an async call to your service
    } catch (error) {
      console.error("Failed to initialize vocabulary data", error);
      this.userProgress = await this.Progr.getProgress;
      let randomVocab = await this.Vocab.selectRandomVocab(this.userProgress.chapter, this.userProgress.number);
      this.currentVocab = randomVocab;
    }
  }
  
  
  async submitVocab() {
    this.learningMode = "kana";
    // Bereinigungsfunktion, die Text in Klammern entfernt, trimmt und in Kleinbuchstaben konvertiert
    const cleanString = (str: string) => {
      return str.replace(/\(.*?\)/g, '').trim().toLowerCase();
    };
  
    const userAnswer = cleanString(this.vocabControl.value);
    let isCorrect = false;
    console.log(cleanString(this.Vocab.lastVocab?.translated ?? ''), cleanString(this.vocabControl.value), this.learningMode)
    if (this.learningMode === 'kana') {
      // Vergleiche mit 'translated', nachdem alles bereinigt wurde
      isCorrect = userAnswer === cleanString(this.Vocab.lastVocab?.translated ?? '');
    } else if (this.learningMode === 'romanji') {
      // Vergleiche mit 'kana' oder 'romanji', nachdem alles bereinigt wurde
      isCorrect = userAnswer === cleanString(this.Vocab.lastVocab?.kana ?? '') || 
                  userAnswer === cleanString(this.Vocab.lastVocab?.romanji ?? '');
    } else if (this.learningMode === 'kanji') {
      // Vergleiche mit 'kana' oder 'romanji', nachdem alles bereinigt wurde
      isCorrect = userAnswer === cleanString(this.Vocab.lastVocab?.kana ?? '') || 
                  userAnswer === cleanString(this.Vocab.lastVocab?.romanji ?? '') || 
                  userAnswer === cleanString(this.Vocab.lastVocab?.translated ?? '');
    }
  
    // Feedback basierend auf der Korrektheit der Antwort setzen
    this.feedback = isCorrect ? '<span class="msgCorrect">Richtig! Gut gemacht.</span>' : '<span class="msgIncorrect">Leider falsch. Versuche es noch einmal.</span>';
    this.hideFeedbackAfterDelay();
    let Vnumber = this.userProgress?.number || 1;
    let Vchapter = this.userProgress?.chapter || 1;

    const defaultPointsPerRank = this.config.defaultPointsPerRank;


    if (isCorrect) {
      
      if (typeof this.currentVocab?.progress?.points === 'undefined') {
        this.currentVocab.progress = {
          points: 1,
        };

      } else {
        this.currentVocab.progress.points += 1;
      }
      const voca = this.currentVocab;
      
      
      const userId = this.userService.getUserId;
      if (userId) {
        await this.API.sendProgress(userId, voca);
        let randomVocab = await this.Vocab.selectRandomVocab( Vchapter, Vnumber );
        this.currentVocab = randomVocab;
      } else {
        let randomVocab = await this.Vocab.selectRandomVocab( Vchapter, Vnumber );
        this.currentVocab = randomVocab;
      }
      
    } else {
      if (typeof this.currentVocab?.progress?.points === 'undefined') {
        this.currentVocab.progress = {
          points: 0,
        };

      } else {
        this.currentVocab.progress.points = (Math.floor(this.currentVocab.progress.points / defaultPointsPerRank) - 1) * defaultPointsPerRank;
        this.currentVocab.progress.points = Math.max(0, this.currentVocab.progress.points);
      }
      
    }
  
    // Eingabefeld zurücksetzen
    this.vocabControl.reset(); 
   }

  hideFeedbackAfterDelay() {
    setTimeout(() => {
      this.feedback = ''; // Setzt das Feedback zurück, wodurch es im Template ausgeblendet wird
    }, 3000); // 3000 Millisekunden = 3 Sekunden
  }

  changeLearningMode() {
    let mode = this.learningModeControl.value;
    console.log(mode);
  }
}