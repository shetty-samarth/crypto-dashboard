import { fetcher } from "@/lib/coingeko.actions"
import DataTable from "../DataTable";

const Categories = async() => {
    const categories = await fetcher<Category[]>('/coins/categories');
    const columns: DataTableColumn<Category>[] = [
        {
            header: 'Category',
            cell: (category) => <p>{category.name}</p>,
            cellClassName: 'category-cell',
        },
    ];
  return (  
    <div id="categories" className="custom-scrollbar">
        <h4>Top Categories</h4>
        <DataTable columns={columns} data={categories?.slice(0,10)} rowKey={(_, index) => index}
        tableClassName="mt-3" />
    </div>
  )
}

export default Categories