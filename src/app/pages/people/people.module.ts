import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PeopleComponent } from './people.component';
import { PeopleRoutingModule } from './people-routing.module';
import { MatPaginatorModule } from '@angular/material/paginator';
import { CoreModule } from 'src/app/core/core.module';

@NgModule({
  declarations: [PeopleComponent],
  imports: [CommonModule, PeopleRoutingModule, MatPaginatorModule, CoreModule],
})
export class PeopleModule {}
