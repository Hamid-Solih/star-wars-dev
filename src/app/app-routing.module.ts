import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        title: 'Star Wars',
        loadChildren: () =>
          import('./pages/home/home.module').then((m) => m.HomeModule),
      },
      {
        path: 'films',
        title: 'Star Wars: Films',
        loadChildren: () =>
          import('./pages/films/films.module').then((m) => m.FilmsModule),
      },
      {
        path: 'people',
        title: 'Star Wars: People',
        loadChildren: () =>
          import('./pages/people/people.module').then((m) => m.PeopleModule),
      },
      {
        path: 'planets',
        title: 'Star Wars: Planets',
        loadChildren: () =>
          import('./pages/planets/planets.module').then((m) => m.PlanetsModule),
      },
      {
        path: 'species',
        title: 'Star Wars: Species',
        loadChildren: () =>
          import('./pages/species/species.module').then((m) => m.SpeciesModule),
      },
      {
        path: 'starships',
        title: 'Star Wars: Starships',
        loadChildren: () =>
          import('./pages/starships/starships.module').then(
            (m) => m.StarshipsModule
          ),
      },
      {
        path: 'vehicles',
        title: 'Star Wars: Vehicles',
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
