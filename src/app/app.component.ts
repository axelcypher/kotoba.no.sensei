import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.sass'
})
 
export class AppComponent implements OnInit {
  title = 'kotoba.no.sensei';

  constructor(private router: Router){}

  ngOnInit() {}

  changeRoute(evt: MouseEvent, name: string) {
    evt.preventDefault();

    let navcfg = [name]

    this.router.navigate(navcfg, {
      skipLocationChange: false,
    })
   
  }
} 
