import { CommonModule, CurrencyPipe } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterModule } from '@angular/router';
import { RentalCreationSidebarFormService } from '../../../../services/rental-creation-sidebar-form.service';
import { MiniMovieListComponent } from '../../../../components/mini-movie-list/mini-movie-list.component';

@Component({
  selector: 'app-rental-creation-sidebar',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatSidenavModule,
    MiniMovieListComponent,
    CurrencyPipe,
  ],
  templateUrl: './rental-creation-sidebar.component.html',
  styleUrl: './rental-creation-sidebar.component.scss'
})
export class RentalCreationSidebarComponent {
  constructor(
    public rentalCreationSidebarFormService: RentalCreationSidebarFormService,
  ) { }
}
