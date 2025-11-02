"use client";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
interface PaginationProps {
  pageCount: number;
}
function ProductPagination({ pageCount }: Readonly<PaginationProps>) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;
  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  const range = (start: number, end: number) => {
    const length = end - start + 1;
    return Array.from({ length }, (_, i) => start + i);
  };

  const boundaryCount = 1;
  const siblingCount = 1;
  const startPages = range(1, Math.min(boundaryCount, pageCount));
  const endPages = range(
    Math.max(pageCount - boundaryCount + 1, boundaryCount + 1),
    pageCount
  );

  const siblingsStart = Math.max(
    Math.min(
      currentPage - siblingCount,
      pageCount - boundaryCount - siblingCount * 2 - 1
    ),
    boundaryCount + 1
  );

  const siblingsEnd = Math.min(
    Math.max(currentPage + siblingCount, boundaryCount + siblingCount * 2 + 2),
    endPages.length > 0 ? endPages[0] - 1 : pageCount - 1
  );
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href={createPageURL(currentPage - 1)}
            className={
              currentPage === 1 ? "pointer-events-none opacity-50" : undefined
            }
            scroll={false}
          />
        </PaginationItem>
        {/* {Array.from({ length: pageCount }, (_, i) => i + 1).map((page) => (
          <PaginationItem key={page}>
            <PaginationLink
              isActive={currentPage === page}
              href={createPageURL(page)}
              scroll={false}
            >
              {page}
            </PaginationLink>
          </PaginationItem>
        ))} */}
        {startPages.map((page) => (
          <PaginationItem key={page}>
            <PaginationLink
              isActive={currentPage === page}
              href={createPageURL(page)}
              scroll={false}
            >
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}
        {siblingsStart > boundaryCount + 1 && (
          <PaginationItem>
            <Tooltip>
              <TooltipTrigger asChild>
                <PaginationEllipsis />
              </TooltipTrigger>
              <TooltipContent>
                <p>other pages</p>
              </TooltipContent>
            </Tooltip>
          </PaginationItem>
        )}
        {range(siblingsStart, siblingsEnd).map((page) => (
          <PaginationItem key={page}>
            <PaginationLink
              isActive={currentPage === page}
              href={createPageURL(page)}
              scroll={false}
            >
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}
        {siblingsEnd < pageCount - boundaryCount && (
          <PaginationItem>
            <Tooltip>
              <TooltipTrigger asChild>
                <PaginationEllipsis />
              </TooltipTrigger>
              <TooltipContent>
                <p>other pages</p>
              </TooltipContent>
            </Tooltip>
          </PaginationItem>
        )}
        {endPages.map((page) => (
          <PaginationItem key={page}>
            <PaginationLink
              isActive={currentPage === page}
              href={createPageURL(page)}
              scroll={false}
            >
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationNext
            href={createPageURL(currentPage + 1)}
            className={
              currentPage === pageCount
                ? "pointer-events-none opacity-50"
                : undefined
            }
            scroll={false}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

function SelectRowsPerPage({pageSize}:{pageSize?:number}) {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  const handlePageSize = (term: string) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("perpage", term);
    }
    replace(`${pathname}?${params.toString()}`);
  };
  return (
    <Select
      onValueChange={(value) => handlePageSize(value)}
      defaultValue={pageSize?.toString()}
    >
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Show Products" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="3">3 Show</SelectItem>
          <SelectItem value="10">10 Show</SelectItem>
          <SelectItem value="20">20 Show</SelectItem>
          <SelectItem value="30">30 Show</SelectItem>
          <SelectItem value="40">40 Show</SelectItem>
          <SelectItem value="50">50 Show</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
function SortByPrice() {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  const handleSort = (term: string) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("price", term);
    }
    replace(`${pathname}?${params.toString()}`);
  };
  return (
    <Select
      onValueChange={(value) => handleSort(value)}
      defaultValue={'best-match'}
    >
      <SelectTrigger  className="w-full relative before:absolute before:-left-16 before:content-['Sort_By:']">
        <SelectValue placeholder="Sort Products" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="best-match">Best Match</SelectItem>
          <SelectItem value="asc">Price low to high</SelectItem>
          <SelectItem value="dsc">Price high to low</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
export { ProductPagination, SelectRowsPerPage, SortByPrice };
