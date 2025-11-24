import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Product, DanhMuc, FormErrors } from '../types/product';

interface ProductFormProps {
  initialProduct?: Product;
  onSubmit: (product: any) => void;  
  submitLabel: string;
}

const categories: DanhMuc[] = ['Điện tử', 'Quần áo', 'Đồ ăn', 'Sách', 'Khác'];

const ProductForm: React.FC<ProductFormProps> = ({
  initialProduct,
  onSubmit,
  submitLabel
}) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    ten: initialProduct?.ten || '',
    danhMuc: initialProduct?.danhMuc || '' as DanhMuc,
    gia: initialProduct?.gia || 0,
    soLuong: initialProduct?.soLuong || 0,
    moTa: initialProduct?.moTa || ''
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.ten.trim()) {
      newErrors.ten = 'Tên sản phẩm là bắt buộc';
    } else if (formData.ten.trim().length < 3) {
      newErrors.ten = 'Tên sản phẩm phải có ít nhất 3 ký tự';
    }

    if (!formData.danhMuc) {
      newErrors.danhMuc = 'Vui lòng chọn danh mục';
    }

    if (formData.gia <= 0) {
      newErrors.gia = 'Giá phải là số dương';
    }

    if (formData.soLuong <= 0 || !Number.isInteger(formData.soLuong)) {
      newErrors.soLuong = 'Số lượng phải là số nguyên dương';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validate()) {
      if (initialProduct) {
        onSubmit({ ...formData, id: initialProduct.id });
      } else {
        onSubmit(formData);
      }
      navigate('/');
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'gia' || name === 'soLuong' ? Number(value) : value
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="product-form">
      <div className="form-group">
        <label>Tên sản phẩm *</label>
        <input
          type="text"
          name="ten"
          value={formData.ten}
          onChange={handleChange}
          className={errors.ten ? 'error' : ''}
        />
        {errors.ten && <span className="error-message">{errors.ten}</span>}
      </div>

      <div className="form-group">
        <label>Danh mục *</label>
        <select
          name="danhMuc"
          value={formData.danhMuc}
          onChange={handleChange}
          className={errors.danhMuc ? 'error' : ''}
        >
          <option value="">-- Chọn danh mục --</option>
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
        {errors.danhMuc && <span className="error-message">{errors.danhMuc}</span>}
      </div>

      <div className="form-group">
        <label>Giá *</label>
        <input
          type="number"
          name="gia"
          value={formData.gia}
          onChange={handleChange}
          className={errors.gia ? 'error' : ''}
        />
        {errors.gia && <span className="error-message">{errors.gia}</span>}
      </div>

      <div className="form-group">
        <label>Số lượng *</label>
        <input
          type="number"
          name="soLuong"
          value={formData.soLuong}
          onChange={handleChange}
          className={errors.soLuong ? 'error' : ''}
        />
        {errors.soLuong && <span className="error-message">{errors.soLuong}</span>}
      </div>

      <div className="form-group">
        <label>Mô tả</label>
        <textarea
          name="moTa"
          value={formData.moTa}
          onChange={handleChange}
          rows={4}
        />
      </div>

      <div className="form-actions">
        <button type="submit" className="btn btn-primary">
          {submitLabel}
        </button>
        <button type="button" onClick={() => navigate('/')} className="btn btn-secondary">
          Hủy
        </button>
      </div>
    </form>
  );
};

export default ProductForm;