import { Facility } from '@/lib/validation'

export const ADD_ITEM = 'ADD_ITEM';
export const REMOVE_ITEM = 'REMOVE_ITEM';
export const UPDATE_ITEM = 'UPDATE_ITEM';
export const FETCH_ITEMS = 'FETCH_ITEMS';
export const FETCH_ITEM = 'FETCH_ITEM';

interface AddItemAction {
  type: typeof ADD_ITEM;
  payload: Facility;
}

interface RemoveItemAction {
  type: typeof REMOVE_ITEM;
  payload: number;
}

interface UpdateItemAction {
  type: typeof UPDATE_ITEM;
  payload: Facility;
}

interface FetchItemsAction {
  type: typeof FETCH_ITEMS;
  payload: Facility[];
}

interface FetchItemAction {
  type: typeof FETCH_ITEM;
  payload: Facility;
}

export type ActionTypes = AddItemAction | RemoveItemAction | UpdateItemAction | FetchItemsAction;

export const addItem = (facility: Facility): AddItemAction => ({ type: ADD_ITEM, payload: facility });
export const removeItem = (id: number): RemoveItemAction => ({ type: REMOVE_ITEM, payload: id });
export const updateItem = (facility: Facility): UpdateItemAction => ({ type: UPDATE_ITEM, payload: facility });
export const fetchItem = (facility: Facility): FetchItemAction => ({ type: FETCH_ITEM, payload: facility });
export const fetchItems = (facilities: Facility[]): FetchItemsAction => ({ type: FETCH_ITEMS, payload: facilities });
