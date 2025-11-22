  "use server";
import prisma from "@/lib/prisma";
import { signIn, signOut } from "@/auth";
export const signinWithGoogle = async () => {
  await signIn("google");
};

export const logOut = async () => {
  await signOut();
};
export const createUser = async (data:{name:string,email:string,password:string}) => {
      await prisma.user.create({data});
};
