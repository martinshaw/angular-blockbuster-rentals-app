import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';

@Component({
  selector: 'app-sidebar-container',
  standalone: true,
  imports: [
    MatButtonModule,
    MatSidenavModule
  ],
  templateUrl: './sidebar-container.component.html',
  styleUrl: './sidebar-container.component.scss'
})
export class SidebarContainerComponent {
  @Input() sidebarIsOpen!: boolean;
}
