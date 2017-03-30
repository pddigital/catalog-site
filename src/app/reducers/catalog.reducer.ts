
import { ActionReducer, Action, State } from '@ngrx/store';
import { Catalog } from '../modals/catalog';

export const ADD_CATALOGS = 'ADD_CATALOGS';
export const CREATE_CATALOG = 'CREATE_CATALOG';
export const UPDATE_CATALOG = 'UPDATE_CATALOG';
export const DELETE_CATALOG = 'DELETE_CATALOG';

const initialState: any = [];

export function CatalogReducer(state = initialState, action: Action) {
 switch (action.type) {
    case 'ADD_CATALOGS':
      return action.payload;
    case 'CREATE_CATALOG':
      return [...state, action.payload];
    case 'UPDATE_CATALOG':
      return state.map(catalog => {
        return catalog._id === action.payload._id ? Object.assign({}, catalog, action.payload) : catalog;
      });
    case 'DELETE_CATALOG':
      return state.filter(catalog => {
        return catalog._id !== action.payload._id;
      });
    default:
      return state;
  }
}