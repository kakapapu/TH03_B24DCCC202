import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';
import ProductForm from '../components/ProductForm';

const EditProduct: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getProductById, updateProduct } = useProducts();

  const product = getProductById(Number(id));

  if (!product) {
    return (
      <div className="not-found">
        <h2>Sản phẩm không tồn tại</h2>
        <button onClick={() => navigate('/')} className="btn btn-primary">
          Về trang chủ
        </button>
      </div>
    );
  }

  return (
    <div className="edit-product-page">
      <h1>Chỉnh Sửa Sản Phẩm</h1>
      <ProductForm
        initialProduct={product}
        onSubmit={updateProduct}
        submitLabel="Cập nhật"
      />
    </div>
  );
};

export default EditProduct;