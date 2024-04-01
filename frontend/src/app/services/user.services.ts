// #docregion
import { Injectable } from '@angular/core';
import { jwtDecode } from "jwt-decode";
import { CookiesService } from './cookie.service';

export class User {
  constructor(
    public name: string,
    public isAuthorized = false) { }
}

interface TokenPayload {
  userId: string;
  username: string;
}

@Injectable({
  providedIn: 'root'
})

export class UserService {
  constructor(private cookiesService: CookiesService) {}

  get getUsername(): string | null {
    try {
      const token = this.cookiesService.getCookie('auth_token');
      const localStorages = localStorage.getItem('username');
      if (!token) {
        return "default";
      } else if (!localStorages) {
        return "default";
      }
      const decoded = jwtDecode<TokenPayload>(token);
      return decoded.username;

    } catch (error) {
      console.error("Error decoding token:", error);
      // Handle error or return standard data
      return "default"; // Adjust based on your standard data requirements.
    }
  }

  get getUserId(): string | null {
      try {
        const token = this.cookiesService.getCookie('auth_token');
        const localStorages = localStorage.getItem('userId');

        if (!token) {
          console.log("Err, no token provided.")
          return "default";
        } else if (localStorages) {
          console.log("Err, no token but, local storage provided.")
          return localStorages;
        }
        const decoded = jwtDecode<TokenPayload>(token);
        return decoded.userId;
  
      } catch (error) {
        console.error("Error decoding token:", error);
        // Handle error or return standard data
        return "default"; // Adjust based on your standard data requirements.
      }
    }

}