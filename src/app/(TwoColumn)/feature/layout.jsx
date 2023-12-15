import Pager from "@/components/common/Pager";
import CardList from "@/components/ui/CardList";
import { getFeatureList } from "@/components/common/fetchData";
import TwoColumnTop from "@/components/common/TwoColumn/TwoColumnTop";
import TwoColumnSide from "@/components/common/TwoColumn/TwoColumnSide";

export default async function Layout({children}) {
  const data = await getFeatureList();
  return (
    <div className="l-container">
      <TwoColumnTop data={data} />
      <div className="l-container--col-2 l-container--contents">
        <div className="l-container--col-2__main">
        {children}
        </div>
        <TwoColumnSide />
      </div>
    </div>
  );
}
