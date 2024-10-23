import Banner from '@/components/common/Banner';
import Breadcrumb from '@/components/common/Breadcrumb';
import PageTitle from '@/components/common/PageTitle';
import TagArea from '@/components/common/TagArea';
import TagKeyword from '@/components/common/TagKeyword';
import Feature from '@/components/section/feature/Feature';
import getFeatureList from '@/fetch/getFeatureList';
import getFeatureDetails from '@/fetch/getFeatureDetails';
import FeatureDetailBody from '@/components/section/feature/FeatureDetailBody';
import { METADATA } from '@/constants/config';

export const metadata = {
  title: METADATA.FEATURE,
};

export async function generateStaticParams() {
  const features = await getFeatureList();
  return features.map((item) => ({
    id: item.topics_id.toString(),
  }));
}

export default async function Page({ params }) {
  const features = await getFeatureDetails(params.id);

  return (
    <main className='l-container'>
      <Breadcrumb paths={[{ label: features?.contents_type_ext_col_01 }]} />

      <PageTitle title='特集' subTitle='Feature' />
      <div className='u-bg-white'>
        <div className='l-container--large l-container--contents'>
          <FeatureDetailBody params={params} />
        </div>
      </div>
      <div className='l-container--large'>
        <Feature />
        <TagArea />
        <TagKeyword />
        <Banner />
      </div>
    </main>
  );
}
