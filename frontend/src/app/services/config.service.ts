import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService implements OnInit {

  private appConfig: any;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    return this.http.get('/assets/config.json')
      .toPromise()
      .then(data => {
        this.appConfig = data;
      });
  }

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
    return "http://localhost:3000"
    
  }
}