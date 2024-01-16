import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-movies-show-page',
  standalone: true,
  imports: [
    RouterModule,
  ],
  templateUrl: './movies-show-page.component.html',
  styleUrl: './movies-show-page.component.scss'
})
export class MoviesShowPageComponent {

}
