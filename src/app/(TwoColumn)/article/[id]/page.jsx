import DetailBody from "@/components/section/twoColumn/DetailBody";
import { getDetails } from "@/components/common/fetchData";
import {
  Banner,
  Breadcrumb,
  PageTitle,
  TagArea,
  TagKeyword,
} from "@/components/common";
import Feature from "@/components/section/feature/Feature";

export default async function Food({ params }) {
  const item = await getDetails(params.id);

  const content = {
    text: item.contents_type_ext_col_01,
    text_en: item.contents_type_nm,
  };

  return (
    <div className="l-container">
      <Breadcrumb content={content} />
      <PageTitle content={content} />
      <div className="l-container--col-2 l-container--contents">
        <div className="l-container--col-2__main">
          <div>
            <DetailBody data={item} />
          </div>
        </div>
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
