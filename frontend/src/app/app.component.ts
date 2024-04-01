import { Component, OnInit, APP_INITIALIZER } from '@angular/core';
import { Router, RouterOutlet, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { Subscription } from 'rxjs';

import { ConfigService } from './services/config.service';
import { AuthService } from './services/auth.service';
import { ProgressService } from './services/progress.service';
import { VocabularyService } from './services/vocabulary.service';
import { EventBusService } from './services/event-bus.service';
import { UserService } from './services/user.services';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule, FormsModule, CommonModule, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.sass',
  
})
 
export class AppComponent implements OnInit {
  public title: string = 'kotoba.no.sensei';
  public username: string | null = '';
  public password: string | null = ''; 
  public isLoggedIn = false;
  public eventBusSub?: Subscription;

  constructor(
    private router: Router,
    private authService: AuthService,
    private vocabService: VocabularyService,
    private userService: UserService,
    private progressService: ProgressService,
    private configService: ConfigService,
    private eventBusService: EventBusService,
    ){}

  async ngOnInit() {
    this.isLoggedIn = this.authService.isLoggedIn;
    if (this.isLoggedIn) {
      const user = this.userService.getUsername;
      this.username = user;
    }
    this.eventBusSub = this.eventBusService.on('logout', () => {
      this.logout();
    });
    this.vocabService.initVocabularyData();
  }

  navToComponent(evt: MouseEvent, name: string) {
    evt.preventDefault();
    this.router.navigate([name], {
      skipLocationChange: true,
    })
  }

  async login(event: Event) {
    event.preventDefault();
    if (this.username && this.password) {
      await this.authService.login(this.username, this.password);
    }  
    this.vocabService.initVocabularyData(); 
  }

  logout() {
    this.authService.logout();
    this.vocabService.initVocabularyData(); 
    window.location.reload();
  }



} 
