import Link from "next/link";

import { MainMenu } from "@/components/MainMenu";
// import Image from "next/image";
// import Logo from "@/public/logo.png";
import { MobileMenu } from "@/components/MobileMenu";
import { ModeToggle } from "@/components/ModeToggle";
import { UserDropdown } from "@/components/UserDropdown";
import { ButtonCart, ButtonSearch } from "@/components/Buttons";
import { SearchModal } from "@/components/SearchModal";
import { CartModal } from "@/components/CartModal";
import { FaShoppingCart } from "react-icons/fa";
export function Header() {
  return (
    <header className="bg-background sticky top-0 z-40 w-full py-4">
      <div className="mx-auto max-w-screen-xl 2xl:max-w-screen-2xl px-4 xl:px-8">
        <div className="hidden items-center justify-between gap-2 md:flex">
          <Link className="flex items-center" href={"/"}>
            {/* <Image src={Logo} alt="Logo" /> */}
            <span className="text-rose-500"><FaShoppingCart size={24}/></span>
            <span className="font-black text-xl">SM<span className="text-rose-500">GADGET</span></span>
          </Link>
          <MainMenu />
          <div className="flex gap-2">
            <ButtonSearch/>            
            <ModeToggle />
            <UserDropdown/>
              <ButtonCart/>                     
          </div>
        </div>
        <div className="flex items-center justify-between md:hidden">
          <div className="flex items-center gap-2">
            <MobileMenu />
          <Link className="flex items-center" href={"/"}>
            {/* <Image src={Logo} alt="Logo" /> */}
            <span className="text-rose-500"><FaShoppingCart size={24}/></span>
            <span className="font-black text-xl">SM<span className="text-rose-500">GADGET</span></span>
          </Link>
          </div>
          <div className="flex min-[400px]:gap-2">
            <ButtonSearch/> 
            <ModeToggle />     
            <UserDropdown/>
            <ButtonCart/>          
          </div>
        </div>
        <SearchModal/>
        <CartModal/>  
      </div>
    </header>
  );
}
