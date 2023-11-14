import { Action, createReducer, on } from '@ngrx/store';
import { openDialogAction } from './dialog.actions';

export interface State {
  url: string;
}

export const initialState: State = {
  url: '',
};

const _dialogReducer = createReducer(
  initialState,
  on(openDialogAction, (state, { url }) => ({ url }))
);

export function dialogReducer(state: State | undefined, action: Action) {
  return _dialogReducer(state, action);
}
