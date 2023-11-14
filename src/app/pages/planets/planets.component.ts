import { Component } from '@angular/core';
import { Observable, tap, map, take, startWith } from 'rxjs';
import { Planet } from 'src/app/core/interfaces/planet';
import { CoreDataService } from 'src/app/core/utils/data.service';

@Component({
  selector: 'app-planets',
  templateUrl: './planets.component.html',
  styleUrls: ['./planets.component.scss'],
})
export class PlanetsComponent {
  requestCache$: Map<string, Observable<any>> = new Map();
  planets$?: Observable<Planet[]>;
  planetsCount: number = 0;

  constructor(public ds: CoreDataService) {
    this.updatePage();
  }

  updatePage(page: number = 1) {
    this.planets$ = this.ds.getPlanets({ page }).pipe(
      tap((paginatedResult) => {
        this.planetsCount = paginatedResult.count;
      }),
      map((paginatedResult) => paginatedResult.results),
      map((planets) => {
        const planetsWithAllData: any[] = [];
        planets.forEach((planet) => {
          let newPlanet: any = {};
          Object.assign(newPlanet, planet);
          Object.entries(planet).forEach(([key, value]) => {
            if (value.includes('http')) {
              if (!this.requestCache$.has(value.toString())) {
                this.requestCache$.set(value.toString(), this.ds.get(value));
              }
              this.requestCache$
                .get(value.toString())
                ?.pipe(take(1))
                .subscribe((data) => {
                  newPlanet[key] = Object.values(data)[0];
                });
            } else if (value instanceof Array) {
              let newItem: any = [];
              value.forEach((url) => {
                if (!this.requestCache$.has(url.toString())) {
                  this.requestCache$.set(url.toString(), this.ds.get(url));
                }

                this.requestCache$
                  .get(url.toString())
                  ?.pipe(take(1))
                  .subscribe((data) => {
                    newItem.push(Object.values(data)[0]);
                  });
              });
              newPlanet[key] = newItem;
            }
          });
          planetsWithAllData.push(newPlanet);
        });
        return planetsWithAllData;
      }),
      startWith([])
    );
  }

  handlePageChange(event: any) {
    this.updatePage(event.pageIndex + 1);
  }
}
