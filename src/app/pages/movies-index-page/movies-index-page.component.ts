import { Component } from '@angular/core';
import { MovieGridComponent } from '../../components/movie-grid/movie-grid.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-movies-index-page',
  standalone: true,
  imports: [
    RouterModule,
    MovieGridComponent,
  ],
  templateUrl: './movies-index-page.component.html',
  styleUrl: './movies-index-page.component.scss'
})
export class MoviesIndexPageComponent {

}
