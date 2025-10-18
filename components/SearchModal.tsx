"use client";
import { UseContext } from "@/context";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
} from "@/components/ui/sheet";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { SearchForm } from "./SearchForm";
export function SearchModal() {
  const { openSearch, handleSetSearch } = UseContext();
  return (
    <Sheet open={openSearch} onOpenChange={handleSetSearch}>
      <SheetContent side="top" className="items-center p-5">
          <VisuallyHidden asChild>
            <SheetTitle>Start typing and press enter to search</SheetTitle>
          </VisuallyHidden>
          <VisuallyHidden asChild>
            <SheetDescription>Description here.</SheetDescription>
          </VisuallyHidden>
          <SearchForm />
      </SheetContent>
    </Sheet>
  );
}
