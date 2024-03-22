import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  private appConfig: any;

  constructor(private http: HttpClient) { }

  loadConfig() {
    return this.http.get('/assets/config.json')
      .toPromise()
      .then(data => {
        this.appConfig = data;
      });
  }

  // This is an example property ... you can make it however you want.
  get port() {
    if (!this.appConfig) {
      throw Error('Config file not loaded!');
    }
    return this.appConfig.port;
  }
  
  api(): string {
    if (!this.appConfig) {
      throw Error('Config file not loaded!');
    }
    return this.appConfig.apiURL;
  }
}