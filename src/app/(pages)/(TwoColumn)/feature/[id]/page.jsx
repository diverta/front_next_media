import { getFeatureDetails, getFeatureList } from "@/components/common/fetchData";
import FeatureDetailBody from "@/components/section/feature/FeatureDetailBody";

export async function generateStaticParams() {
  const items = await getFeatureList();
  const paramID = items.map((item) => ({
    id: item.topics_id.toString(),
  }))
  console.log(paramID);
  return paramID;
}

export default async function Event({ params }) {
    const item = await getFeatureDetails(params.id);
    
    return (
        <div>
          <FeatureDetailBody data={item}/>
        </div>
      );
  }