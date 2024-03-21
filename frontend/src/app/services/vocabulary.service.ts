import { Injectable, OnInit } from '@angular/core';
import { CookiesService } from './cookie.service'; 

import vocabularyData  from '../../assets/vocabulary.json';
import userData from '../../assets/userData.json';
import config from '../../assets/config.json';
//import userConfig from '../../assets/userConfig.json';

export interface Vocabulary {
  kana: string;
  sound: string;
  romanji: string;
  translated: string;
  chapter: number;
  number: number;
  progress?: { // Machen Sie 'progress' optional
    rank: number;
    points: number;
    correct: number;
    incorrect: number;
    lastActivity: number;
    lastRankUp: number;
  };
}



interface GroupedVocabulary {
  chapter: number;
  data: {
    number: number;
    items: Vocabulary[];
  }[];
}
 

@Injectable({
  providedIn: 'root'
})

export class VocabularyService implements OnInit {
  public lastVocab: Vocabulary | null = null;


  constructor(private cookiesService: CookiesService) {} 
  
  ngOnInit(): void {
    // You can now use the dbService to interact with your SQLite database
  }

  generateUserData(): Vocabulary[] {
    const fullVocabulary: Vocabulary[] = vocabularyData.map(vocab => {
      // Konvertieren Sie jedes Vokabular-Objekt in den Typ 'Vocabulary'
      const vocabCopy: Vocabulary = { ...vocab };
      // Fügen Sie die 'progress'-Eigenschaft hinzu, falls sie fehlt
      if (!vocabCopy.progress) {
        vocabCopy.progress = {
          rank: 0,
          points: 0,
          correct: 0,
          incorrect: 0,
          lastActivity: 0,
          lastRankUp: 0,
        };
      }
      return vocabCopy;
    });
  
    // Hier könnten Sie weitere benutzerspezifische Daten hinzufügen oder die Daten weiter anpassen
    // Zum Beispiel könnten Sie hier 'userData' hinzufügen, falls notwendig
  
    return fullVocabulary;
  }

  sortUserData(): Vocabulary[] {
    return this.generateUserData().sort((a, b) => {
      // Zuerst nach 'chapter' sortieren
      if (a.chapter < b.chapter) return -1;
      if (a.chapter > b.chapter) return 1;
  
      // Wenn 'chapter' gleich ist, nach 'number' sortieren
      if (a.number < b.number) return -1;
      if (a.number > b.number) return 1;
  
      // Wenn sowohl 'chapter' als auch 'number' gleich sind
      return 0;
    });
  }

  sortAndGroupUserData(): GroupedVocabulary[] {
    // Schritt 1: Daten sortieren
    const sortedData = this.generateUserData().sort((a, b) => {
      if (a.chapter < b.chapter) return -1;
      if (a.chapter > b.chapter) return 1;
      if (a.number < b.number) return -1;
      if (a.number > b.number) return 1;
      return 0;
    });
  
    // Schritt 2: Daten nach 'chapter' gruppieren
    const groupedByChapter = sortedData.reduce<GroupedVocabulary[]>((accumulator, currentValue) => {
      // Prüfen, ob ein Array für das aktuelle Kapitel bereits existiert
      let group = accumulator.find(g => g.chapter === currentValue.chapter);
      if (!group) {
        // Wenn nein, ein neues Array für das Kapitel erstellen
        group = { chapter: currentValue.chapter, data: [] };
        accumulator.push(group);
      }
      // Prüfen, ob eine Gruppe für die aktuelle 'number' existiert
      let numberGroup = group.data.find(g => g.number === currentValue.number);
      if (!numberGroup) {
        // Wenn nein, eine neue Gruppe für 'number' erstellen
        numberGroup = { number: currentValue.number, items: [] };
        group.data.push(numberGroup);
      }
      // Das aktuelle Element zur entsprechenden 'number'-Gruppe hinzufügen
      numberGroup.items.push(currentValue);
      return accumulator;
    }, []);
  
    return groupedByChapter;
  }

  getProgress(): { chapter: number; number: number; } {
    const cookieName = 'progress'; // Name des Cookies
    let progressC = this.cookiesService.getCookie(cookieName); // Versuch, den Cookie zu erhalten

    if (!progressC) {
      // Wenn der Cookie nicht existiert, werten Sie userData aus
      //let userData = this.generateUserData();
      let maxChapter = Math.max(...userData.map(item => item.chapter));
      let maxNumberInMaxChapter = Math.max(...userData.filter(item => item.chapter === maxChapter).map(item => item.number));
      // Find the object with the highest chapter and number
      let highestProgressObject = userData.find(item => item.chapter === maxChapter && item.number === maxNumberInMaxChapter);
      let progress: {chapter: number; number: number;};
      if (highestProgressObject) {
        progress = {
          chapter: highestProgressObject.chapter,
          number: highestProgressObject.number
        };
        console.log(JSON.stringify(progress), 'dadada')
        console.log(progress)
        this.cookiesService.setCookie('progress', JSON.stringify(progress))  
        return progress

      }
    }
  
    return JSON.parse(progressC); // Rückgabe des Cookie-Werts
  }

  selectRandomVocab(currentChapter: number, currentNumber: number): Vocabulary | null {
      const cooldownTime = config.appSettings.defaultVocabCooldown * 60000; // Convert minutes to milliseconds
      const now = Date.now();
      const validVocabs = this.generateUserData().filter(vocab => {
        const lastRankUpTime = vocab.progress?.lastRankUp || 0;
        const rank = vocab.progress?.rank ?? 0; 
        const timeDiff = now - lastRankUpTime;
        return vocab.chapter <= currentChapter &&
              vocab.number <= currentNumber &&
              timeDiff >= cooldownTime &&
              vocab !== this.lastVocab &&
              Math.random() < (1 / (1 + rank || 0)); // Lower chance for higher ranks
      });

      if (validVocabs.length === 0) return null;

      const randomIndex = Math.floor(Math.random() * validVocabs.length);
      const selectedVocab = validVocabs[randomIndex];
      this.lastVocab = selectedVocab; // Store the last selected vocab

      return selectedVocab;
    }
  
  getProgressInPercent() {
    const vocabWithProgress = this.generateUserData();
    const prog: { chapter: number; number: number; } = this.getProgress();
    const currentNumberData = vocabWithProgress.filter(entry => entry.number === prog.number);
    const totalCards =currentNumberData.length;
    const maxRankCards = currentNumberData.filter(entry => entry.progress?.rank === config.appSettings.defaultRanksCount).length;
    const progress = Math.floor((maxRankCards / totalCards) * 100);

    return progress;
}

  saveUserData(userData: Vocabulary): void {

    
  }


}