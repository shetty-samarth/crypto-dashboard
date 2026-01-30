'use client';
import React from 'react';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { useRouter } from 'next/navigation';
import { buildPageNumbers, cn } from '@/lib/utils';

const CoinsPagination = ({ totalPages, currentPage, hasMorePages }: Pagination) => {
  const router = useRouter();
  const handlePageChange = (page: number) => {
    router.push(`/coins?page=${page}`);
  };
  const pageNumbers = buildPageNumbers(currentPage, totalPages);
  const isLastPage = !hasMorePages || currentPage === totalPages;
  console.log(isLastPage);
  return (
    <Pagination className="coins-pagination" aria-label="Coins Pagination">
      <PaginationContent className="pagination-content">
        <PaginationItem className="pagination-control prev">
          <PaginationPrevious
            onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
            className={currentPage <= 1 ? 'control-disabled' : 'control-button'}
          />
        </PaginationItem>

        <div className="pagination-pages">
          {pageNumbers.map((page, index) => {
            return (
              <PaginationItem key={page}>
                {page === 'ellipsis' ? (
                  <span className="ellipsis">...</span>
                ) : (
                  <PaginationLink
                    href="#"
                    className={cn('page-link', {
                      'page-link-active': page === currentPage,
                    })}
                    isActive={page === currentPage}
                    onClick={() => handlePageChange(page as number)}
                  />
                )}
              </PaginationItem>
            );
          })}
        </div>

        <PaginationItem>
          <PaginationLink href="#">1</PaginationLink>
        </PaginationItem>

        <PaginationItem>
          <PaginationLink href="#">2</PaginationLink>
        </PaginationItem>

        <PaginationItem>
          <PaginationLink href="#" isActive>
            3
          </PaginationLink>
        </PaginationItem>

        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>

        <PaginationItem className="pagination-control next">
          <PaginationNext
            onClick={() => !isLastPage && handlePageChange(currentPage + 1)}
            className={isLastPage ? 'control-disabled' : 'control-button'}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default CoinsPagination;
