import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RentalCreationSidebarComponent } from './components/rental-creation-sidebar/rental-creation-sidebar.component';
import { RentalCreationSidebarFormService } from '../../services/rental-creation-sidebar-form.service';

@Component({
  selector: 'app-authenticated-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    RouterOutlet,
    HeaderComponent,
    MatButtonModule,
    MatToolbarModule,
    MatSidenavModule,
    RentalCreationSidebarComponent,
  ],
  templateUrl: './authenticated-layout.component.html',
  styleUrl: './authenticated-layout.component.scss'
})
export class AuthenticatedLayoutComponent {
  title = 'Blockbuster Rental';

  constructor(
    public rentalCreationSidebarFormService: RentalCreationSidebarFormService,
  ) {
    //
  }
}


