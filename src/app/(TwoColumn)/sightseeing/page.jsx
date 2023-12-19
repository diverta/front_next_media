import Pager from "@/components/common/Pager";
import { getContentList } from "@/components/common/fetchData";
import CardList from "@/components/ui/CardList";

export default async function Sightseeing() {
  const {list, pageInfo} = await getContentList("SIGHTSEEING");
  return (
    <section className="c-article__list">
      <h2 className="c-heading--lv2 u-mb-50">
        サイトシーイング<span>記事一覧</span>
      </h2>
      <CardList data={list} />
    </section>
  );
}
