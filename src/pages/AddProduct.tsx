import React from 'react';
import { useProducts } from '../context/ProductContext';
import ProductForm from '../components/ProductForm';

const AddProduct: React.FC = () => {
  const { addProduct } = useProducts();

  return (
    <div className="add-product-page">
      <h1>Thêm Sản Phẩm Mới</h1>
      <ProductForm onSubmit={addProduct} submitLabel="Thêm sản phẩm" />
    </div>
  );
};

export default AddProduct;