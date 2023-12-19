import Pager from "@/components/common/Pager";
import { getContentList } from "@/components/common/fetchData";
import CardList from "@/components/ui/CardList";

export default async function Event({ searchParams }) {
  const page = Number(
    searchParams && searchParams.page ? searchParams.page : 1
  );
  const { list, pageInfo } = await getContentList("ALL", page);

  return (
    <section className="c-article__list">
      <h2 className="c-heading--lv2 u-mb-50">
      記事<span>記事一覧</span>
      </h2>
      <CardList data={list} />
      <Pager page={page} pageInfo={pageInfo} />
    </section>
  );
}
