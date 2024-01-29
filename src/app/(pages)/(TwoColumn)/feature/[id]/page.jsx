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
  const item = await getFeatureDetails(params.id);

  const fetchDetailsForItems = async () => {
    if (!item?.ext_3 || item.ext_3.length === 0) {
      return [];
    }
    const ids = item.ext_3
      .map((item) => item.module_id)
      .filter(id => id)
    return await Promise.all(ids.map((id) => getDetails(id)));
  };
  const details = await fetchDetailsForItems();

  return (
    <div>
      <FeatureDetailBody data={item} details={details} />
    </div>
  );
}