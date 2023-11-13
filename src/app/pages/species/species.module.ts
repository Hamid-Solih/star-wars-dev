import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpeciesComponent } from './species.component';
import { SpeciesRoutingModule } from './species-routing.module';

@NgModule({
  declarations: [SpeciesComponent],
  imports: [CommonModule, SpeciesRoutingModule],
})
export class SpeciesModule {}
