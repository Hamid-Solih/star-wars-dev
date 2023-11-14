import { createAction, props } from '@ngrx/store';

export const openDialogAction = createAction(
  '[Any page] Open Dialog',
  props<{ url: string }>()
);
