import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlanetsComponent } from './planets.component';
import { PlanetsRoutingModule } from './planets-routing.module';
import { CoreModule } from 'src/app/core/core.module';
import { MatPaginatorModule } from '@angular/material/paginator';

@NgModule({
  declarations: [PlanetsComponent],
  imports: [CommonModule, PlanetsRoutingModule, CoreModule, MatPaginatorModule, ],
})
export class PlanetsModule {}
