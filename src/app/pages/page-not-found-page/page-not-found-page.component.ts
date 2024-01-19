import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-page-not-found-page',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
  ],
  templateUrl: './page-not-found-page.component.html',
  styleUrl: './page-not-found-page.component.scss'
})
export class PageNotFoundPageComponent {

}
