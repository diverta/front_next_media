import Hero from "@/components/section/top/Hero";
import Banner from "@/components/common/Banner";
import Feature from "@/components/section/feature/Feature";
import TagArea from "@/components/common/TagArea";
import TagKeyword from "@/components/common/TagKeyword";

export default function Layout({ children }) {
  return (
    <div className="l-container is-top">
      <Hero />
      <div className="l-container--col-2">
        <div className="l-container--col-2__main">
          {children}
        </div>
        <div className="l-container--col-2__side">
          <Banner />
          <Feature />
          <TagArea />
          <TagKeyword />
        </div>
      </div>
    </div>
  )
}