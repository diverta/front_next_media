import Banner from '@/components/common/Banner';
import Breadcrumb from '@/components/common/Breadcrumb';
import PageTitle from '@/components/common/PageTitle';
import TagArea from '@/components/common/TagArea';
import TagKeyword from '@/components/common/TagKeyword';
import Feature from '@/components/section/feature/Feature';
import getDetails from '@/fetch/getDetails';
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

  const fetchDetailsForItems = async () => {
    const contentsPromises = features.relatedContents
      .map((item) => item.module_id)
      .filter((id) => id)
      .map(getDetails);
    return await Promise.all(contentsPromises);
  };
  const details = await fetchDetailsForItems();

  return (
    <div className='l-container'>
      <Breadcrumb
        paths={[{ label: features?.[0]?.contents_type_ext_col_01 }]}
      />
      <PageTitle
        title={features?.[0]?.contents_type_ext_col_01}
        subTitle={features?.[0]?.contents_type_nm}
      />
      <div className='l-container--col-2 l-container--contents'>
        <div className='l-container--col-2__main'>
          <div>
            <FeatureDetailBody data={features} details={details} />
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
