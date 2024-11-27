import React, { createContext, useContext, useReducer, ReactNode } from 'react';

interface ShoppingList {
  id: string;
  name: string;
  products: Product[];
}

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  rating: number;
  reviews: number;
  inStock: boolean;
}

interface ShoppingListState {
  lists: ShoppingList[];
  activeListId: string | null;
}

type ShoppingListAction =
  | { type: 'CREATE_LIST'; payload: { name: string } }
  | { type: 'DELETE_LIST'; payload: { listId: string } }
  | { type: 'ADD_TO_LIST'; payload: { listId: string; product: Product } }
  | { type: 'REMOVE_FROM_LIST'; payload: { listId: string; productId: number } }
  | { type: 'SET_ACTIVE_LIST'; payload: { listId: string } };

const initialState: ShoppingListState = {
  lists: [],
  activeListId: null,
};

function shoppingListReducer(state: ShoppingListState, action: ShoppingListAction): ShoppingListState {
  switch (action.type) {
    case 'CREATE_LIST':
      const newList: ShoppingList = {
        id: Date.now().toString(),
        name: action.payload.name,
        products: [],
      };
      return {
        ...state,
        lists: [...state.lists, newList],
        activeListId: newList.id,
      };

    case 'DELETE_LIST':
      return {
        ...state,
        lists: state.lists.filter((list) => list.id !== action.payload.listId),
        activeListId: state.activeListId === action.payload.listId ? null : state.activeListId,
      };

    case 'ADD_TO_LIST':
      return {
        ...state,
        lists: state.lists.map((list) =>
          list.id === action.payload.listId
            ? {
                ...list,
                products: [...list.products, action.payload.product],
              }
            : list
        ),
      };

    case 'REMOVE_FROM_LIST':
      return {
        ...state,
        lists: state.lists.map((list) =>
          list.id === action.payload.listId
            ? {
                ...list,
                products: list.products.filter((product) => product.id !== action.payload.productId),
              }
            : list
        ),
      };

    case 'SET_ACTIVE_LIST':
      return {
        ...state,
        activeListId: action.payload.listId,
      };

    default:
      return state;
  }
}

const ShoppingListContext = createContext<{
  state: ShoppingListState;
  dispatch: React.Dispatch<ShoppingListAction>;
} | null>(null);

export function ShoppingListProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(shoppingListReducer, initialState);

  return (
    <ShoppingListContext.Provider value={{ state, dispatch }}>
      {children}
    </ShoppingListContext.Provider>
  );
}

export function useShoppingList() {
  const context = useContext(ShoppingListContext);
  if (!context) {
    throw new Error('useShoppingList must be used within a ShoppingListProvider');
  }
  return context;
}
