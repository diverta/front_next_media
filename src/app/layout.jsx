import "@/styles/style.scss";
import Header from "@/components/layouts/Header";
import Footer from "@/components/layouts/Footer";
import SessionProvider from "@/components/layouts/SessionProvider";
import { getServerSession } from "next-auth";

export const metadata = {
  title: "kuroco Trip",
  description: "Let's Travel and Enjoy!",
};

export default async function RootLayout({ children }) {
  const session = await getServerSession();
  return (
    <html>
      <body>
        <SessionProvider>
          <Header />
          {children}
          <Footer />
        </SessionProvider>
      </body>
    </html>
  );
}
