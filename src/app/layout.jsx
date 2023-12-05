import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";

export default function RootLayout({ children }) {
  return (
    <section>
      <Header />
      <div className="l-container">
        <main>{children}</main>
      </div>
      <Footer />
    </section>
  );
}
