import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTabsModule } from '@angular/material/tabs';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatTabsModule,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  @Input() title!: string;
  @Output() onToggleSidebar = new EventEmitter();

  constructor(
    private router: Router,
  ) { }

  linkCaptions = ['Movies', 'Rentals', 'Customers'] as const;

  links: {[key in typeof this.linkCaptions[number]]: string} = {
    'Movies': '/movies',
    'Rentals': '/rentals',
    'Customers': '/customers',
  }

  activeLink: (typeof this.linkCaptions[number]) | null = null;

  ngOnInit(): void {
    for (const [key, value] of Object.entries(this.links)) {
      if (this.router.url.startsWith(value)) this.activeLink = key as (typeof this.linkCaptions[number]);
    }
  }

  toggleSidebar() {
    this.onToggleSidebar.emit();
  }

  onTabClick(newLink: (typeof this.linkCaptions[number])) {
    this.router.navigate([this.links[newLink]]);
    this.activeLink = newLink;
  }

  isTabActive(linkCaption: (typeof this.linkCaptions[number])) {
    return this.router.url.startsWith(this.links[linkCaption])
  }
}
