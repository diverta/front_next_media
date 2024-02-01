import { getFeatureList } from "@/components/common/fetchData";
import Feature from "@/components/section/feature/Feature";
import Banner from "@/components/common/Banner";
import Breadcrumb from "@/components/common/Breadcrumb";
import PageTitle from "@/components/common/PageTitle";
import TagArea from "@/components/common/TagArea";
import TagKeyword from "@/components/common/TagKeyword";

export default async function Layout({ children }) {
  const data = await getFeatureList();
  return (
    <div className="l-container">
      <Breadcrumb paths={[{ label: data[0].contents_type_ext_col_01 }]} />
      <PageTitle content={data} />
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