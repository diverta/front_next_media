import Pager from "@/components/common/Pager";
import { getContentList } from "@/components/common/fetchData";
import CardList from "@/components/ui/CardList";
import TwoColumnTop from "@/components/common/TwoColumn/TwoColumnTop";
import TwoColumnSide from "@/components/common/TwoColumn/TwoColumnSide";

export default async function Sightseeing() {
  const data = await getContentList("SIGHTSEEING");
  return (
    <section className="c-article__list">
      <h2 className="c-heading--lv2 u-mb-50">
        サイトシーイング<span>記事一覧</span>
      </h2>
      <CardList data={data} />
      <Pager />
    </section>
  );
}
