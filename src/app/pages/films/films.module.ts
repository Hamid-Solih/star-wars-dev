import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilmsComponent } from './films.component';
import { FilmsRoutingModule } from './films-routing.module';

@NgModule({
  declarations: [FilmsComponent],
  imports: [CommonModule, FilmsRoutingModule],
})
export class FilmsModule {}
