import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { MovieModelType, MovieRentalPriceModelType } from '../app.types';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  constructor(
    public apiService: ApiService,
  ) { }

  getAllMovies$(): Promise<MovieModelType[]> {
    return this.apiService
      .makeRequest<MovieModelType[]>('/movies')
      .then((response) => response.data)
      .catch((error) => {
        console.error(error);
        return [];
      });
  }

  getMoviesByIds$(movieIds: MovieModelType['id'][]): Promise<MovieModelType[]> {
    return this.apiService
      .makeRequest<MovieModelType[]>(`/movies`, 'GET', {
        movie_id: movieIds.filter(id => id != null).map(id => id?.toString()) as string[],
      })
      .then((response) => response.data)
      .catch((error) => {
        console.error(error);
        return [];
      });
  }

  updateMovie$(movie: MovieModelType): Promise<MovieModelType | null> {
    return this.apiService
      .makeRequest<MovieModelType>(`/movies/${movie.id}`, 'PUT', {}, movie)
      .then((response) => response.data)
      .catch((error) => {
        console.error(error);
        return null;
      });
  }

  getMovieRentalPrices$(movieIds: MovieModelType['id'][], periods: MovieRentalPriceModelType['period'][]): Promise<MovieRentalPriceModelType[]> {
    return this.apiService
      .makeRequest<MovieRentalPriceModelType[]>(
        '/movies/rental-prices',
        'GET',
        {
          movie_id: movieIds.map(id => id?.toString()).filter(id => id != null) as string[],
          period: periods,
        }
      )
      .then((response) => response.data)
      .catch((error) => {
        console.error(error);
        return [];
      });
  }
}
