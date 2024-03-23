import Banner from "@/components/common/Banner";
import Breadcrumb from "@/components/common/Breadcrumb";
import PageTitle from '@/components/common/PageTitle';
import TagArea from "@/components/common/TagArea";
import TagKeyword from "@/components/common/TagKeyword";
import Feature from "@/components/section/feature/Feature";
import { getFeatureDetails, getFeatureList, getDetails } from "@/components/common/fetchData";
import FeatureDetailBody from "@/components/section/feature/FeatureDetailBody";

export async function generateStaticParams() {
  const items = await getFeatureList();
  const paramID = items.map((item) => ({
    id: item.topics_id.toString(),
  }))
  return paramID;
}

export default async function Event({ params }) {
  const features = await getFeatureDetails(params.id);

  const fetchDetailsForItems = async () => {
    if (!features?.relatedContents || features.relatedContents.length === 0) {
      return [];
    }
    const ids = features.relatedContents
      .map((item) => item.module_id)
      .filter(id => id)
    return await Promise.all(ids.map((id) => getDetails(id)));
  };
  const details = await fetchDetailsForItems();

  return (
    <div className="l-container">
      <Breadcrumb paths={[{ label: features?.[0]?.contents_type_ext_col_01 }]} />
      <PageTitle
        title={features?.[0]?.contents_type_ext_col_01}
        subTitle={features?.[0]?.contents_type_nm}
      />
      <div className="l-container--col-2 l-container--contents">
        <div className="l-container--col-2__main">
          <div>
            <FeatureDetailBody data={features} details={details} />
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