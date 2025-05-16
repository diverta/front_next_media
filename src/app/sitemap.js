import getAllContentList from '@/fetch/getAllContentList';
import getFeatureList from '@/fetch/getFeatureList';

export default async function sitemap() {
  const items = await getAllContentList();
  const articleDetails = items.map((item) => ({
    url: `${process.env.NEXT_PUBLIC_FRONT_URL}/article/${item.topics_id}/`,
    lastModified: new Date(item.update_ymdhi),
  }));

  const features = await getFeatureList();
  const featureDetails = features.map((item) => ({
    url: `${process.env.NEXT_PUBLIC_FRONT_URL}/feature/${item.topics_id}/`,
    lastModified: new Date(item.update_ymdhi),
  }));

  return [
    {
      url: `${process.env.NEXT_PUBLIC_FRONT_URL}`,
    },
    {
      url: `${process.env.NEXT_PUBLIC_FRONT_URL}/privacy/`,
    },
    {
      url: `${process.env.NEXT_PUBLIC_FRONT_URL}/contact/`,
    },
    {
      url: `${process.env.NEXT_PUBLIC_FRONT_URL}/article/`,
    },
    ...articleDetails,
    ...featureDetails,
  ];
}

export const dynamic = 'force-static';
