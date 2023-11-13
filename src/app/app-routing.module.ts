import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        title: 'Home',
        loadChildren: () =>
          import('./pages/home/home.module').then((m) => m.HomeModule),
      },
      {
        path: 'films',
        title: 'Films',
        loadChildren: () =>
          import('./pages/films/films.module').then((m) => m.FilmsModule),
      },
      {
        path: 'people',
        title: 'People',
        loadChildren: () =>
          import('./pages/people/people.module').then((m) => m.PeopleModule),
      },
      {
        path: 'planets',
        title: 'Planets',
        loadChildren: () =>
          import('./pages/planets/planets.module').then((m) => m.PlanetsModule),
      },
      {
        path: 'species',
        title: 'Species',
        loadChildren: () =>
          import('./pages/species/species.module').then((m) => m.SpeciesModule),
      },
      {
        path: 'starships',
        title: 'Starships',
        loadChildren: () =>
          import('./pages/starships/starships.module').then(
            (m) => m.StarshipsModule
          ),
      },
      {
        path: 'vehicles',
        title: 'Vehicles',
        loadChildren: () =>
          import('./pages/vehicles/vehicles.module').then(
            (m) => m.VehiclesModule
          ),
      },
    ],
  },
  // {
  //   path: '**',
  //   component: ErrorComponent,
  // },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
