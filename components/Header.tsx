import Link from "next/link";

import { MainMenu } from "@/components/MainMenu";
import Image from "next/image";
import Logo from "@/public/logo.png";
import { MobileMenu } from "@/components/MobileMenu";
import { ModeToggle } from "@/components/ModeToggle";
import { UserDropdown } from "@/components/UserDropdown";
import { ButtonCart, ButtonSearch } from "@/components/Buttons";
import { SearchModal } from "@/components/SearchModal";
import { CartModal } from "@/components/CartModal";
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
            <ButtonSearch/>            
            <ModeToggle />
            <UserDropdown/>
              <ButtonCart/>                     
          </div>
        </div>
        <div className="flex items-center justify-between min-[920px]:hidden">
          <div className="flex items-center">
            <MobileMenu />
          <Link className="flex items-center gap-1 w-20" href={"/"}>
            <Image src={Logo} alt="Logo" />
          </Link>
          </div>
          <div className="flex gap-2">
            <ButtonSearch/> 
            <ModeToggle />
            <ButtonCart/>          
          </div>
        </div>
        <SearchModal/>
        <CartModal/>  
      </div>
    </header>
  );
}
