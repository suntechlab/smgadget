  "use server";
import prisma from "@/lib/prisma";
import { signIn, signOut } from "@/auth";
import { saltAndHashPassword } from "@/lib/password";
export const signinWithGoogle = async () => {
  await signIn("google");
};

export const logOut = async () => {
  await signOut();
};
export const createUser = async (data:{name:string,email:string,password:string}) => {
      const hash = await saltAndHashPassword(data.password)
      await prisma.user.create({data:{name:data.name,email:data.email,password:hash}});
};
