import "@/styles/style.scss";
import Header from "@/components/layouts/Header";
import Footer from "@/components/layouts/Footer";
import Provider from "@/components/layouts/Provider";

export const metadata = {
  title: "kuroco Trip",
  description: "Let's Travel and Enjoy!",
};

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <Provider>
          <Header />
          {children}
          <Footer />
        </Provider>
      </body>
    </html>
  );
}
