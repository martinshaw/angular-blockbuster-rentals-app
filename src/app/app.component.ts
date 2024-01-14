import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { SidebarContainerComponent } from './sidebar-container/sidebar-container.component';
import { MatButtonModule } from '@angular/material/button';
import { MovieGridComponent } from './movie-grid/movie-grid.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    HeaderComponent,
    SidebarContainerComponent,
    MatButtonModule,
    MovieGridComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Blockbuster Rental App';

  sidebarIsOpen = false;

  toggleSidebar() {
    this.sidebarIsOpen = !this.sidebarIsOpen;
  }
}
