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
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import { useState } from "react";
import { Button } from "./ui/button";
interface PaginationProps {
  pageCount: number;
}

const categories = [
  { id: "phones", label: "Phones", icon: "📱" },
  { id: "headsets", label: "Headsets", icon: "🎧" },
  { id: "laptops", label: "Laptops", icon: "💻" },
  { id: "tv", label: "TV sets", icon: "📺" },
  { id: "sound", label: "Sound", icon: "🔊" },
  { id: "watches", label: "Watches", icon: "⌚" },
  { id: "others", label: "Others", icon: "💡" },
  { id: "internet", label: "Internet", icon: "🌐" },
];

const brands = [
  { id: "apple", label: "Apple" },
  { id: "samsung", label: "Samsung" },
  { id: "huawei", label: "Huawei" },
  { id: "microsoft", label: "Microsoft" },
  { id: "sony", label: "Sony" },
  { id: "bose", label: "Bose" },
  { id: "dell", label: "Dell" },
  { id: "lg", label: "LG" },
  { id: "jbl", label: "JBL" },
  { id: "philips", label: "Philips" },
  { id: "tp-link", label: "TP-Link" },
];

const colors = [
  { id: "red", label: "Red", color: "bg-red-500" },
  { id: "orange", label: "Orange", color: "bg-orange-500" },
  { id: "blue", label: "Blue", color: "bg-blue-500" },
  { id: "black", label: "Black", color: "bg-black" },
  { id: "white", label: "White", color: "bg-white border" },
  { id: "purple", label: "Purple", color: "bg-purple-500" },
  { id: "gray", label: "Gray", color: "bg-gray-600" },
];

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

function SelectRowsPerPage({ pageSize }: { pageSize?: number }) {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  const handlePageSize = (term: string) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("pagesize", term);
      params.delete("page")
    }
    replace(`${pathname}?${params.toString()}`);
  };
  return (
    <Select
      onValueChange={(value) => handlePageSize(value)}
      defaultValue={pageSize?.toString()}
    >
      <SelectTrigger className="w-[140px]">
        <SelectValue placeholder="Show" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="8">8 Show</SelectItem>
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
      params.set("orderby", term);
      params.delete("page")
    }
    replace(`${pathname}?${params.toString()}`);
  };
  return (
      <Select
        onValueChange={(value) => handleSort(value)}
        defaultValue={searchParams.get("orderby")?.toString() || "relevance"}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="relevance">Relevance</SelectItem>
            <SelectItem value="popularity">Popularity</SelectItem>
            <SelectItem value="asc">Price low to high</SelectItem>
            <SelectItem value="dsc">Price high to low</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
  );
}
function ResetFilter() {
  const pathname = usePathname();
const { replace } = useRouter();
    const resetFilter = () => {
      const newSearchParams = new URLSearchParams();
      replace(`${pathname}?${newSearchParams.toString()}`);
    };
  return (
      <Button variant={"outline"} onClick={resetFilter}>Reset</Button>
  );
}
function FilterByCategory() {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

    const handleCategory = (term: string) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("cat", term);
      params.delete("page")
    }
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div>
      <h3 className="mb-3 font-semibold">Categories</h3>
      <RadioGroup onValueChange={(value)=> handleCategory(value)}>
        <div className="space-y-2 text-sm">
          {categories.map((category) => (
            <div key={category.id} className="flex items-center space-x-2">
              <RadioGroupItem
                value={category.id}
                id={`category-${category.id}`}
              />
              <Label
                htmlFor={`category-${category.id}`}
                className="cursor-pointer text-sm font-normal"
              >
                {category.label}
              </Label>
            </div>
          ))}
        </div>
      </RadioGroup>
    </div>
  );
}
function FilterByBrand() {
  return (
    <div>
      <h3 className="mb-3 font-semibold">Brands</h3>
      <div className="space-y-3">
        {brands.map((brand) => (
          <div key={brand.id} className="flex items-center space-x-2">
            <Checkbox id={`brand-${brand.id}`} />
            <Label
              htmlFor={`brand-${brand.id}`}
              className="cursor-pointer text-sm font-normal"
            >
              {brand.label}
            </Label>
          </div>
        ))}
      </div>
    </div>
  );
}

function FilterByPrice({ range }: { range: [number, number] }) {
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const { replace } = useRouter();
  const pathname = usePathname();
  const initialValue = Array.isArray(range) ? range : [range[0], range[1]];
  const [priceRange, setPriceRange] = useState(initialValue);
  const handlePriceRange = (range: number[]) => {
    const min = String(range[0]);
    const max = String(range[1]);
    if (range) {
      params.set("min", min);
      params.set("max", max);
      params.delete("page")
    }
    replace(`${pathname}?${params.toString()}`,{scroll:false});
  };
  return (
    <div>
      <h3 className="mb-3 font-semibold">Price Range</h3>
      <div className="space-y-4">
        <Slider
          value={priceRange}
          onValueChange={(value) => setPriceRange([value[0], value[1]])}
          onValueCommit={(value) => handlePriceRange([value[0], value[1]])}
          max={3000}
          step={10}
          className="w-full"
        />
        <div className="flex items-center space-x-2">
          <div className="flex-1">
            <Label
              htmlFor="price-from"
              className="text-muted-foreground text-xs"
            >
              From
            </Label>
            <Input
              id="price-from"
              value={priceRange[0]}
              onChange={(e) => {
                setPriceRange([
                  Number.parseInt(e.target.value) || 0,
                  priceRange[1],
                ]);
                params.set("min", e.target.value);
                replace(`${pathname}?${params.toString()}`,{scroll:false});
              }}
              className="h-8"
            />
          </div>
          <div className="flex-1">
            <Label htmlFor="price-to" className="text-muted-foreground text-xs">
              To
            </Label>
            <Input
              id="price-to"
              value={priceRange[1]}
              onChange={(e) => {
                setPriceRange([
                  priceRange[0],
                  Number.parseInt(e.target.value) || 3000,
                ]);
                params.set("max", e.target.value);
                replace(`${pathname}?${params.toString()}`,{scroll:false});
              }}
              className="h-8"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
function FilterByColor() {
  return (
    <div>
      <h3 className="mb-3 font-semibold">Colors</h3>
      <div className="grid grid-cols-1 gap-2">
        {colors.map((color) => (
          <div key={color.id} className="flex items-center space-x-2">
            <Checkbox id={`color-${color.id}`} />
            <div className={`h-4 w-4 rounded ${color.color}`} />
            <Label
              htmlFor={`color-${color.id}`}
              className="cursor-pointer text-sm font-normal"
            >
              {color.label}
            </Label>
          </div>
        ))}
      </div>
    </div>
  );
}
export {
  ProductPagination,
  SelectRowsPerPage,
  SortByPrice,
  ResetFilter,
  FilterByCategory,
  FilterByBrand,
  FilterByPrice,
  FilterByColor,
};
