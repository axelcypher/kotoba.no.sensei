import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import vocabularyData  from '../../assets/vocabulary.json';
import defaultUserData from '../../assets/userData.json';
import configFile from '../../assets/config.json';




// src/app/app-config.ts

export interface AppConfig {
  title?: string;
  port?: number,
  apiURL?: string,
  appSettings?: {
        defaultRanksCount: number,
        defaultPointsPerRank: number,
        defaultTheresholdForNumber: number,      
        defaultTheresholdForChapter: number,     
        defaultVocabCooldown: number,        
    }
}

@Injectable({
  providedIn: 'root'
})


export class ConfigService  {

  data: AppConfig = {};

  constructor(private http: HttpClient) {}

  private appConfig: any;

  get port() {
    return configFile.port;
  }
  get api() {
    return configFile.apiURL;
  }
  get defaultVocabCooldown() {
    return configFile.appSettings.defaultVocabCooldown;
  }
  get defaultRanksCount() {
    return configFile.appSettings.defaultRanksCount;
  }
  get defaultPointsPerRank() {
    return configFile.appSettings.defaultPointsPerRank;
  }
  get defaultUserData() {
    return defaultUserData;
  }
  get vocabularyData() {
    return vocabularyData;
  }
  
}