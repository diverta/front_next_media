import "@/styles/style.scss";

import { Noto_Sans_JP, Secular_One } from 'next/font/google'

import clsx from "clsx";
import { UserProvider } from "../contexts/user";
import Header from "@/components/layouts/Header";
import Footer from "@/components/layouts/Footer";

const notoSansJP = Noto_Sans_JP({
  subsets: ['latin'],
  variable: '--font-noto-sans-jp',
  display: 'swap',
});

const secularOne = Secular_One({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-secular-one',
  display: 'block',
});

export const metadata = {
  title: "kuroco Trip",
  description: "Let's Travel and Enjoy!",
};

export default async function RootLayout({ children, initialUser }) {
  return (
    <html className={clsx(notoSansJP.variable, secularOne.variable)}>
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
