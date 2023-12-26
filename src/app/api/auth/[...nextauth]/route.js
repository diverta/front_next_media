import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
// import { authenticate } from "@/services/authService"
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        const user = { id: "1", name: "J Smith", email: "jsmith@example.com" }
  
        if (user) {
          return user
        } else {
          return null
        }
      }
    }),
    GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET
    })
  ],
  pages: {
    signIn: "/login",
  },
  session: { strategy: "jwt" }
};

const handler = NextAuth(authOptions);

module.exports = { GET: handler, POST: handler };
