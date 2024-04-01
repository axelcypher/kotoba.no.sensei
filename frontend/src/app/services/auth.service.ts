// auth.service.ts
import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookiesService } from './cookie.service';
import { ConfigService } from './config.service';
import { firstValueFrom } from 'rxjs';



@Injectable({
  providedIn: 'root'
})



export class AuthService {
  private config = inject(ConfigService);
  private apiUrl = this.config.api;

  private loggedIn = false;

  constructor(
    private http: HttpClient, 
    private cookiesService: CookiesService) {}

  /*async login(username: string, password: string): Promise<void> {
    await this.http.post<{ token:{ accessToken: string, refreshToken: string, }, }>(`${this.apiUrl}/auth/login`, { username, password })
      .subscribe(response => {
        console.log(response)
        this.cookiesService.setCookie('auth_token', response.token.accessToken);
        this.cookiesService.setCookie('refresh_token', response.token.accessToken);
        this.loggedIn = true;
        localStorage.setItem('isLoggedIn', 'true'); 
        localStorage.setItem('username', username); 
      });
  }*/

  async login(username: string, password: string): Promise<void> {
    const response = await firstValueFrom(this.http.post<{ accessToken: string, refreshToken: string }>(`${this.apiUrl}/auth/login`, { username, password }));
    this.cookiesService.setCookie('auth_token', response.accessToken);
    this.cookiesService.setCookie('refresh_token', response.accessToken);
    this.loggedIn = true;
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('username', username);
  }

  logout(): void {
    this.cookiesService.clearCookie('auth_token');
    this.cookiesService.clearCookie('refresh_token');
    this.loggedIn = false;
    localStorage.setItem('isLoggedIn', 'false'); // Speichern des Zustands
    localStorage.removeItem('username');

  }

  refreshToken() {
    const jwt_token = this.cookiesService.getCookie('auth_token'); 
    const refresh_token = this.cookiesService.getCookie('refresh_token'); 
    const headers = new HttpHeaders();
    
    headers.set('Authorization', `Bearer ${jwt_token}`);
    headers.set('Content-Type', 'application/json' )
    
    return this.http.post(`${this.apiUrl}/auth/refresh`, { refresh_token }, { headers });
  }

  get isLoggedIn() {
    return localStorage.getItem('isLoggedIn') === 'true';
  }


}