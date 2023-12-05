import Hero from "@/components/section/top/Hero";
import Banner from "@/components/common/Banner";

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="l-container is-top">
      <Hero />
      <div className="l-container--col-2">
        <div className="l-container--col-2__main">
          {children}
        </div>
        <div className="l-container--col-2__side">
          <Banner />
        </div>
      </div>
    </div>
  )
}