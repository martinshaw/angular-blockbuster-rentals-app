import { Component } from '@angular/core';
import { MovieGridItemComponent } from '../movie-grid-item/movie-grid-item.component';
import { CommonModule } from '@angular/common';
import { MovieType } from '../app.types';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-movie-grid',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MovieGridItemComponent,
  ],
  templateUrl: './movie-grid.component.html',
  styleUrl: './movie-grid.component.scss'
})
export class MovieGridComponent {
  constructor() { }

  movies: MovieType[] = []

  ngOnInit() {
    fetch(document.location.origin + '/assets/movieData.json')
      .then(response => response.json())
      .then(data => {
        this.movies = data as MovieType[];
      });
  }
}
