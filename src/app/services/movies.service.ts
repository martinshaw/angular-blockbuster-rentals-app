import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { MovieModelType } from '../app.types';

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
}
