
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";

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
      name: "Email and Phone",

      credentials: {
        email: {
          label: "Email",
          type: "email",
        },
        phone: {
          label: "Phone Number",
          type: "tel",
        },
      },

      async authorize(credentials) {
        if (!credentials?.email || !credentials?.phone) {
          return null;
        }

        const email = credentials.email.trim().toLowerCase();
        const phone = credentials.phone.trim();

        const user = await prisma.user.findFirst({
          where: {
            email,
            phone,
          },
        });

        if (!user) {
          return null;
        }

        return {
          id: user.id,
          name: user.name,
          email: user.email,
        };
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
