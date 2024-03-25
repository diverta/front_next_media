import Breadcrumb from '@/components/common/Breadcrumb';
import Menu from '@/components/common/Menu';
import PageTitle from '@/components/common/PageTitle';
import LimitedContentBody from '@/components/section/twoColumn/LimitedContentBody';

export async function generateStaticParams() {
  //   const items = await getLimitedContent()
  //   const paramID = items.map((item) => ({
  //     id: item.topics_id.toString(),
  //   }))
  return [{ id: '18' }, { id: '19' }]
}

export default async function Page({ params }) {
  return (
    <div className="l-container">
      <Breadcrumb paths={[{ label: "会員限定記事" }]} />
      <PageTitle
        title="会員限定記事"
        subTitle="Member Only Article"
      />
      <div className="l-container--col-2 l-container--contents">
        <div className="l-container--col-2__main">
          <LimitedContentBody params={params} />
        </div>
        <div className="l-container--col-2__side">
          <Menu />
        </div>
      </div>
    </div>
  )
}
