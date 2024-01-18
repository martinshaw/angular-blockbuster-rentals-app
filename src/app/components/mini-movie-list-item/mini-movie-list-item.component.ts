import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RentalCreationSidebarFormService } from '../../services/rental-creation-sidebar-form.service';
import { MovieModelType } from '../../app.types';

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
  @Input() movie!: MovieModelType;

  constructor(
    public rentalCreationSidebarFormService: RentalCreationSidebarFormService,
  ) {
    //
  }
}
