import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { Product, ProductState, ProductAction } from '../types/product';
import { productReducer } from './ProductReducer';
import { initialProducts } from '../data/initialProducts';

interface ProductContextType {
  state: ProductState;
  dispatch: React.Dispatch<ProductAction>;
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (id: number) => void;
  getProductById: (id: number) => Product | undefined;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(productReducer, {
    products: initialProducts
  });

  const addProduct = (product: Omit<Product, 'id'>) => {
    const newProduct: Product = {
      ...product,
      id: Math.max(...state.products.map(p => p.id), 0) + 1
    };
    dispatch({ type: 'ADD_PRODUCT', payload: newProduct });
  };

  const updateProduct = (product: Product) => {
    dispatch({ type: 'UPDATE_PRODUCT', payload: product });
  };

  const deleteProduct = (id: number) => {
    dispatch({ type: 'DELETE_PRODUCT', payload: id });
  };

  const getProductById = (id: number): Product | undefined => {
    return state.products.find(product => product.id === id);
  };

  return (
    <ProductContext.Provider
      value={{
        state,
        dispatch,
        addProduct,
        updateProduct,
        deleteProduct,
        getProductById
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = (): ProductContextType => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts must be used within ProductProvider');
  }
  return context;
};