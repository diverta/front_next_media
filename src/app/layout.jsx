import "@/styles/style.scss";
import { UserProvider } from "../contexts/user";
import Header from "@/components/layouts/Header";
import Footer from "@/components/layouts/Footer";

export const metadata = {
  title: "kuroco Trip",
  description: "Let's Travel and Enjoy!",
};

export default async function RootLayout({ children, initialUser }) {
  return (
    <html>
      <body>
        <UserProvider>
          <Header />
          {children}
          <Footer />
        </UserProvider>
      </body>
    </html>
  );
}
