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
