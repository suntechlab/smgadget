import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google,
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        let user = null;

        user = {email:"test@gmail.com",password:"Utah@123"};

        if (!user) {
          throw new Error("Invalid credentials.");
        }
        return user;
      },
    }),
  ],
});
