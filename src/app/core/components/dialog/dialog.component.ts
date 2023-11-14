import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CoreDataService } from '../../utils/data.service';
import { Observable, catchError, map, take, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { openDialogAction } from '../../store/dialog.actions';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent {
  requestCache$: Map<string, any> = new Map();
  title: string = '';
  data$: Observable<any>;
  loadingState: boolean = true;
  error: boolean = false;
  constructor(
    @Inject(MAT_DIALOG_DATA) public configData: any,
    ds: CoreDataService,
    private store: Store<{ url: string }>
  ) {
    this.data$ = ds.get(configData).pipe(
      catchError((error) => {
        this.loadingState = false;
        return error;
      }),
      map((data: any) => {
        let item: any = {};
        this.title = data.name || data.title;
        this.loadingState = false;
        Object.assign(item, data);
        Object.entries(data).forEach(([key, value]) => {
          if (
            typeof value === 'string' &&
            value.includes('http') &&
            key !== 'url'
          ) {
            if (!this.requestCache$.has(value.toString())) {
              this.requestCache$.set(value.toString(), ds.get(value));
              item[key] = 'loading...';
            }
            this.requestCache$
              .get(value.toString())
              ?.pipe(take(1))
              .subscribe((data: any) => {
                item[key] = {
                  name: Object.values(data)[0],
                  url: value,
                };
              });
          } else if (value instanceof Array) {
            let newItem: any = [];
            value.forEach((url) => {
              if (!this.requestCache$.has(url.toString())) {
                this.requestCache$.set(url.toString(), ds.get(url));
                item[key] = 'loading...';
              }

              this.requestCache$
                .get(url.toString())
                ?.pipe(take(1))
                .subscribe((data: any) => {
                  newItem.push({
                    name: Object.values(data)[0],
                    url: url,
                  });
                });
            });
            item[key] = newItem;
          }
        });
        return item;
      })
    );
  }

  isArray(item: any) {
    return Array.isArray(item);
  }
  redirect(url: string) {
    this.store.dispatch(openDialogAction({ url }));
  }
}
