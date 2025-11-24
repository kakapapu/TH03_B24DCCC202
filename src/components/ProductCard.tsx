import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Product } from '../types/product';
import { useProducts } from '../context/ProductContext';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const navigate = useNavigate();
  const { deleteProduct } = useProducts();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  const handleDelete = () => {
    if (window.confirm(`Bạn có chắc muốn xóa sản phẩm "${product.ten}"?`)) {
      deleteProduct(product.id);
    }
  };

  return (
    <div className="product-card">
      <div className="product-category">{product.danhMuc}</div>
      <h3>{product.ten}</h3>
      <p className="product-price">{formatPrice(product.gia)}</p>
      <p className="product-quantity">Số lượng: {product.soLuong}</p>
      <p className="product-description">{product.moTa.substring(0, 60)}...</p>
      
      <div className="product-actions">
        <button 
          onClick={() => navigate(`/products/${product.id}`)}
          className="btn btn-detail"
        >
          Chi tiết
        </button>
        <button 
          onClick={() => navigate(`/edit/${product.id}`)}
          className="btn btn-edit"
        >
          Sửa
        </button>
        <button 
          onClick={handleDelete}
          className="btn btn-delete"
        >
          Xóa
        </button>
      </div>
    </div>
  );
};

export default ProductCard;