import { getProducts } from "@/actions/products";
import { ProductCard } from "@/components/Cards";
import {
  Filter,
  FilterByBrand,
  FilterByCategory,
  FilterByColor,
  FilterByPrice,
  ProductPagination,
  SelectRowsPerPage,
  SortByPrice,
} from "@/components/ProductPagination";
export default async function Shop(props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
    pagesize?: string;
    orderby?: string;
    min?: string;
    max?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;
  const pageSize = Number(searchParams?.pagesize) || 8;
  const price = searchParams?.orderby;
  const min = Number(searchParams?.min) || 0;
  const max = Number(searchParams?.max) || 3000;
  const startIndex = (currentPage - 1) * pageSize;
  const { products } = await getProducts();
  const filter = products
    .filter(
      (item) =>
        item.title.toLowerCase().includes(query.toLowerCase()) &&
        item.price >= min &&
        item.price <= max
    )
    .sort((a, b) =>
      (a.price < b.price && price == "asc") ||
      (a.price > b.price && price == "dsc")
        ? -1
        : 1
    );
  const pageCount = Math.ceil(filter.length / pageSize);
  const paginate = filter.slice(startIndex, startIndex + pageSize);

  if (!products) return null;
  return (
    <div className="py-12">
      <div className="mx-auto max-w-screen-2xl flex flex-col gap-5 md:flex-row px-4 xl:px-8">
        <aside className="w-64 space-y-5">
          <Filter/>
          <FilterByCategory />
          <FilterByBrand />
                    <FilterByPrice range={[min, max]} />
          <FilterByColor />
        </aside>
        <main className="flex-1">
          <div className="flex justify-between mb-5">
            <SelectRowsPerPage pageSize={pageSize} />
            <SortByPrice />
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {paginate.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
          <div className="mt-12">
            <ProductPagination pageCount={pageCount} />
          </div>
        </main>
      </div>
    </div>
  );
}
