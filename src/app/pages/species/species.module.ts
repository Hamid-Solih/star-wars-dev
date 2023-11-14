import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpeciesComponent } from './species.component';
import { SpeciesRoutingModule } from './species-routing.module';
import { CoreModule } from 'src/app/core/core.module';
import { MatPaginatorModule } from '@angular/material/paginator';

@NgModule({
  declarations: [SpeciesComponent],
  imports: [CommonModule, SpeciesRoutingModule, CoreModule, MatPaginatorModule],
})
export class SpeciesModule {}
