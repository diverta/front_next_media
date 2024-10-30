import DetailBody from '@/components/section/twoColumn/DetailBody';
import getAllContentList from '@/fetch/getAllContentList';
import getDetails from '@/fetch/getDetails';
import Banner from '@/components/common/Banner';
import Breadcrumb from '@/components/common/Breadcrumb';
import TagArea from '@/components/common/TagArea';
import TagKeyword from '@/components/common/TagKeyword';
import Feature from '@/components/section/feature/Feature';

export async function generateMetadata({ params }) {
  const item = await getDetails(params.id);
  return {
    title: item.subject,
    description: item.introduction,
    openGraph: {
      images: [
        {
          url: item.image.url,
        },
      ],
    },
  };
}

export async function generateStaticParams() {
  const items = await getAllContentList();
  const paramID = items.map((item) => ({
    id: item.topics_id.toString(),
  }));
  return paramID;
}

export default async function Page({ params }) {
  const item = await getDetails(params.id);

  const paths = [
    {
      href: `/article?topic=${item.contents_type_nm.toLowerCase()}`,
      label: item.contents_type_ext_col_01,
    },
    { label: '記事詳細' },
  ];

  return (
    <div className='l-container'>
      <div className='u-bg-white'>
        <Breadcrumb paths={paths} />
        <div className='l-container--large c-article'>
          <main>
            <DetailBody data={item} params={params} />
          </main>
        </div>
      </div>
      <div className='l-container--large'>
        <Feature />
        <TagArea />
        <TagKeyword />
        <Banner />
      </div>
    </div>
  );
}
