import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet, RouterModule } from '@angular/router';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.sass'
})
 
export class AppComponent implements OnInit {
  title = 'kotoba.no.sensei';

  constructor(private router: Router){}


  ngOnInit() {}

  navToComponent(evt: MouseEvent, name: string) {
    evt.preventDefault();
    this.router.navigate([name], {
      skipLocationChange: true,
    })
  }


} 
