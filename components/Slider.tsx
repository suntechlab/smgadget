    // Example in a client component
    "use client";

    import { useRouter, usePathname, useSearchParams } from "next/navigation";
    import { Slider } from "@/components/ui/slider"; // Assuming shadcn/ui Slider

    export function PriceRangeSlider() {
      const router = useRouter();
      const pathname = usePathname();
      const searchParams = useSearchParams();

      const currentMinPrice = searchParams.get("minPrice") || "0";
      const currentMaxPrice = searchParams.get("maxPrice") || "100"; // Default values

      const handleValueChange = (values: number[]) => {
        const [newMin, newMax] = values;
        const newSearchParams = new URLSearchParams(searchParams.toString());
        newSearchParams.set("minPrice", newMin.toString());
        newSearchParams.set("maxPrice", newMax.toString());
        router.push(`${pathname}?${newSearchParams.toString()}`);
      };

      return (
        <Slider
          defaultValue={[parseInt(currentMinPrice), parseInt(currentMaxPrice)]}
          max={100}
          step={1}
          onValueChange={handleValueChange}
        />
      );
    }