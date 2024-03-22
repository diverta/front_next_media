import Menu from '@/components/common/Menu'
import Breadcrumb from '@/components/common/Breadcrumb'
import PageTitle from '@/components/common/PageTitle'
import { getLabels } from '@/components/common/fetchData'
import LimitedContentBody from '@/components/section/twoColumn/LimitedContentBody';

export async function generateStaticParams() {
  //   const items = await getLimitedContent()
  //   const paramID = items.map((item) => ({
  //     id: item.topics_id.toString(),
  //   }))
  return [{ id: '18' }, { id: '19' }]
}

export default async function limitedContent({ params }) {
  
  const contentDirectory = getLabels()
  const content = contentDirectory.limitedContent

  return (
      <div className="l-container">
        <Breadcrumb paths={[{ label: content.text }]} />
        <PageTitle content={content} />
        <div className="l-container--col-2 l-container--contents">
          <div className="l-container--col-2__main">
            <LimitedContentBody params={params}/>
          </div>
          <div className="l-container--col-2__side">
            <Menu />
          </div>
        </div>
      </div>
  )
}
