import DetailBody from '@/components/section/twoColumn/DetailBody'
import { getDetails, getAllContentList } from '@/components/common/fetchData'
import Banner from '@/components/common/Banner'
import Breadcrumb from '@/components/common/Breadcrumb'
import TagArea from '@/components/common/TagArea'
import TagKeyword from '@/components/common/TagKeyword'
import Feature from '@/components/section/feature/Feature'

export async function generateStaticParams() {
  const items = await getAllContentList()
  const paramID = items.map((item) => ({
    id: item.topics_id.toString(),
  }))
  console.log(paramID);
  return paramID;
}

export default async function Food({ params }) {
  const item = await getDetails(params.id);

  const content = {
    text: '記事詳細',
    text_en: 'Article details',
  };

  return (
    <div className="l-container">
      <Breadcrumb content={content} />
      <div className="l-container--col-2 c-article">
        <div className="l-container--col-2__main">
          <div>
            <DetailBody data={item} />
          </div>
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
