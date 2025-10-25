"use client";

import * as React from "react";
import { Menu, XIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { FaShoppingCart } from "react-icons/fa";
import { ModeSwitch } from "./ModeSwitch";
export function MobileMenu() {
  const [isOpen, setIsOpen] = React.useState(false);
  const pathname = usePathname();

  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1023) {
        setIsOpen(false);
      }
    };
    setIsOpen(false);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [pathname]);
  return (
    <Drawer direction="top" open={isOpen} onOpenChange={setIsOpen} autoFocus={true}>
      <DrawerTrigger asChild className="cursor-pointer">
        <Button variant={"ghost"} size={"icon"}>
          <Menu className="size-5" />
          <span className="sr-only">Menu</span>
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="border-b py-2">
          <div className="flex justify-between">
          <Link className="flex items-center font-black text-xl after:content-['GADGET'] after:text-rose-500" href={"/"}>
            <FaShoppingCart className="text-rose-500" size={24}/>SM
          </Link>
            <DrawerClose asChild className="cursor-pointer">
              <Button variant="ghost" size={"icon"}>
                <XIcon className="size-5" />
              </Button>
            </DrawerClose>
          </div>
          <VisuallyHidden asChild>
            <DrawerTitle>Are you absolutely sure?</DrawerTitle>
          </VisuallyHidden>
          <VisuallyHidden asChild>
            <DrawerDescription>Are you absolutely sure?</DrawerDescription>
          </VisuallyHidden>
        </DrawerHeader>
        <div className="flex flex-col gap-4 p-4">
          <Link href={"/"} className="text-sm font-medium">
            Home
          </Link>
          <Link href={"/about"} className="text-sm font-medium">
            About
          </Link>
          <Accordion type="single" collapsible className="flex flex-col gap-4">
            <AccordionItem value="services" className="border-b-0">
              <AccordionTrigger className="py-0 cursor-pointer">
                Services
              </AccordionTrigger>
              <AccordionContent className="flex flex-col gap-4 py-0 pl-2 mt-4">
                <Link href={"#"} className="block">
                  Web Design
                </Link>
                <Link href={"#"} className="block">
                  Web Development
                </Link>
                <Link href={"#"} className="block">
                  Speed Optimization
                </Link>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="products" className="border-b-0">
              <AccordionTrigger className="py-0 cursor-pointer">
                Products
              </AccordionTrigger>
              <AccordionContent className="flex flex-col gap-4 py-0 pl-2 mt-4">
                <Link href={"#"} className="block">
                  Landing Page
                </Link>
                <Link href={"#"} className="block">
                  Web App
                </Link>
                <Link href={"#"} className="block">
                  Android App
                </Link>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          <Link href={"#"} className="text-sm font-medium">
            Contact
          </Link>
        </div>
        <DrawerFooter>
          <ModeSwitch/>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
