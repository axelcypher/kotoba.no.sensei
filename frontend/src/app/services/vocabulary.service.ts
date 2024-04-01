import { Injectable, OnInit } from '@angular/core';
import { CookiesService } from './cookie.service'; 

import { ApiService } from './api.service';
import { ConfigService } from './config.service';
import { AuthService } from './auth.service';
import { UserService } from './user.services';

export interface Vocabulary {
  kana: string; 
  sound?: string;
  romanji: string;
  translated: string;
  chapter: number;
  number: number;
  progress?: { // Machen Sie 'progress' optional
    rank?: number;
    points?: number;
    correct?: number;
    incorrect?: number;
    lastActivity?: number;
    lastRankUp?: number;
  };
}

export interface GroupedVocabulary {
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
  public lastVocab: Vocabulary | Vocabulary = {
    "kana":"", 
    "romanji": "", 
    "translated": "", 
    "chapter": 0, 
    "number": 0
  };
  public fullVocabulary: Vocabulary[] = [];

  constructor(
    private cookiesService: CookiesService,
    private apiService: ApiService,
    private authService: AuthService,
    private config: ConfigService,
    private userService: UserService,
  ) {}
  
  ngOnInit(): void {
  }

  async initVocabularyData(): Promise<Vocabulary[]> {
    const vocabularyData = this.config.vocabularyData;
    let fullVocabulary: Vocabulary[] = vocabularyData.map(vocab => {
      const vocabCopy: Vocabulary = { ...vocab };
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
    
    if (this.authService.isLoggedIn) {
      const userVocabularyData = await this.apiService.getProgress();
      fullVocabulary = this.mergeVocabularyData(userVocabularyData, fullVocabulary);
      console.log(fullVocabulary);
    }
    this.fullVocabulary = fullVocabulary;
    return fullVocabulary;
  }
  mergeVocabularyData(userData: Vocabulary[], vocabularyData: Vocabulary[]): Vocabulary[] {
    const mergedData = [...vocabularyData]; // Starten mit einer Kopie der Vokabeldaten
  
    userData.forEach(userItem => {
      const existingIndex = mergedData.findIndex(vocabItem => vocabItem.kana === userItem.kana && vocabItem.translated === userItem.translated);
      if (existingIndex > -1) {
        // Eintrag existiert, überschreiben
        mergedData[existingIndex] = userItem;
      } else {
        // Eintrag existiert nicht, hinzufügen
        mergedData.push(userItem);
      }
    });
    this.fullVocabulary = mergedData;
    return mergedData;
  }
  get getSortedAndGroupedVocabularyData(): GroupedVocabulary[] {
    // Schritt 1: Daten sortieren
    const sortedData = this.fullVocabulary.sort((a, b) => {
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
  get getVocabularyData(): Vocabulary[]{
    return this.fullVocabulary;
  }

  async selectRandomVocab(currentChapter: number, currentNumber: number, lastVocab: Vocabulary = this.lastVocab): Promise<any> {
    const cooldownTime = this.config.defaultVocabCooldown * 60000; // Convert minutes to milliseconds
    const now = Date.now();
    const initData = this.fullVocabulary;
    const validVocabs = initData.filter(vocab => {
      const lastRankUpTime = vocab.progress?.lastRankUp || 0;
      const rank = vocab.progress?.rank ?? 0; 
      const timeDiff = now - lastRankUpTime;
      return vocab.chapter <= currentChapter &&
            vocab.number <= currentNumber &&
            timeDiff >= cooldownTime &&
            vocab !== lastVocab &&
            Math.random() < (1 / (1 + rank || 0)); // Lower chance for higher ranks
    });

    if (validVocabs.length === 0) return ' ';
    const randomIndex = Math.floor(Math.random() * validVocabs.length);
    const selectedVocab = validVocabs[randomIndex];
    this.lastVocab = selectedVocab; // Store the last selected vocab
    return selectedVocab;
  }
  



}