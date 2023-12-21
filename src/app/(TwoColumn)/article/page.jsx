import Pager from "@/components/common/Pager";
import { getContentList } from "@/components/common/fetchData";
import CardList from "@/components/ui/CardList";
import Feature from "@/components/section/feature/Feature";
import { getLabels } from "@/components/common/fetchData"; 

import {
  Banner,
  Breadcrumb,
  PageTitle,
  TagArea,
  TagKeyword,
} from "@/components/common";

export default async function Event({ searchParams }) {
  const page = Number(
    searchParams && searchParams.page ? searchParams.page : 1
  );
  const tag_id = Number(
    searchParams && searchParams.tag_id ? searchParams.tag_id : ""
  );
  const tag_category_id = Number(
    searchParams && searchParams.tag_category_id
      ? searchParams.tag_category_id
      : ""
  );
  const search = searchParams && searchParams.search ? searchParams.search : "";
  const contentDirectory = getLabels();

  let content;
  if (search) {
    content = contentDirectory.search;
  } else if (tag_id) {
    content = contentDirectory.tag_id[tag_category_id];
  } else {
    content = contentDirectory.article;
  }

  const { list, pageInfo } = await getContentList("ALL", page, tag_id, search);
  console.log("SearchParams");
  console.log(searchParams);  

  return (
    <div className="l-container">
      <Breadcrumb content={content} />
      <PageTitle content={content} />
      <div className="l-container--col-2 l-container--contents">
        <div className="l-container--col-2__main">
          <section className="c-article__list">
            <h2 className="c-heading--lv2 u-mb-50">
              {content.text}
              <span>記事一覧</span>
            </h2>
            <CardList data={list} />
            <Pager page={page} pageInfo={pageInfo} />
          </section>
        </div>
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
