import Pager from "@/components/common/Pager";
import { getContentList } from "@/components/common/fetchData";
import CardList from "@/components/ui/CardList";

export default async function Event({ searchParams }) {
  const content = {
    text: "記事",
    text_en: "ARTICLE",
  };
  const page = Number(
    searchParams && searchParams.page ? searchParams.page : 1
  );
  const tag_id = Number(
    searchParams && searchParams.tag_id ? searchParams.tag_id : null
  );

  const { list, pageInfo } = await getContentList("ALL", page, tag_id);
  console.log("SearchParams");
  console.log(searchParams);

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
