import '@/styles/style.scss'
import Header from "@/components/layouts/Header";
import Footer from "@/components/layouts/Footer";

export const metadata = {
  title: "kuroco Trip",
  description: "Let's Travel and Enjoy!",
}

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <Header />
          {children}
        <Footer />
      </body>
    </html>
  )
}
