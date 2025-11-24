import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalProducts: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  totalProducts,
  onPageChange
}) => {
  const renderPageNumbers = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => onPageChange(i)}
          className={`page-btn ${currentPage === i ? 'active' : ''}`}
        >
          {i}
        </button>
      );
    }
    return pages;
  };

  return (
    <div className="pagination">
      <div className="pagination-info">
        Trang {currentPage} / {totalPages} - Tổng {totalProducts} sản phẩm
      </div>
      <div className="pagination-controls">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="btn-nav"
        >
          Previous
        </button>
        
        {renderPageNumbers()}
        
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="btn-nav"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;