import { Injectable } from '@angular/core';
import vocabularyData from './assets/vocabulary.json';
import userData from './assets/vocabulary.json';

@Injectable({
  providedIn: 'root'
})
export class VocabularyService {
  generateUserData(): any[] {
    const fullVocabulary = [];

    for (const vocab of vocabularyData) {
      const vocabCopy = { ...vocab }; // Create a copy of the vocabulary

      // Fill missing attributes with placeholders
      if (!vocabCopy.hasOwnProperty('progress')) {
        vocabCopy['progress'] = {
          rank: 0,
          correct: 0,
          incorrect: 0,
          lastActivity: 0,
          lastRankUp: 0
        };
      }

      // Additional user data can be added here

      fullVocabulary.push(vocabCopy);
    }
    // Assuming jsonData contains vocabulary data and userJsonData contains user-specific data
    const mergedData = {...fullVocabulary, ...userData};

    return mergedData;
  }

  saveUserData(userData: any): void {
    // Save userData directly to the database using SQLite
    // Example SQLite query to insert userData into the database
    const query = `INSERT INTO UserDataTable (kana, romanji, translated, chapter, number, progress) 
                   VALUES (?, ?, ?, ?, ?, ?)`;
    
    // Execute the SQLite query with the userData values
    db.execute(query, [userData.kana, userData.romanji, userData.translated, userData.chapter, userData.number, JSON.stringify(userData.progress)]);
  }


}