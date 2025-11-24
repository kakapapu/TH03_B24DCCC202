import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';
import SearchBar from '../components/SearchBar';
import Filter from '../components/Filter';
import ProductList from '../components/ProductList';
import Pagination from '../components/Pagination';

const ITEMS_PER_PAGE = 6;

const Home: React.FC = () => {
  const navigate = useNavigate();
  const { state } = useProducts();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('Tất cả');
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const filteredProducts = useMemo(() => {
    return state.products.filter(product => {
      const matchesSearch = product.ten.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = category === 'Tất cả' || product.danhMuc === category;
      const matchesMinPrice = minPrice === 0 || product.gia >= minPrice;
      const matchesMaxPrice = maxPrice === 0 || product.gia <= maxPrice;

      return matchesSearch && matchesCategory && matchesMinPrice && matchesMaxPrice;
    });
  }, [state.products, searchTerm, category, minPrice, maxPrice]);

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);

  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return filteredProducts.slice(startIndex, endIndex);
  }, [filteredProducts, currentPage]);

  const handleReset = () => {
    setSearchTerm('');
    setCategory('Tất cả');
    setMinPrice(0);
    setMaxPrice(0);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="home-page">
      <div className="page-header">
        <button onClick={() => navigate('/add')} className="btn btn-add">
          + Thêm sản phẩm
        </button>
      </div>

      <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />

      <Filter
        category={category}
        minPrice={minPrice}
        maxPrice={maxPrice}
        onCategoryChange={setCategory}
        onMinPriceChange={setMinPrice}
        onMaxPriceChange={setMaxPrice}
        onReset={handleReset}
      />

      <ProductList products={paginatedProducts} />

      {filteredProducts.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalProducts={filteredProducts.length}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default Home;