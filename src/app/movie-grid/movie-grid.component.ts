import { Component } from '@angular/core';
import { MovieGridItemComponent } from '../movie-grid-item/movie-grid-item.component';
import { CommonModule } from '@angular/common';
import { MovieType } from '../app.types';

@Component({
  selector: 'app-movie-grid',
  standalone: true,
  imports: [
    CommonModule,
    MovieGridItemComponent,
  ],
  templateUrl: './movie-grid.component.html',
  styleUrl: './movie-grid.component.scss'
})
export class MovieGridComponent {
  constructor() { }

  movies: MovieType[] = []

  ngOnInit() {
    fetch('/assets/movieData.json')
      .then(response => response.json())
      .then(data => {
        this.movies = data as MovieType[];
      });
  }
}
