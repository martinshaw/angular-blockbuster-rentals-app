import { Injectable } from '@angular/core';
import { DatabaseService, MovieModelType } from './database.service';
import { Observable, liveQuery } from 'dexie';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  constructor(
    public databaseService: DatabaseService,
  ) { }

  getAllMovies$(): Observable<MovieModelType[]> {
    (async () => {
      console.log('MoviesService.getAllMovies$()', await this.databaseService.movies.toArray());
    })();

    return liveQuery(() => this.databaseService.movies.toArray());
  }
}
