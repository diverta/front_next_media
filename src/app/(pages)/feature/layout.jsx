import Banner from "@/components/common/Banner";
import Breadcrumb from "@/components/common/Breadcrumb";
import PageTitle from '@/components/common/PageTitle';
import TagArea from "@/components/common/TagArea";
import TagKeyword from "@/components/common/TagKeyword";
import { getFeatureList } from "@/components/common/fetchData";
import Feature from "@/components/section/feature/Feature";

export default async function Layout({ children }) {
  const list = await getFeatureList();

  return (
    <div className="l-container">
      <Breadcrumb paths={[{ label: list?.[0]?.contents_type_ext_col_01 }]} />
      <PageTitle
        title={list?.[0]?.contents_type_ext_col_01}
        subTitle={list?.[0]?.contents_type_nm}
      />
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