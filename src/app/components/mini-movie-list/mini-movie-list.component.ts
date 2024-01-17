import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MovieType } from '../../app.types';
import { MiniMovieListItemComponent } from '../mini-movie-list-item/mini-movie-list-item.component';

@Component({
  selector: 'app-mini-movie-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MiniMovieListItemComponent,
  ],
  templateUrl: './mini-movie-list.component.html',
  styleUrl: './mini-movie-list.component.scss'
})
export class MiniMovieListComponent {
  @Input() movies: MovieType[] = [];
}
