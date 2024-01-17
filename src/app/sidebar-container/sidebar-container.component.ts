import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterModule } from '@angular/router';
import { RentalCreationSidebarFormService, RentalCreationSidebarFormServiceObservableValueType } from '../rental-creation-sidebar-form.service';
import { Observable, Subscription } from 'rxjs';
import { AsyncPipe, JsonPipe } from '@angular/common';

@Component({
  selector: 'app-sidebar-container',
  standalone: true,
  imports: [
    RouterModule,
    MatButtonModule,
    MatSidenavModule,
    AsyncPipe,
    JsonPipe,
  ],
  templateUrl: './sidebar-container.component.html',
  styleUrl: './sidebar-container.component.scss',
  providers: [
    RentalCreationSidebarFormService,
  ],
})
export class SidebarContainerComponent implements OnInit {
  public rentalCreationSidebarObservableValue$!: Observable<RentalCreationSidebarFormServiceObservableValueType>;

  constructor(
    public rentalCreationSidebarFormService: RentalCreationSidebarFormService,
  ) { }

  ngOnInit() {
    console.log('SidebarContainerComponent ngOnInit 1');



    /// https://www.telerik.com/blogs/angular-basics-step-by-step-understanding-async-pipe



    this.rentalCreationSidebarObservableValue$ = this.rentalCreationSidebarFormService.$observable;
  }
}
