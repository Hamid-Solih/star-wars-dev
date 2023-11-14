import { Component } from '@angular/core';
import { Observable, tap, map, take, startWith } from 'rxjs';
import { Vehicle } from 'src/app/core/interfaces/vehicle';
import { CoreDataService } from 'src/app/core/utils/data.service';
import { Store } from '@ngrx/store';
import { openDialogAction } from 'src/app/core/store/dialog.actions';

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.scss'],
})
export class VehiclesComponent {
  requestCache$: Map<string, Observable<any>> = new Map();
  vehicles$?: Observable<Vehicle[]>;
  vehiclesCount: number = 0;

  constructor(
    public ds: CoreDataService,
    private store: Store<{ url: string }>
  ) {
    this.updatePage();
  }

  updatePage(page: number = 1) {
    this.vehicles$ = this.ds.getVehicles({ page }).pipe(
      tap((paginatedResult) => {
        this.vehiclesCount = paginatedResult.count;
      }),
      map((paginatedResult) => paginatedResult.results),
      map((vehicles) => {
        const vehiclesWithAllData: any[] = [];
        vehicles.forEach((vehicle) => {
          let newVehicle: any = {};
          Object.assign(newVehicle, vehicle);
          Object.entries(vehicle).forEach(([key, value]) => {
            if (value && value.includes('http')) {
              if (!this.requestCache$.has(value.toString())) {
                this.requestCache$.set(value.toString(), this.ds.get(value));
              }
              this.requestCache$
                .get(value.toString())
                ?.pipe(take(1))
                .subscribe((data) => {
                  newVehicle[key] = Object.values(data)[0];
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
              newVehicle[key] = newItem;
            }
          });
          vehiclesWithAllData.push(newVehicle);
        });
        return vehiclesWithAllData;
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
