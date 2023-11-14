import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideMenuComponent } from './components/navbar/side-menu.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterModule } from '@angular/router';
import { CardComponent } from './components/card/card.component';
import { LoaderComponent } from './components/loader/loader.component';
import { CrawlerComponent } from './components/crawler/crawler.component';
import { DialogComponent } from './components/dialog/dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { RemoveUnderscorePipe } from './pipes/remove-underscore.pipe';

@NgModule({
  declarations: [
    SideMenuComponent,
    CardComponent,
    LoaderComponent,
    CrawlerComponent,
    DialogComponent,
  ],
  exports: [
    SideMenuComponent,
    CardComponent,
    LoaderComponent,
    CrawlerComponent,
    DialogComponent,
  ],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    MatSidenavModule,
    MatDialogModule,
    RouterModule,
    RemoveUnderscorePipe
  ],
})
export class CoreModule {}
