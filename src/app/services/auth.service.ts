// auth.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private loggedIn = false;

  login(username: string, password: string): void {
    // Implement login logic here
    this.loggedIn = true;
  }

  logout(): void {
    // Implement logout logic here
    this.loggedIn = false;
  }

  isLoggedIn(): boolean {
    return this.loggedIn;
  }
}