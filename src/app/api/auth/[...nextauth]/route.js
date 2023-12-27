import { getMemberInfo } from "@/components/common/fetchData";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
// import { authenticate } from "@/services/authService"
// import GoogleProvider from "next-auth/providers/google";
// import { getMemberInfo } from "@/components/common/fetchData";
const useUser = () => useState('user', () => null);
export const authOptions = {

  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/rcms-api/1/login`,
          {
            method: "POST",
            body: JSON.stringify(credentials),
            headers: { "Content-Type": "application/json" },
            credentials: 'include'
          }
        );
        const userRef = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL}/rcms-api/1/profile`,
            {
              method: "GET",
            //   body: JSON.stringify(credentials),
              headers: { "Content-Type": "application/json" },
              credentials: 'include'
            }
          );
        const user = await res.json();
        const userRef2 = await userRef.json();        
        console.log(user);
        console.log("Bhai");
        console.log(userRef2);

        // If no error and we have user data, return it
        if (res.ok && user) {
          return user;
        }
        // Return null if user data could not be retrieved
        return null;
      },
    }),
  ],
    // pages: {
    //   signIn: "/login",
    // },
  //   session: { strategy: "jwt" }
};

const handler = NextAuth(authOptions);

module.exports = { GET: handler, POST: handler };
