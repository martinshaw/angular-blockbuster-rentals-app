import { Routes } from '@angular/router';
import { PageNotFoundPageComponent } from './pages/page-not-found-page/page-not-found-page.component';
import { AuthenticatedLayoutComponent } from './layouts/authenticated-layout/authenticated-layout.component';
import { MoviesIndexPageComponent } from './pages/movies-index-page/movies-index-page.component';
import { MoviesShowPageComponent } from './pages/movies-show-page/movies-show-page.component';
import { CustomersIndexPageComponent } from './pages/customers-index-page/customers-index-page.component';
import { CustomersShowPageComponent } from './pages/customers-show-page/customers-show-page.component';
import { RentalsIndexPageComponent } from './pages/rentals-index-page/rentals-index-page.component';
import { RentalsShowPageComponent } from './pages/rentals-show-page/rentals-show-page.component';

export const routes: Routes = [
  {
    path: '', component: AuthenticatedLayoutComponent, children: [
      { path: '', redirectTo: '/movies', pathMatch: 'full' }, // redirect to `first-component`
      { path: 'movies', component: MoviesIndexPageComponent },
      { path: 'movies/:id', component: MoviesShowPageComponent },
      { path: 'rentals', component: RentalsIndexPageComponent },
      { path: 'rentals/:id', component: RentalsShowPageComponent },
      { path: 'customers', component: CustomersIndexPageComponent },
      { path: 'customers/:id', component: CustomersShowPageComponent },
      { path: '**', component: PageNotFoundPageComponent },  // Wildcard route for a 404 page
    ]
  },
];
