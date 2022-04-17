import React from 'react';
import './Pagination.scss';

export function Pagination({ selectPage, selectedPage }: { selectPage: (page: number) => void, selectedPage: number }) {
  const pages = Array.from(Array(10).keys());

  return (
    <div className="pagination">
      {pages.map(function (page, i) {
        return <div
                  className={`pagination__page ${selectedPage === page + 1 ? 'pagination__page-selected' : ''}`}
                  key={i}
                  onClick={() => selectPage(page + 1)}
                >
                  { String(page + 1) }
                </div>;
      })}
    </div>
  )
}
