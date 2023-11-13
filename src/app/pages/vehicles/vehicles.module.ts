import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VehiclesComponent } from './vehicles.component';
import { VehiclesRoutingModule } from './vehicles-routing.module';

@NgModule({
  declarations: [VehiclesComponent],
  imports: [CommonModule, VehiclesRoutingModule],
})
export class VehiclesModule {}
