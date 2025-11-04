import { useSearchParams, usePathname, useRouter } from "next/navigation";
import Form from "next/form";
import { useDebouncedCallback } from "use-debounce";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import { SearchIcon } from "lucide-react";

export function Search() {
  const searchParams = useSearchParams();

  return (
    <Form action="/products" autoComplete="off">
      <InputGroup className="h-9 sm:h-11">
        <InputGroupInput
          name="query"
          defaultValue={searchParams.get("query")?.toString()}
          placeholder="Type here to search..."
          className="w-full sm:w-md"
          required
        />
        <InputGroupAddon>
          <SearchIcon />
        </InputGroupAddon>
        <InputGroupAddon align="inline-end">
          <InputGroupButton type="submit">Search</InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
    </Form>
  );
}
export function SearchWithoutForm() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");

    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }

    replace(`${pathname}?${params.toString()}`);
  }, 300);
  return (
    <InputGroup className="h-9 md:h-11 max-w-md">
      <InputGroupInput
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
        defaultValue={searchParams.get("query")?.toString()}
        placeholder="Type here to search..."
      />
      <InputGroupAddon>
        <SearchIcon />
      </InputGroupAddon>
      <InputGroupAddon align="inline-end">
        <InputGroupButton>Search</InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  );
}
