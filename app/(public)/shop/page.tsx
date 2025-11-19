import { getProducts } from "@/actions/products";
import { ProductCard } from "@/components/Cards";
import {
  ResetFilter,
  FilterByBrand,
  FilterByCategory,
  FilterByColor,
  FilterByPrice,
  ProductPagination,
  SelectRowsPerPage,
  SortByPrice,
} from "@/components/ProductPagination";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Filter } from "lucide-react";
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
    <div className="py-5 md:py-12">
      <div className="mx-auto max-w-screen-2xl flex flex-col gap-5 sm:flex-row px-4 xl:px-8">
        <aside className="hidden sm:block w-64 space-y-5">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">Filters</h3>
            <ResetFilter />
          </div>
          <FilterByCategory />
          <FilterByBrand />
          <FilterByPrice range={[min, max]} />
          <FilterByColor />
        </aside>
        <main className="flex-1">
          <div className="mb-5 sm:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant={"outline"}>
                  <Filter />
                  Filters
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="gap-0">
                <SheetHeader>
                  <div className="flex items-center justify-between">
                    <SheetTitle>Filters</SheetTitle>
                    <ResetFilter />
                  </div>
                  <VisuallyHidden asChild>
                    <SheetDescription>
                      This action cannot be undone. This will permanently delete
                      your account and remove your data from our servers.
                    </SheetDescription>
                  </VisuallyHidden>
                </SheetHeader>
                <Separator />
                <ScrollArea className="h-[calc(100%-68px)]">
                  <div className="p-4 space-y-4">
                    <FilterByCategory />
                    <FilterByBrand />
                    <FilterByPrice range={[min, max]} />
                    <FilterByColor />
                  </div>
                </ScrollArea>
              </SheetContent>
            </Sheet>
          </div>
          <div className="flex justify-between gap-3 mb-5">
            <SelectRowsPerPage pageSize={pageSize} />
            <SortByPrice />
          </div>
          <div className="grid min-[500]:grid-cols-2 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {paginate.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
          {pageCount > 1 && <div className="mt-12">
            <ProductPagination pageCount={pageCount} />
          </div>}
        </main>
      </div>
    </div>
  );
}
