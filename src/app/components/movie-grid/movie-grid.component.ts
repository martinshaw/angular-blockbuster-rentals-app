import { Component, Inject, afterNextRender } from '@angular/core';
import { MovieGridItemComponent } from '../movie-grid-item/movie-grid-item.component';
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router';
import { MoviesService } from '../../services/movies.service';
import { MovieModelType } from '../../services/database.service';
import { Observable } from 'dexie';

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
  public movies$ = this.moviesService.getAllMovies$();

  constructor(
    public moviesService: MoviesService,
  ) {
    //
  }

  ngOnInit() {
    //
    console.log('MovieGridComponent.ngOnInit()', this.movies$.subscribe(a => console.log(a)));
  }

  keyMovieBy(index: number, list: MovieModelType) {
    return `${list.id}${list.title}`;
  }
}
