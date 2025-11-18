import Image from "next/image";
import Link from "next/link";
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";

export function Footer() {
  return (
    <footer className="w-full py-12 border-t">
      <div className="mx-auto max-w-screen-2xl px-4 xl:px-8">
        <div className="flex justify-center">
          <Link href={"/"}>
            <Image
              src={"/logo.png"}
              className="w-20 object-cover"
              alt={"smgadgetbd"}
              width={626}
              height={222}
            />
          </Link>
        </div>
        <ul className="text-lg flex items-center justify-center flex-col gap-7 md:flex-row md:gap-12 transition-all duration-500 py-12">
          <li>
            <Link href="#" className="text-gray-800 hover:text-gray-900">
              About
            </Link>
          </li>
          <li>
            <Link href="#" className=" text-gray-800 hover:text-gray-900">
              Products
            </Link>
          </li>
          <li>
            <Link href="#" className=" text-gray-800 hover:text-gray-900">
              Resources
            </Link>
          </li>
          <li>
            <Link href="#" className=" text-gray-800 hover:text-gray-900">
              Blogs
            </Link>
          </li>
          <li>
            <Link href="#" className=" text-gray-800 hover:text-gray-900">
              Support
            </Link>
          </li>
        </ul>
        <div className="flex space-x-10 justify-center items-center mb-12">
          <Link
            href="#"
            className="block  text-gray-900 transition-all duration-500 hover:text-indigo-600 "
          >
            <FaTwitter />
          </Link>
          <Link
            href="#"
            className="block  text-gray-900 transition-all duration-500 hover:text-indigo-600 "
          >
            <FaInstagram />
          </Link>
          <Link
            href="#"
            className="block  text-gray-900 transition-all duration-500 hover:text-indigo-600 "
          >
            <FaFacebookF />
          </Link>
          <Link
            href="#"
            className="block  text-gray-900 transition-all duration-500 hover:text-indigo-600 "
          >
            <FaYoutube />
          </Link>
        </div>
        <span className="text-lg text-gray-500 text-center block">
          ©<Link href="/">smgadgetbd</Link> 2024, All rights reserved.
        </span>
      </div>
    </footer>
  );
}
