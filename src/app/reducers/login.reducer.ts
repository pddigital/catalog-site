
import { ActionReducer, Action, State } from '@ngrx/store';

export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

const initialState: boolean = false;

export function LoginReducer(state = initialState, action: Action) {
 switch (action.type) {
    case 'LOGIN':
      return true;

    case 'LOGOUT':
      return false;

    default:
      return state;
  }
}