
import wrapperApi from "@/lib/wrapperApi";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  pages: {
    signIn: "/",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        try {
          let options = {
            url: "/signIn",
            data: {
              email: credentials.username,
              password: credentials.password,
            },
          };
          const response = await wrapperApi("post", options);
          const user = response?.data;
          if (response.status === 200 && user) {
            return user;
          }
        } catch (error) {
          throw new Error(
            JSON.stringify(
              error?.response?.data
                ? error?.response?.data
                : "Something went wrong. please try again."
            )
          );
        }
      },
    }),
  ],
  
  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        let newtoken = {
          ...token,
          user,
        };
        return newtoken;
      }
      return token;
    },
    async session({ token, session }) {
      session.user = token.user;
      return session;
    },
  },
  
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
