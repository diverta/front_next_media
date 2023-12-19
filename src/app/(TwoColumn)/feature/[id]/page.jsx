import { getFeatureDetails } from "@/components/common/fetchData";
import FeatureDetailBody from "@/components/section/feature/FeatureDetailBody";

export default async function Event({ params }) {
    const item = await getFeatureDetails(params.id);
    console.log(params.id);
    return (
        <div>
          <FeatureDetailBody data={item}/>
        </div>
      );
  }