import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VehiclesComponent } from './vehicles.component';
import { VehiclesRoutingModule } from './vehicles-routing.module';
import { CoreModule } from 'src/app/core/core.module';
import { MatPaginatorModule } from '@angular/material/paginator';

@NgModule({
  declarations: [VehiclesComponent],
  imports: [
    CommonModule,
    VehiclesRoutingModule,
    CoreModule,
    MatPaginatorModule,
  ],
})
export class VehiclesModule {}
