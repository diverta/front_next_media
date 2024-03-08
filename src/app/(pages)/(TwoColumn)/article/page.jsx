import Pager from "@/components/common/Pager"
import { getContentList } from "@/components/common/fetchData"
import CardList from "@/components/ui/CardList"
import Feature from "@/components/section/feature/Feature"
import { getLabels } from "@/components/common/fetchData"
import Banner from "@/components/common/Banner"
import Breadcrumb from "@/components/common/Breadcrumb"
import PageTitle from "@/components/common/PageTitle"
import TagArea from "@/components/common/TagArea"
import TagKeyword from "@/components/common/TagKeyword"

export default async function Event({ searchParams }) {
  const page = Number(searchParams && searchParams.page ? searchParams.page : 1)
  const tag_id = Number(
    searchParams && searchParams.tag_id ? searchParams.tag_id : "",
  )
  const tag_category_id = Number(
    searchParams && searchParams.tag_category_id
      ? searchParams.tag_category_id
      : "",
  )
  const search =
    searchParams && searchParams.search
      ? `%22${searchParams.search.replace(/\s/g, "%20")}%22`
      : ""
  const topic = searchParams && searchParams.topic ? searchParams.topic : ""
  const contentDirectory = getLabels()
  const { list, pageInfo } = await getContentList(topic, page, tag_id, search)

  let content

  if (topic) {
    content = list
  } else if (search) {
    content = contentDirectory.search
  } else if (tag_id) {
    content = contentDirectory.tag_id[tag_category_id]
  } else {
    content = contentDirectory.article
  }

  return (
    <div className="l-container">
      <Breadcrumb paths={[{ label: content.text }]} />
      <PageTitle content={content} />
      <div className="l-container--col-2 l-container--contents">
        <div className="l-container--col-2__main">
          <section className="c-article__list">
            <div className="c-heading__wrapper">
              <h2 className="c-heading--lv2 u-display-flex-grow-1">
                {content.text}
                <span>記事一覧</span>
              </h2>
              <div className="u-display-flex-shrink-0 u-text-align-right">
                <a href="/article" className="c-button">
                  View All
                </a>
              </div>
            </div>
            <CardList data={list} />
            <Pager
              page={page}
              pageInfo={pageInfo}
              searchParams={searchParams}
            />
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
  )
}
