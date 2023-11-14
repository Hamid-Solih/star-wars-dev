import { Component } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Store, select } from '@ngrx/store';
import { Observable, take } from 'rxjs';
import { DialogComponent } from './core/components/dialog/dialog.component';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  dialogUrl?: Observable<number>;

  constructor(private store: Store<{ url: string }>, public dialog: MatDialog) {
    store.pipe(select('url')).subscribe((data: any) => {
      if (data.url) {
        this.openDialog({
          data: data.url,
        });
      }
    });
  }

  openDialog(config: any) {
    const dialogInstance = this.dialog.open(DialogComponent, {
      maxWidth: '100vw',
      maxHeight: '100vh',
      height: '100%',
      width: '100%',
      ...config,
    });

    dialogInstance
      .afterClosed()
      .pipe(take(1))
      .subscribe(() => {
        this.dialog.closeAll();
      });
  }
}
