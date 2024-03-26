// auth.service.ts
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CookiesService } from './cookie.service';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})


export class AuthService {
  private loggedIn = false;
  private apiUrl = "http://localhost:3000"; // URL zu Ihrem Backend-Server

  constructor(private http: HttpClient, private cookiesService: CookiesService) {}

  login(username: string, password: string): void {
    this.http.post<{accessToken: string}>(`${this.apiUrl}/auth/login`, { username, password })
      .subscribe(response => {
        this.cookiesService.setCookie('auth_token', response.accessToken);
        this.loggedIn = true;
        localStorage.setItem('isLoggedIn', 'true'); // Speichern des Zustands
        localStorage.setItem('username', username); // Speichern des Zustands
      });
  }

  logout(): void {
    this.cookiesService.clearCookie('auth_token');
    this.loggedIn = false;
    localStorage.setItem('isLoggedIn', 'false'); // Speichern des Zustands
    localStorage.setItem('username', '');

  }

  isLoggedIn() {
    return localStorage.getItem('isLoggedIn') === 'true';
  }

  getUsername(): string | null {

    return localStorage.getItem('username');
  }

  
  private getCookie(name: string): string | null {
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    if (match) return match[2];
    return null;
  }
}