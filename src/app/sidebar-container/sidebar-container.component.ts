import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterModule } from '@angular/router';
import { RentalCreationSidebarFormService, RentalCreationSidebarFormServiceObservableValueType } from '../rental-creation-sidebar-form.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sidebar-container',
  standalone: true,
  imports: [
    RouterModule,
    MatButtonModule,
    MatSidenavModule
  ],
  templateUrl: './sidebar-container.component.html',
  styleUrl: './sidebar-container.component.scss',
  providers: [
    RentalCreationSidebarFormService,
  ],
})
export class SidebarContainerComponent implements OnInit, OnDestroy {
  public rentalCreationSidebarObservableValue: RentalCreationSidebarFormServiceObservableValueType = {
    sidebarIsOpen: false,
  };
  private subs: Subscription[] = [];

  constructor(
    public rentalCreationSidebarFormService: RentalCreationSidebarFormService,
  ) { }

  InitSubscriptions() {
    this.subs.push(
      this.rentalCreationSidebarFormService.$observable.subscribe({next: (value) => {
        console.log('SidebarContainerComponent ngOnInit 2', value);
        this.rentalCreationSidebarObservableValue = value;
      }})
    );
  }

  ngOnInit() {
    console.log('SidebarContainerComponent ngOnInit 1');

    this.InitSubscriptions();
  }

  ngOnDestroy() {
    this.subs.forEach(s => s.unsubscribe());
  }
}
