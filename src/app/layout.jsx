import "@/styles/style.scss";
import { UserProvider } from "../components/common/userContext";

export const metadata = {
  title: "kuroco Trip",
  description: "Let's Travel and Enjoy!",
};

export default async function RootLayout({ children, initialUser }) {
  return (
    <html>
      <body>
        <UserProvider>{children}</UserProvider>
      </body>
    </html>
  );
}
