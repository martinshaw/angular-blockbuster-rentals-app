import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MovieType } from '../../app.types';
import { MatIconModule } from '@angular/material/icon';
import { RentalCreationSidebarFormService } from '../../services/rental-creation-sidebar-form.service';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-mini-movie-list-item',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
  ],
  templateUrl: './mini-movie-list-item.component.html',
  styleUrl: './mini-movie-list-item.component.scss'
})
export class MiniMovieListItemComponent {
  @Input() movie!: MovieType;
  @Input() index!: number;

  constructor(
    public rentalCreationSidebarFormService: RentalCreationSidebarFormService,
  ) {
    //
  }
}
