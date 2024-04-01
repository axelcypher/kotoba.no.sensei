// src/app/services/api.service.ts
import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ConfigService } from './config.service';
import { CookiesService } from './cookie.service'; 
import { UserService } from './user.services';
import { firstValueFrom, lastValueFrom } from 'rxjs';
import { Vocabulary } from './vocabulary.service';

interface ApiResponse {
  data: Vocabulary[];
}


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(
    private cookiesService: CookiesService,
    private http: HttpClient,
    private config: ConfigService,
    private userService: UserService,
  ) {}

  private apiUrl = this.config.api; 
  private userEndpoint = "user";
  private progressEndpoint = "progress"; 
   
  private username = this.userService.getUsername;
  private userId = this.userService.getUserId;

  public buffer_progress: ApiResponse = {data:[]}; 


  sendUser(data: any): Observable<any> {
    const jwt_token = this.cookiesService.getCookie('auth_token'); 
    const headers = new HttpHeaders().set('Authorization', `Bearer ${jwt_token}`);

    return this.http.post(`${this.apiUrl}/${this.userEndpoint}`, data, { headers });
  }
  async sendProgress(userId: string = '', datas: Vocabulary): Promise<any> {
    const jwt_token = this.cookiesService.getCookie('auth_token'); 
    const headers = new HttpHeaders().set('Authorization', `Bearer ${jwt_token}`);
    const effectiveUserId = userId || this.userId;
    const daada = {data: datas};
    console.log(daada)
    const observable = this.http.patch(`${this.apiUrl}/${this.progressEndpoint}/${effectiveUserId}`, daada, { headers });
    return firstValueFrom(observable)
  }

  updateUser(username: string = '', data: any): Observable<any> {
    const jwt_token = this.cookiesService.getCookie('auth_token'); 
    const headers = new HttpHeaders().set('Authorization', `Bearer ${jwt_token}`);
    
    const effectiveUsername = username || this.username;
    return this.http.patch(`${this.apiUrl}/${this.userEndpoint}/${effectiveUsername}`, data, { headers });
  }

  getUser(username: string = ''): Observable<any> {
    const jwt_token = this.cookiesService.getCookie('auth_token'); 
    const headers = new HttpHeaders().set('Authorization', `Bearer ${jwt_token}`);
    
    const effectiveUsername = username || this.username;
    return this.http.get(`${this.apiUrl}/${this.userEndpoint}/${effectiveUsername}`, { headers });
  }
  async getProgress(userId: string = ''): Promise<Vocabulary[]> {
    const jwt_token = this.cookiesService.getCookie('auth_token'); 
    const headers = new HttpHeaders().set('Authorization', `Bearer ${jwt_token}`);
    
    const effectiveUserId = this.userId || userId; // Stellen Sie sicher, dass userId verwendet wird, wenn es übergeben wird
    if (this.userId) {  
      try {
        const response = await lastValueFrom(this.http.get<ApiResponse>(`${this.apiUrl}/${this.progressEndpoint}/${effectiveUserId}`, { headers }));
        return response.data; // Nehmen wir an, dass `data` das Feld ist, das die Vokabular-Daten enthält
      } catch (error) {
        console.error('Fehler beim Abrufen des Fortschritts', error);
        throw error; // Re-throw the error or handle it as needed
      }
    }
    return [{kana: "",romanji:"", chapter:0,number:0,translated:""}]
  }
  
}
