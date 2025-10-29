import Link from "next/link";
import { getProductsCustom } from "@/actions/products";
import { Product } from "@/types";
import ReactMarkdown from "react-markdown";
import { PaginationComponent } from "@/components/custom/pagination";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search } from "@/components/custom/search";

function LinkCard({ product }: { product: Product }) {
  return (
    <Link href={`#`}>
      <Card className="relative">
        <CardHeader>
          <CardTitle className="leading-8 text-pink-500">
            {product.title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ReactMarkdown>
            {product.description}
          </ReactMarkdown>
        </CardContent>
      </Card>
    </Link>
  );
}

export default async function SummariesRoute(props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;
  const pageSize = 6;
  const startIndex = (currentPage - 1) * pageSize;
  const { products } = await getProductsCustom();
  const filter = products.filter(item=> item.title.toLowerCase().includes(query.toLowerCase()))
    const pageCount = Math.ceil(filter.length/pageSize);
  const paginate = filter.slice(startIndex, startIndex + pageSize)
  if (!products) return null;
  return (
    <div className="grid grid-cols-1 gap-4 p-4">
      <Search />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {paginate.map((item: Product) => (
          <LinkCard key={item.id} product={item} />
        ))}
        <PaginationComponent pageCount={pageCount}/>
      </div>
    </div>
  );
}
