import { ChangeDetectionStrategy, Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterModule } from '@angular/router';
import { RentalCreationSidebarFormService } from '../../../../services/rental-creation-sidebar-form.service';
import { Observable, Subscription } from 'rxjs';
import { AsyncPipe, CommonModule, JsonPipe } from '@angular/common';

@Component({
  selector: 'app-sidebar-container',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatSidenavModule,
    AsyncPipe,
    JsonPipe,
  ],
  templateUrl: './sidebar-container.component.html',
  styleUrl: './sidebar-container.component.scss',
})
export class SidebarContainerComponent implements OnInit, OnDestroy, OnChanges {
  constructor(
    public rentalCreationSidebarFormService: RentalCreationSidebarFormService,
  ) { }

  ngOnInit() {
    //
  }

  ngOnChanges(changes: SimpleChanges): void {
    //
  }

  ngOnDestroy() {
    //
  }
}
