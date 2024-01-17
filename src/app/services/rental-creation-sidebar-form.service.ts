import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, Subscriber } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RentalCreationSidebarFormService {
  sidebarIsOpen: boolean = false;

  constructor() {
    //
  }

  public setSidebarIsOpen(value: boolean = true) {
    this.sidebarIsOpen = value;
  }
}
