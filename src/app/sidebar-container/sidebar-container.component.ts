import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar-container',
  standalone: true,
  imports: [
    RouterModule,
    MatButtonModule,
    MatSidenavModule
  ],
  templateUrl: './sidebar-container.component.html',
  styleUrl: './sidebar-container.component.scss'
})
export class SidebarContainerComponent {
  @Input() sidebarIsOpen!: boolean;
}
