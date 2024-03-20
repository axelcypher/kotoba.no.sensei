// cookie.service.ts
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class CookiesService {
  constructor(private cookieService: CookieService) {}

  setSessionCookie(token: string): void {
    this.cookieService.set('sessionToken', token);
  }

  getSessionCookie(): string {
    return this.cookieService.get('sessionToken');
  }

  clearSessionCookie(): void {
    this.cookieService.delete('sessionToken');
  }
}