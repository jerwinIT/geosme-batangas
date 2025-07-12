import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        username: { label: "Username", type: "text" },
      },
      async authorize(credentials) {
        // Here you would typically validate against your database
        // For now, we'll implement basic validation

        if (credentials?.email && credentials?.password) {
          // User login
          // Add your user validation logic here
          // Example: const user = await validateUser(credentials.email, credentials.password);

          // For demo purposes, accept any email/password combination
          return {
            id: "1",
            email: credentials.email,
            name: credentials.email.split("@")[0],
            role: "user",
          };
        }

        if (credentials?.username && credentials?.password) {
          // Admin login
          // Add your admin validation logic here
          // Example: const admin = await validateAdmin(credentials.username, credentials.password);

          // For demo purposes, accept any username/password combination
          return {
            id: "admin-1",
            email: credentials.username,
            name: credentials.username,
            role: "admin",
          };
        }

        return null;
      },
    }),
  ],
  pages: {
    signIn: "/auth/user/login",
  },
  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id;
        token.role = user.role || "user";
      }

      if (account?.provider === "google") {
        // Handle Google sign-in
        token.role = "user"; // Default role for Google users
      }

      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
