import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StarshipsComponent } from './starships.component';
import { StarshipsRoutingModule } from './starships-routing.module';
import { CoreModule } from 'src/app/core/core.module';
import { MatPaginatorModule } from '@angular/material/paginator';

@NgModule({
  declarations: [StarshipsComponent],
  imports: [
    CommonModule,
    StarshipsRoutingModule,
    CoreModule,
    MatPaginatorModule,
  ],
})
export class StarshipsModule {}
