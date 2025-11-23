"use server";
import prisma from "@/lib/prisma";
import { signIn, signOut } from "@/auth";
import { comparePassword, saltAndHashPassword } from "@/lib/password";
export const signinWithGoogle = async () => {
  await signIn("google");
};

export const logOut = async () => {
  await signOut();
};
export const createUser = async (data: {
  name: string;
  email: string;
  password: string;
}) => {
  try {
    const user = await prisma.user.findUnique({ where: { email: data.email } });
    if (user) {
      return {
        success: false,
        message: "That user already exist!",
      };
    }
    const hash = await saltAndHashPassword(data.password);
    await prisma.user.create({
      data: { name: data.name, email: data.email, password: hash },
    });
    return {
      success: true,
      message: "Your account has been created successfully",
    };
  } catch (error) {
    throw error;
  }
};
export const loginUser = async (data: { email: string; password: string }) => {
  try {
    const user = await prisma.user.findUnique({ where: { email: data.email } });
    if (!user) {
      return {
        success: false,
        emailError: "User not found",
      };
    }
    const isMatch = await comparePassword(
      data.password,
      user?.password as string
    );
    if (!isMatch) {
      return {
        success: false,
        passwordError: "Incorrect password",
      };
    }
    await signIn("credentials", { email: data.email, password: isMatch });
    return {
      success: true,
      message: "You have signed in your account successfully",
    };
  } catch (error) {
    throw error;
  }
};
