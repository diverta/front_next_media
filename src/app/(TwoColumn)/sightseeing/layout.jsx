import Pager from "@/components/common/Pager";
import CardList from "@/components/ui/CardList";
import { getContentList } from "@/components/common/fetchData";
import Breadcrumb from "@/components/common/Breadcrumb";
import PageTitle from "@/components/common/PageTitle";
import Banner from "@/components/common/Banner";
import Feature from "@/components/section/feature/Feature";
import TagArea from "@/components/common/TagArea";
import TagKeyword from "@/components/common/TagKeyword";

export default async function Layout({ children }) {
  const data = await getContentList("SIGHTSEEING");
  return (
    <div className="l-container">
      <Breadcrumb data={data} />
      <PageTitle data={data} />
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
