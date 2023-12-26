import {Banner, Breadcrumb, PageTitle, TagArea, TagKeyword} from "@/components/common";
import Feature from "@/components/section/feature/Feature";
import {getLabels} from "@/components/common/fetchData";

export default async function Layout({ children }) {
  const contentDirectory = getLabels();
  const content = contentDirectory.mypage;
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
