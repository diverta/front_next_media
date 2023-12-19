import {Banner, Breadcrumb, PageTitle, TagArea, TagKeyword} from "@/components/common";
import {getFeatureList} from "@/components/common/fetchData";
import Feature from "@/components/section/feature/Feature";

export default async function Layout({ children }) {
  const data = await getFeatureList();
  return (
    <div className="l-container">
      <Breadcrumb data={data} />
      <PageTitle data={data} />
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
