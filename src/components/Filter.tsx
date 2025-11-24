import React from 'react';
import { DanhMuc } from '../types/product';

interface FilterProps {
  category: string;
  minPrice: number;
  maxPrice: number;
  onCategoryChange: (value: string) => void;
  onMinPriceChange: (value: number) => void;
  onMaxPriceChange: (value: number) => void;
  onReset: () => void;
}

const categories: (DanhMuc | 'Tất cả')[] = ['Tất cả', 'Điện tử', 'Quần áo', 'Đồ ăn', 'Sách', 'Khác'];

const Filter: React.FC<FilterProps> = ({
  category,
  minPrice,
  maxPrice,
  onCategoryChange,
  onMinPriceChange,
  onMaxPriceChange,
  onReset
}) => {
  return (
    <div className="filter-container">
      <div className="filter-group">
        <label>Danh mục:</label>
        <select value={category} onChange={(e) => onCategoryChange(e.target.value)}>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      <div className="filter-group">
        <label>Giá từ:</label>
        <input
          type="number"
          value={minPrice || ''}
          onChange={(e) => onMinPriceChange(Number(e.target.value))}
          placeholder=""
          min=""
        />
      </div>

      <div className="filter-group">
        <label>Đến:</label>
        <input
          type="number"
          value={maxPrice || ''}
          onChange={(e) => onMaxPriceChange(Number(e.target.value))}
          placeholder=""
          min=""
        />
      </div>
    </div>
  );
};

export default Filter;