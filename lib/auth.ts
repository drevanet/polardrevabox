import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";
import { verifySignupToken } from "@/lib/signup-token";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },

  pages: {
    signIn: "/login",
  },

  providers: [
    CredentialsProvider({
      name: "Email, Phone or Signup Token",

      credentials: {
        email: { label: "Email", type: "email" },
        phone: { label: "Phone Number", type: "tel" },
        signupToken: { label: "Signup Token", type: "text" },
      },

      async authorize(credentials) {
        if (!credentials) return null;

        // New signup: authenticate the exact account using its signed token.
        if (credentials.signupToken) {
          const userId = verifySignupToken(credentials.signupToken);

          if (!userId) return null;

          const user = await prisma.user.findUnique({
            where: { id: userId },
            select: {
              id: true,
              name: true,
              email: true,
            },
          });

          if (!user) return null;

          return user;
        }

        // Existing login: require both email and phone.
        if (!credentials.email || !credentials.phone) {
          return null;
        }

        const email = credentials.email.trim().toLowerCase();
        const phone = credentials.phone.trim();

        const users = await prisma.user.findMany({
          where: {
            email,
            phone,
          },
          take: 2,
          select: {
            id: true,
            name: true,
            email: true,
          },
        });

        // Do not authenticate an ambiguous account.
        if (users.length !== 1) return null;

        return users[0];
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }

      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
      }

      return session;
    },
  },
};