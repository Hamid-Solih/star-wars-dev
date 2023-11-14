import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilmsComponent } from './films.component';
import { FilmsRoutingModule } from './films-routing.module';
import { MatPaginatorModule } from '@angular/material/paginator';
import { CoreModule } from 'src/app/core/core.module';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [FilmsComponent],
  imports: [
    CommonModule,
    FilmsRoutingModule,
    MatPaginatorModule,
    MatIconModule,
    MatButtonModule,
    CoreModule,
  ],
})
export class FilmsModule {}
