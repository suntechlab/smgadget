import Link from "next/link";

import { MainMenu } from "@/components/MainMenu";
import Image from "next/image";
import Logo from "@/public/logo.png";
import { MobileMenu } from "@/components/MobileMenu";
import { ModeToggle } from "@/components/ModeToggle";
import { UserDropdown } from "./UserDropdown";
import { SearchForm } from "./SearchForm";
import { BadgeCart } from "./BadgeCart";
import { CartModal } from "./CartModal";
export function Header() {
  return (
    <header className="bg-background sticky top-0 z-40 w-full">
      <div className="mx-auto max-w-screen-2xl px-4 xl:px-8">
        <div className="hidden items-center justify-between gap-2 min-[920px]:flex">
          <Link className="flex items-center gap-1 w-20" href={"/"}>
            <Image src={Logo} alt="Logo" />
          </Link>
          <MainMenu />
          <div className="flex gap-2">
            <SearchForm/>
            <ModeToggle />
            <UserDropdown/>
              <BadgeCart/>
              <CartModal/>         
          </div>
        </div>
        <div className="flex items-center justify-between min-[920px]:hidden">
          <Link className="flex items-center gap-1 w-20" href={"/"}>
            <Image src={Logo} alt="Logo" />
          </Link>
          <div className="flex gap-2">
            <ModeToggle />
            <MobileMenu />
          </div>
        </div>
      </div>
    </header>
  );
}
