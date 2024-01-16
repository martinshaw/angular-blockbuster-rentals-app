import { Component, Inject } from '@angular/core';
import { MovieGridItemComponent } from '../movie-grid-item/movie-grid-item.component';
import { CommonModule } from '@angular/common';
import { MovieType } from '../app.types';
import { RouterModule } from '@angular/router';
import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

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
  private isBrowser: boolean = false;
  private currentUrlOrigin: string = '';

  constructor(
      @Inject(PLATFORM_ID) platformId: Object
    ) {
      this.isBrowser = isPlatformBrowser(platformId);

      if (this.isBrowser === true) this.currentUrlOrigin = document.location.origin;
    }

  movies: MovieType[] = []

  ngOnInit() {
    fetch(this.currentUrlOrigin + '/assets/movieData.json')
      .then(response => response.json())
      .then(data => {
        this.movies = data as MovieType[];
      });
  }
}
