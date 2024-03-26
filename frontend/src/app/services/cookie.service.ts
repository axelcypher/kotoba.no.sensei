// cookie.service.ts
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class CookiesService {
  constructor(private cookieService: CookieService) {}

  setCookie( name: string, token: string ): void {
    this.cookieService.set(name, token, { expires: 90, path: '/' });
  }
  getCookie( token: string ): string {
    return this.cookieService.get(token);
  }
  clearCookie( token: string ): void {
    this.cookieService.delete(token);
  }
}