import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule, FormControl } from '@angular/forms';
import { VocabularyService, Vocabulary } from '../../services/vocabulary.service';
 
 
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './vocab.component.html',
  styleUrl: './vocab.component.sass'
}) 

export class VocabComponent {
  private learningMode: any | null = null;

  constructor(private Vocab: VocabularyService) {}

  public lastVocab = this.Vocab.lastVocab;
  public progress = this.Vocab.getProgress();
  public vocabData = this.Vocab.selectRandomVocab(this.progress.chapter, this.progress.number);
  public numberPercent = this.Vocab.getProgressInPercent();
  public feedback = '';

  vocabControl:FormControl = new FormControl(null);

  learningModeControl = new FormGroup({
    kanaButton: new FormControl(''),
    romanjiButton: new FormControl(''),
  });


 
  submitVocab() {
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

    if (isCorrect) {
      // Wähle eine neue Vokabel, wenn die Antwort richtig ist
      this.vocabData = this.Vocab.selectRandomVocab(this.progress.chapter, this.progress.number);
      
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