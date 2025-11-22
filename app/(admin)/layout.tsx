import type { Metadata } from "next";
import { SessionProvider } from "next-auth/react";
export const metadata: Metadata = {
  title: "SM Gadget BD",
  description: "My own business",
};

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <SessionProvider>{children}</SessionProvider>;
}
