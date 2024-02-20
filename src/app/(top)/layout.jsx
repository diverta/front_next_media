import Banner from "@/components/common/Banner"
import TagArea from "@/components/common/TagArea"
import TagKeyword from "@/components/common/TagKeyword"
import Hero from "@/components/section/top/Hero"
import Feature from "@/components/section/feature/Feature"
import Header from "@/components/layouts/Header"
import Footer from "@/components/layouts/Footer"

export default function Layout({ children }) {
  return (
    <span>
      <Header topPage={"topPage"} />
      <div className="l-container is-top">
        <Hero />
        <div className="l-container--col-2">
          <div className="l-container--col-2__main">{children}</div>
          <div className="l-container--col-2__side">
            <Banner />
            <Feature />
            <TagArea />
            <TagKeyword />
          </div>
        </div>
      </div>
      <Footer />
    </span>
  )
}
