import DetailBody from "@/components/section/twoColumn/DetailBody";
import { getDetails } from "@/components/common/fetchData";

export default async function Sightseeing({ params }) {
    const item = await getDetails(params.id);
    return (
        <div>
          <DetailBody data={item}/>
        </div>
      );
  }