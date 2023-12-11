import DetailBody from "@/components/common/DetailBody";
import { getCategoryList, getDetails, newContentList } from "@/components/common/fetchData";

// export async function generateStaticParams() {
//     const items = await newContentList('CULTURE'); 
//     return items.map((item) => ({ item : item.topics_id }));
// }

export default async function Culture({ params }) {
    console.log(params.id);
    const item = await getDetails(params.id);
    console.log(item);
    
    return (
        <div>
          {/* <h1>{item.subject}</h1> */}
          <DetailBody />
        </div>
      );
  }