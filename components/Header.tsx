import Link from "next/link";
import { auth } from "@/auth"
import { MainMenu } from "@/components/MainMenu";
import { MobileMenu } from "@/components/MobileMenu";
import { ModeToggle } from "@/components/ModeToggle";
import { UserDropdown } from "@/components/UserDropdown";
import { ButtonCart, ButtonSearch } from "@/components/Buttons";
import { SearchModal } from "@/components/SearchModal";
import { CartModal } from "@/components/CartModal";
import Image from "next/image";
import { Button } from "./ui/button";
import { User2Icon } from "lucide-react";
import { AvatarUser } from "./Avatar";
export async function Header() {
  const session = await auth()
  return (
    <header className="bg-background sticky top-0 z-40 w-full py-2 md:py-4 border-b">
      <div className="mx-auto max-w-screen-2xl px-4 xl:px-8">
        <div className="hidden items-center justify-between gap-2 md:flex">
          <Link href={"/"}>
            <Image
              src={"/logo.png"}
              className="w-20 object-cover"
              alt={"smgadgetbd"}
              width={626}
              height={222}
            />
          </Link>
          <MainMenu />
          <div className="flex gap-3">
            <ButtonSearch />
            <ModeToggle />
            {/* <UserDropdown /> */}
            <ButtonCart />
            <Button asChild variant={"ghost"}>
              {!session?.user ? <Link href={"/signin"}><User2Icon className="size-5"/></Link>:<AvatarUser src={session.user.image as string} alt={session.user.name as string} fallback={"SM"}/>}           
            </Button>
          </div>
        </div>
        <div className="flex items-center justify-between md:hidden">
          <Link href={"/"}>
            <Image
              src={"/logo.png"}
              className="w-20 object-cover"
              alt={"smgadgetbd"}
              width={626}
              height={222}
            />
          </Link>
          <div className="flex gap-0.5 min-[340px]:gap-1">
            <ButtonSearch />
            <UserDropdown />
            <ButtonCart />
            <MobileMenu />
          </div>
        </div>
        <SearchModal />
        <CartModal />
      </div>
    </header>
  );
}
