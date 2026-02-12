"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  basePath: string;
  searchParams?: Record<string, string>;
}

export function Pagination({ currentPage, totalPages, basePath, searchParams = {} }: PaginationProps) {
  const searchParamsObj = useSearchParams();

  const createUrl = (page: number) => {
    const params = new URLSearchParams(searchParamsObj.toString());
    params.set('page', page.toString());

    // Merge additional search params
    Object.entries(searchParams).forEach(([key, value]) => {
      params.set(key, value);
    });

    return `${basePath}?${params.toString()}`;
  };

  if (totalPages <= 1) {
    return null;
  }

  const pages: number[] = [];
  const maxVisible = 7;
  let startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2));
  const endPage = Math.min(totalPages, startPage + maxVisible - 1);

  if (endPage - startPage < maxVisible - 1) {
    startPage = Math.max(1, endPage - maxVisible + 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  return (
    <nav className="flex items-center justify-center gap-2" aria-label="Pagination">
      {/* Previous Button */}
      {currentPage > 1 ? (
        <Link
          href={createUrl(currentPage - 1)}
          className="flex items-center gap-1 px-3 py-2 border border-[var(--border)] hover:bg-[var(--background-alt)] transition-colors text-sm text-[var(--color-text-main)]"
        >
          <HiChevronLeft className="w-4 h-4" />
          <span className="hidden sm:inline">Previous</span>
        </Link>
      ) : (
        <div className="flex items-center gap-1 px-3 py-2 border border-[var(--border)] opacity-50 cursor-not-allowed text-sm text-[var(--color-text-muted)]">
          <HiChevronLeft className="w-4 h-4" />
          <span className="hidden sm:inline">Previous</span>
        </div>
      )}

      {/* First Page */}
      {startPage > 1 && (
        <>
          <Link
            href={createUrl(1)}
            className="px-3 py-2 border border-[var(--border)] hover:bg-[var(--background-alt)] transition-colors text-sm text-[var(--color-text-main)]"
          >
            1
          </Link>
          {startPage > 2 && (
            <span className="px-2 text-sm text-[var(--color-text-subtle)]">...</span>
          )}
        </>
      )}

      {/* Page Numbers */}
      {pages.map((page) => (
        <Link
          key={page}
          href={createUrl(page)}
          className={`px-3 py-2 border transition-colors text-sm ${
            page === currentPage
              ? "bg-[var(--color-primary)] text-[var(--primary-foreground)] border-[var(--color-primary)]"
              : "border-[var(--border)] hover:bg-[var(--background-alt)] text-[var(--color-text-main)]"
          }`}
        >
          {page}
        </Link>
      ))}

      {/* Last Page */}
      {endPage < totalPages && (
        <>
          {endPage < totalPages - 1 && (
            <span className="px-2 text-sm text-[var(--color-text-subtle)]">...</span>
          )}
          <Link
            href={createUrl(totalPages)}
            className="px-3 py-2 border border-[var(--border)] hover:bg-[var(--background-alt)] transition-colors text-sm text-[var(--color-text-main)]"
          >
            {totalPages}
          </Link>
        </>
      )}

      {/* Next Button */}
      {currentPage < totalPages ? (
        <Link
          href={createUrl(currentPage + 1)}
          className="flex items-center gap-1 px-3 py-2 border border-[var(--border)] hover:bg-[var(--background-alt)] transition-colors text-sm text-[var(--color-text-main)]"
        >
          <span className="hidden sm:inline">Next</span>
          <HiChevronRight className="w-4 h-4" />
        </Link>
      ) : (
        <div className="flex items-center gap-1 px-3 py-2 border border-[var(--border)] opacity-50 cursor-not-allowed text-sm text-[var(--color-text-muted)]">
          <span className="hidden sm:inline">Next</span>
          <HiChevronRight className="w-4 h-4" />
        </div>
      )}
    </nav>
  );
}
