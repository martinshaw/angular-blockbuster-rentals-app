import { AsyncPipe, CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { RentalsService } from '../../services/rentals.service';
import { MovieModelType, RentalModelType } from '../../app.types';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { MatCardModule } from '@angular/material/card';
import { MoviesService } from '../../services/movies.service';
import { MovieGridItemComponent } from '../../components/movie-grid-item/movie-grid-item.component';
import { MovieGridComponent } from '../../components/movie-grid/movie-grid.component';

@Component({
  selector: 'app-rentals-show-page',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MovieGridItemComponent,
    AsyncPipe,
    DatePipe,
  ],
  templateUrl: './rentals-show-page.component.html',
  styleUrl: './rentals-show-page.component.scss'
})
export class RentalsShowPageComponent implements OnInit {
  public rental$!: Promise<RentalModelType | null>;
  public rentalOverdueByDays: number = 0;
  public numberOfItemsRented: number = 0;
  public movies: Record<string, MovieModelType> = {};

  constructor(
    public rentalsService: RentalsService,
    public moviesService: MoviesService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.rental$ = this.rentalsService.getRentalById$(params['id'])
        .then(async (rental) => {

          this.rentalOverdueByDays = rental?.end_date_at == null ?
            0 :
            Math.ceil(((new Date).getTime() - (new Date(rental.end_date_at)).getTime()) / (1000 * 3600 * 24));

          this.numberOfItemsRented = rental?.rentalMoviePivot?.length ?? 0;

          const movieIds = rental?.rentalMoviePivot?.map((rentalMoviePivot) => rentalMoviePivot.movie_id) ?? [];
          const unkeyedMovies = await this.moviesService.getMoviesByIds$(movieIds);
          this.movies = unkeyedMovies.reduce((c, movie) => {
            if (movie.id != null) c[movie.id] = movie;
            return c;
          }, {} as {[key: string]: MovieModelType});

          return rental;
        });
    })
  }
}
