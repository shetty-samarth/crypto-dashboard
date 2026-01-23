import { fetcher } from '@/lib/coingeko.actions';
import DataTable from '../DataTable';
import Image from 'next/image';
import { formatCurrency } from '@/lib/utils';
import { CategoriesFallback } from '../fallback';

const Categories = async () => {
  try {
    const categories = await fetcher<Category[]>('/coins/categories');
    console.log('Fetched categories:', categories);
    const columns: DataTableColumn<Category>[] = [
      {
        header: 'Category',
        cell: (category) => <p>{category.name}</p>,
        cellClassName: 'category-cell',
      },
      {
        header: 'Top Gainers',
        cell: (category) =>
          category.top_3_coins.map((coin) => (
            <Image key={coin} src={coin} alt={coin} width={24} height={24} />
          )),
        cellClassName: 'top-gainers-cell',
      },
      {
        header: 'Market Cap',
        cellClassName: 'market-cap-cell',
        cell: (category) => formatCurrency(category.market_cap),
      },
      {
        header: 'Market Cap Change (24h)',
        cellClassName: 'market-cap-cell',
        cell: (category) => formatCurrency(category.market_cap_change_24h),
      },
    ];
    return (
      <div id="categories" className="custom-scrollbar">
        <h4>Top Categories</h4>
        <DataTable
          columns={columns}
          data={categories?.slice(0, 10)}
          rowKey={(_, index) => index}
          tableClassName="mt-3"
        />
      </div>
    );
  } catch (error) {
    console.error('Failed to load categories:', error);
    return <CategoriesFallback />;
  }
};

export default Categories;
