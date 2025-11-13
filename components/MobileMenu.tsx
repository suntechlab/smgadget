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
import { ModeSwitch } from "./ModeSwitch";
import Image from "next/image";
import { Book, Sunset, Trees, Zap } from "lucide-react";
const Navbar = {
  logo: {
    url: "/",
    src: "/logo.png",
    alt: "logo",
    title: "Smgadgetbd",
  },
  menu: [
    { title: "Shop", url: "/shop" },
    {
      title: "Products",
      url: "#",
      items: [
        {
          title: "Blog",
          description: "The latest industry news, updates, and info",
          icon: <Book className="size-5 shrink-0" />,
          url: "#",
        },
        {
          title: "Company",
          description: "Our mission is to innovate and empower the world",
          icon: <Trees className="size-5 shrink-0" />,
          url: "#",
        },
        {
          title: "Careers",
          description: "Browse job listing and discover our workspace",
          icon: <Sunset className="size-5 shrink-0" />,
          url: "#",
        },
        {
          title: "Support",
          description:
            "Get in touch with our support team or visit our community forums",
          icon: <Zap className="size-5 shrink-0" />,
          url: "#",
        },
      ],
    },
    {
      title: "Resources",
      url: "#",
      items: [
        {
          title: "Help Center",
          description: "Get all the answers you need right here",
          icon: <Zap className="size-5 shrink-0" />,
          url: "#",
        },
        {
          title: "Contact Us",
          description: "We are here to help you with any questions you have",
          icon: <Sunset className="size-5 shrink-0" />,
          url: "#",
        },
        {
          title: "Status",
          description: "Check the current status of our services and APIs",
          icon: <Trees className="size-5 shrink-0" />,
          url: "#",
        },
        {
          title: "Terms of Service",
          description: "Our terms and conditions for using our services",
          icon: <Book className="size-5 shrink-0" />,
          url: "#",
        },
      ],
    },
    {
      title: "Pricing",
      url: "#",
    },
    {
      title: "Blog",
      url: "#",
    },
  ],
  auth: {
    login: { title: "Login", url: "#" },
    signup: { title: "Sign up", url: "#" },
  },
};
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
    <Drawer
      direction="top"
      open={isOpen}
      onOpenChange={setIsOpen}
      autoFocus={true}
    >
      <DrawerTrigger asChild className="cursor-pointer">
        <Button variant={"ghost"} size={"icon"}>
          <Menu className="size-5" />
          <span className="sr-only">Menu</span>
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="border-b py-2">
          <div className="flex justify-between">
            <Link href={"/"}>
              <Image
                src={"/logo.png"}
                className="w-20 object-cover"
                alt={"smgadgetbd"}
                width={626}
                height={222}
              />
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
          <Accordion type="single" collapsible className="flex flex-col gap-4">
            {Navbar.menu.map((page, index) =>
              page.items ? (
                <AccordionItem
                  key={index}
                  value={page.title}
                  className="border-b-0"
                >
                  <AccordionTrigger className="py-0 cursor-pointer">
                    {page.title}
                  </AccordionTrigger>
                  <AccordionContent className="flex flex-col gap-4 py-0 pl-2 mt-4">
                    {page.items.map((subItem, index) => (
                      <Link key={index} href={subItem.url} className="block">
                        {subItem.title}
                      </Link>
                    ))}
                  </AccordionContent>
                </AccordionItem>
              ) : (
                /* <AccordionItem value="products" className="border-b-0">
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
            </AccordionItem> */
                <Link
                  key={index}
                  href={page.url}
                  className="text-sm font-medium"
                >
                  {page.title}
                </Link>
              )
            )}
          </Accordion>
        </div>
        <DrawerFooter>
          <ModeSwitch />
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
