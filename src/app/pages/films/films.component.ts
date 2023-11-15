import { Component } from '@angular/core';
import { Observable, tap, map, take, startWith } from 'rxjs';
import { Film } from 'src/app/core/interfaces/film';
import { CoreDataService } from 'src/app/core/utils/data.service';
import { Store } from '@ngrx/store';
import { openDialogAction } from 'src/app/core/store/dialog.actions';

@Component({
  selector: 'app-films',
  templateUrl: './films.component.html',
  styleUrls: ['./films.component.scss'],
})
export class FilmsComponent {
  requestCache$: Map<string, Observable<any>> = new Map();
  films$?: Observable<Film[]>;
  filmsCount: number = 0;

  constructor(
    public ds: CoreDataService,
    private store: Store<{ url: string }>
  ) {
    this.updatePage();
  }

  updatePage(page: number = 1) {
    this.films$ = this.ds.getFilms({ page }).pipe(
      tap((paginatedResult) => {
        this.filmsCount = paginatedResult.count;
      }),
      map((paginatedResult) => paginatedResult.results),
      map((films) => {
        const filmsWithAllData: any[] = [];
        films.forEach((film) => {
          let newFilm: any = {};
          Object.assign(newFilm, film);
          Object.entries(film).forEach(([key, value]) => {
            if (
              typeof value === 'string' &&
              value.includes('http') &&
              key !== 'url'
            ) {
              if (!this.requestCache$.has(value.toString())) {
                this.requestCache$.set(value.toString(), this.ds.get(value));
              }
              this.requestCache$
                .get(value.toString())
                ?.pipe(take(1))
                .subscribe((data) => {
                  newFilm[key] = Object.values(data)[0];
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
              newFilm[key] = newItem;
            }
          });
          filmsWithAllData.push(newFilm);
        });
        return filmsWithAllData;
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
