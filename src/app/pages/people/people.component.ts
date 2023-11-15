import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, map, startWith, take, tap } from 'rxjs';
import { Person } from 'src/app/core/interfaces/person';
import { openDialogAction } from 'src/app/core/store/dialog.actions';
import { CoreDataService } from 'src/app/core/utils/data.service';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.scss'],
})
export class PeopleComponent {
  requestCache$: Map<string, Observable<any>> = new Map();
  people$?: Observable<Person[]>;
  peopleCount: number = 0;

  constructor(
    public ds: CoreDataService,
    private store: Store<{ url: string }>
  ) {
    this.updatePage();
  }

  updatePage(page: number = 1) {
    this.people$ = this.ds.getPeople({ page }).pipe(
      tap((paginatedResult) => {
        this.peopleCount = paginatedResult.count;
      }),
      map((paginatedResult) => paginatedResult.results),
      map((people) => {
        const peopleWithAllData: any[] = [];
        people.forEach((person) => {
          let newPerson: any = {};
          Object.assign(newPerson, person);
          Object.entries(person).forEach(([key, value]) => {
            if (value.includes('http') && key !== 'url') {
              if (!this.requestCache$.has(value.toString())) {
                this.requestCache$.set(value.toString(), this.ds.get(value));
              }
              this.requestCache$
                .get(value.toString())
                ?.pipe(take(1))
                .subscribe((data) => {
                  newPerson[key] = Object.values(data)[0];
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
              newPerson[key] = newItem;
            }
          });
          peopleWithAllData.push(newPerson);
        });
        return peopleWithAllData;
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
