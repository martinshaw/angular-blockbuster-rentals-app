import { Injectable } from '@angular/core';
import { Observable, Subject, Subscriber } from 'rxjs';

export type RentalCreationSidebarFormServiceObservableValueType = {
  sidebarIsOpen: boolean,
};

@Injectable({
  providedIn: 'root'
})
export class RentalCreationSidebarFormService {
  public $observable = new Subject<RentalCreationSidebarFormServiceObservableValueType>();

  public sidebarIsOpen: boolean = false;

  constructor() {
    console.log('RentalCreationSidebarFormService constructor');

    this.$observable.next({
      sidebarIsOpen: this.sidebarIsOpen,
    });

    this.$observable.subscribe({next: (value) => {
      console.log('RentalCreationSidebarFormService $observable.subscribe', value);
    }});
  }

  public setSidebarIsOpen(value: boolean) {
    this.sidebarIsOpen = value;

    console.log('RentalCreationSidebarFormService setSidebarIsOpen', value);

    this.$observable.next({
      sidebarIsOpen: value,
    });
  }

  public getSidebarIsOpen() {
    return this.sidebarIsOpen;
  }
}
