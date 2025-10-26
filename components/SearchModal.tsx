"use client";
import { useCartStore } from "@/lib/store";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
} from "@/components/ui/sheet";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { SearchForm } from "./SearchForm";
export function SearchModal() {
  const isOpenSearch = useCartStore(state => state.isOpenSearch);
  const toggleSearch = useCartStore(state => state.toggleSearch);
  return (
    <Sheet open={isOpenSearch} onOpenChange={toggleSearch}>
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
