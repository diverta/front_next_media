import {Banner, Breadcrumb, PageTitle, TagArea, TagKeyword} from "@/components/common";
import Feature from "@/components/section/feature/Feature";

export default async function Layout({ children }) {
  const content = {
    text: "記事",
    text_en: "ARTICLE",
  };
  return (
    <div className="l-container">
      <Breadcrumb content={content} />
      <PageTitle content={content} />
      <div className="l-container--col-2 l-container--contents">
        <div className="l-container--col-2__main">{children}</div>
        <div className="l-container--col-2__side">
          <Banner />
          <Feature />
          <TagArea />
          <TagKeyword />
        </div>
      </div>
    </div>
  );
}
