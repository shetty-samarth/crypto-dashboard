import { fetcher } from '@/lib/coingeko.actions';
import DataTable from '../DataTable';
import Image from 'next/image';

const Categories = async () => {
  const categories = await fetcher<Category[]>('/coins/categories');
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
};

export default Categories;
