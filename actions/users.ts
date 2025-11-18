import { signIn, signOut } from "@/auth";
export const login = async () => {
  "use server";
  await signIn("google");
};

export const logOut = async () => {
  "use server";
  await signOut();
};
