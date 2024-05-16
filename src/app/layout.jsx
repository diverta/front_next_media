import '@/styles/style.scss';

import { Noto_Sans_JP, Secular_One } from 'next/font/google';

import clsx from 'clsx';
import { UserProvider } from '../contexts/user';
import Header from '@/components/layouts/Header';
import Footer from '@/components/layouts/Footer';
import { METADATA } from '@/constants/config';

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
  title:{
    default: METADATA.TITLE,
    template: `%s | ${METADATA.TITLE}`,
  },
  description: METADATA.DESCRIPTION,
};

export default async function RootLayout({ children }) {
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
