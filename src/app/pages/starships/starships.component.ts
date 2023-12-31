import { Component } from '@angular/core';
import { Observable, tap, map, take, startWith } from 'rxjs';
import { Starship } from 'src/app/core/interfaces/starship';
import { CoreDataService } from 'src/app/core/utils/data.service';
import { Store } from '@ngrx/store';
import { openDialogAction } from 'src/app/core/store/dialog.actions';

@Component({
  selector: 'app-starships',
  templateUrl: './starships.component.html',
  styleUrls: ['./starships.component.scss'],
})
export class StarshipsComponent {
  requestCache$: Map<string, Observable<any>> = new Map();
  starships$?: Observable<Starship[]>;
  starshipsCount: number = 0;

  constructor(
    public ds: CoreDataService,
    private store: Store<{ url: string }>
  ) {
    this.updatePage();
  }

  updatePage(page: number = 1) {
    this.starships$ = this.ds.getStarships({ page }).pipe(
      tap((paginatedResult) => {
        this.starshipsCount = paginatedResult.count;
      }),
      map((paginatedResult) => paginatedResult.results),
      map((starships) => {
        const starshipsWithAllData: any[] = [];
        starships.forEach((starship) => {
          let newStarship: any = {};
          Object.assign(newStarship, starship);
          Object.entries(starship).forEach(([key, value]) => {
            if (value && value.includes('http') && key !== 'url') {
              if (!this.requestCache$.has(value.toString())) {
                this.requestCache$.set(value.toString(), this.ds.get(value));
              }
              this.requestCache$
                .get(value.toString())
                ?.pipe(take(1))
                .subscribe((data) => {
                  newStarship[key] = Object.values(data)[0];
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
              newStarship[key] = newItem;
            }
          });
          starshipsWithAllData.push(newStarship);
        });
        return starshipsWithAllData;
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
