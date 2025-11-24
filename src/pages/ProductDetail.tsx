import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getProductById, deleteProduct } = useProducts();

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

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  const handleDelete = () => {
    if (window.confirm(`Bạn có chắc muốn xóa sản phẩm "${product.ten}"?`)) {
      deleteProduct(product.id);
      navigate('/');
    }
  };

  return (
    <div className="product-detail">
      <button onClick={() => navigate('/')} className="btn-back">
        ← Quay lại
      </button>

      <div className="detail-container">
        <div className="detail-header">
          <h1>{product.ten}</h1>
          <span className="category-badge">{product.danhMuc}</span>
        </div>

        <div className="detail-content">
          <div className="detail-item">
            <strong>Giá:</strong>
            <span className="price">{formatPrice(product.gia)}</span>
          </div>

          <div className="detail-item">
            <strong>Số lượng:</strong>
            <span>{product.soLuong} sản phẩm</span>
          </div>

          <div className="detail-item">
            <strong>Mô tả:</strong>
            <p>{product.moTa}</p>
          </div>
        </div>

        <div className="detail-actions">
          <button
            onClick={() => navigate(`/edit/${product.id}`)}
            className="btn btn-edit"
          >
            Chỉnh sửa
          </button>
          <button onClick={handleDelete} className="btn btn-delete">
            Xóa sản phẩm
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;