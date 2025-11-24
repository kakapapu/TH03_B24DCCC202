
export type DanhMuc = 'Điện tử' | 'Quần áo' | 'Đồ ăn' | 'Sách' | 'Khác';

export interface Product {
  id: number;           
  ten: string;          
  danhMuc: DanhMuc;     
  gia: number;          
  soLuong: number;      
  moTa: string;         
}

export interface ProductState {
  products: Product[];
}

export type ProductAction =
  | { type: 'ADD_PRODUCT'; payload: Product }        
  | { type: 'UPDATE_PRODUCT'; payload: Product }     
  | { type: 'DELETE_PRODUCT'; payload: number }      
  | { type: 'SET_PRODUCTS'; payload: Product[] };    


export interface FilterParams {
  searchTerm: string;   
  category: string;     
  minPrice: number;     
  maxPrice: number;    
}

export interface FormErrors {
  ten?: string;         
  gia?: string;         
  soLuong?: string;     
  danhMuc?: string;     
}