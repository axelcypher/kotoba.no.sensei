import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms'; // Import hinzufügen
import { AuthService } from './services/auth.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule, FormsModule, CommonModule, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.sass'
})
 
export class AppComponent implements OnInit {
  title = 'kotoba.no.sensei';
  username: string = '';
  password: string = '';

  constructor(
    private router: Router,
    private authService: AuthService
    ){}

  ngOnInit() {}

  navToComponent(evt: MouseEvent, name: string) {
    evt.preventDefault();
    this.router.navigate([name], {
      skipLocationChange: true,
    })
  }

  login(event: Event) {
    event.preventDefault();
    this.authService.login(this.username, this.password);
    console.log('Login versucht mit:', this.username, this.password);
    // Hier können Sie Ihre Login-Logik implementieren
  }

  logout() {
    this.authService.logout();
    // Eventuell weitere Aktionen nach dem Logout
  }

  get isLoggedIn() {
    return this.authService.isLoggedIn();
  }

} 
