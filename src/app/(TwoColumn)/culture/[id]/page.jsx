import DetailBody from "@/components/section/twoColumn/DetailBody";
import { getDetails } from "@/components/common/fetchData";

// export async function generateStaticParams() {
//     const items = await getContentList('CULTURE'); 
//     return items.map((item) => ({ item : item.topics_id }));
// }

export default async function Culture({ params }) {
    const item = await getDetails(params.id);
    return (
        <div>
          <DetailBody data={item}/>
        </div>
      );
  }