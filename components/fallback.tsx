import { Skeleton } from '@/components/ui/skeleton';
import DataTable from '@/components/DataTable';

export const CoinOverViewFallback = () => {
  return (
    <div id="coin-overview-fallback">
      <div className="header">
        <Skeleton className="header-image" />
        <div className="info">
          <Skeleton className="header-line-sm" />
          <Skeleton className="header-line-lg" />
        </div>
      </div>
      <div className="space-y-4 mt-6">
        <Skeleton className="h-4 w-48" />
        <div className="flex gap-2">
          <Skeleton className="period-button-skeleton" />
          <Skeleton className="period-button-skeleton" />
          <Skeleton className="period-button-skeleton" />
          <Skeleton className="period-button-skeleton" />
        </div>
      </div>
      <div className="chart">
        <Skeleton className="chart-skeleton" />
      </div>
    </div>
  );
};

export const TrendingCoinsFallback = () => {
  const skeletonColumns = [
    {
      header: 'Name',
      cellClassName: 'name-cell',
      cell: () => (
        <div className="name-link">
          <Skeleton className="name-image" />
          <Skeleton className="name-line" />
        </div>
      ),
    },
    {
      header: '24h Change',
      cellClassName: 'change-cell',
      cell: () => <Skeleton className="change-line" />,
    },
    {
      header: 'Price',
      cellClassName: 'price-cell',
      cell: () => <Skeleton className="price-line" />,
    },
  ];

  const skeletonData = Array.from({ length: 5 }, (_, i) => ({ id: `skeleton-${i}` }));

  return (
    <div id="trending-coins-fallback">
      <h4>Trending Coins</h4>
      <div className="trending-coins-table">
        <DataTable
          columns={skeletonColumns}
          data={skeletonData}
          rowKey={(_, index) => `skeleton-row-${index}`}
        />
      </div>
    </div>
  );
};

export const CategoriesFallback = () => {
  const skeletonColumns = [
    {
      header: 'Category',
      cellClassName: 'category-cell',
      cell: () => <Skeleton className="h-4 w-32" />,
    },
    {
      header: 'Top Gainers',
      cellClassName: 'top-gainers-cell',
      cell: () => (
        <div className="flex gap-2">
          <Skeleton className="h-6 w-6 rounded-full" />
          <Skeleton className="h-6 w-6 rounded-full" />
          <Skeleton className="h-6 w-6 rounded-full" />
        </div>
      ),
    },
    {
      header: 'Market Cap',
      cellClassName: 'category-cell',
      cell: () => <Skeleton className="h-4 w-32" />,
    },
    {
      header: 'Market Cap Change (24h)',
      cellClassName: 'category-cell',
      cell: () => <Skeleton className="h-4 w-32" />,
    },
  ];

  const skeletonData = Array.from({ length: 10 }, (_, i) => ({ id: `skeleton-${i}` }));

  return (
    <div id="categories-fallback" className="custom-scrollbar">
      <h4>Top Categories</h4>
      <div className="mt-3">
        <DataTable
          columns={skeletonColumns}
          data={skeletonData}
          rowKey={(_, index) => `skeleton-row-${index}`}
          tableClassName="mt-3"
        />
      </div>
    </div>
  );
};
