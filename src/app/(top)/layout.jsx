import {Banner, TagArea, TagKeyword} from "@/components/common";
import Hero from "@/components/section/top/Hero";
import Feature from "@/components/section/feature/Feature";

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