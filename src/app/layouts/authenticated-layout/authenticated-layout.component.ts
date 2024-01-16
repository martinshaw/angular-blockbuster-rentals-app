import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../../header/header.component';
import { SidebarContainerComponent } from '../../sidebar-container/sidebar-container.component';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-authenticated-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    RouterOutlet,
    HeaderComponent,
    SidebarContainerComponent,
    MatButtonModule,
  ],
  templateUrl: './authenticated-layout.component.html',
  styleUrl: './authenticated-layout.component.scss'
})
export class AuthenticatedLayoutComponent {
  sidebarIsOpen = false;

  toggleSidebar() {
    this.sidebarIsOpen = !this.sidebarIsOpen;
  }
}
