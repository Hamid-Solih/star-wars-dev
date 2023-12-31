import { Component } from '@angular/core';
import { Observable, tap, map, take, startWith } from 'rxjs';
import { Specie } from 'src/app/core/interfaces/specie';
import { CoreDataService } from 'src/app/core/utils/data.service';
import { Store } from '@ngrx/store';
import { openDialogAction } from 'src/app/core/store/dialog.actions';

@Component({
  selector: 'app-species',
  templateUrl: './species.component.html',
  styleUrls: ['./species.component.scss'],
})
export class SpeciesComponent {
  requestCache$: Map<string, Observable<any>> = new Map();
  species$?: Observable<Specie[]>;
  speciesCount: number = 0;

  constructor(
    public ds: CoreDataService,
    private store: Store<{ url: string }>
  ) {
    this.updatePage();
  }

  updatePage(page: number = 1) {
    this.species$ = this.ds.getSpecies({ page }).pipe(
      tap((paginatedResult) => {
        this.speciesCount = paginatedResult.count;
      }),
      map((paginatedResult) => paginatedResult.results),
      map((species) => {
        const speciesWithAllData: any[] = [];
        species.forEach((specie) => {
          let newSpecie: any = {};
          Object.assign(newSpecie, specie);
          Object.entries(specie).forEach(([key, value]) => {
            if (value && value.includes('http') && key !== 'url') {
              if (!this.requestCache$.has(value.toString())) {
                this.requestCache$.set(value.toString(), this.ds.get(value));
              }
              this.requestCache$
                .get(value.toString())
                ?.pipe(take(1))
                .subscribe((data) => {
                  newSpecie[key] = Object.values(data)[0];
                });
            } else if (value instanceof Array) {
              let newItem: any = value.map((url: string) => 'loading...');
              value.forEach((url) => {
                if (!this.requestCache$.has(url.toString())) {
                  this.requestCache$.set(url.toString(), this.ds.get(url));
                }

                this.requestCache$
                  .get(url.toString())
                  ?.pipe(take(1))
                  .subscribe((data: any) => {
                    newItem[value.indexOf(url)] = Object.values(data)[0];
                  });
              });
              newSpecie[key] = newItem;
            }
          });
          speciesWithAllData.push(newSpecie);
        });
        return speciesWithAllData;
      }),
      startWith([])
    );
  }

  handlePageChange(event: any) {
    this.updatePage(event.pageIndex + 1);
  }

  openDialog(url: string) {
    this.store.dispatch(openDialogAction({ url }));
  }
}
