import Banner from '@/components/common/Banner';
import Breadcrumb from '@/components/common/Breadcrumb';
import PageTitle from '@/components/common/PageTitle';
import TagArea from '@/components/common/TagArea';
import TagKeyword from '@/components/common/TagKeyword';
import Feature from '@/components/section/feature/Feature';
import getFeatureList from '@/fetch/getFeatureList';
import getFeatureDetails from '@/fetch/getFeatureDetails';
import FeatureDetailBody from '@/components/section/feature/FeatureDetailBody';

export async function generateStaticParams() {
  const features = await getFeatureList();
  return features.map((item) => ({
    id: item.topics_id.toString(),
  }));
}

export default async function Page({ params }) {
  const features = await getFeatureDetails(params.id);

  return (
    <div className='l-container'>
      <Breadcrumb
        paths={[{ label: features?.contents_type_ext_col_01 }]}
      />
      <PageTitle
        title={features?.contents_type_ext_col_01}
        subTitle={features?.contents_type_nm}
      />
      <div className='l-container--col-2 l-container--contents'>
        <div className='l-container--col-2__main'>
          <div>
            <FeatureDetailBody params={params} />
          </div>
        </div>
        <div className='l-container--col-2__side'>
          <Banner />
          <Feature />
          <TagArea />
          <TagKeyword />
        </div>
      </div>
    </div>
  );
}
