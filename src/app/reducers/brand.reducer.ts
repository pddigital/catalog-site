
import { ActionReducer, Action, State } from '@ngrx/store';
import { Brand } from '../modals/brand';

export const ADD_BRANDS = 'ADD_BRANDS';
export const CREATE_BRAND = 'CREATE_BRAND';
export const UPDATE_BRAND = 'UPDATE_BRAND';
export const DELETE_BRAND = 'DELETE_BRAND';

const initialState: any = [];

export const BrandReducer: ActionReducer<any> = (state = initialState, action: Action) => {
 switch (action.type) {
    case 'ADD_BRANDS':
      return action.payload;
    case 'CREATE_BRAND':
      return [...state, action.payload];
    case 'UPDATE_BRAND':
      return state.map(brand => {
        return brand._id === action.payload._id ? Object.assign({}, brand, action.payload) : brand;
      });
    case 'DELETE_BRAND':
      return state.filter(brand => {
        return brand._id !== action.payload._id;
      });
    default:
      return state;
  }
}