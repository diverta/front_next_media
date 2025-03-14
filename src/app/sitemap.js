import getAllContentList from '@/fetch/getAllContentList';
import getFeatureList from '@/fetch/getFeatureList';

export default async function sitemap() {
  const items = await getAllContentList();
  const articleDetails = items.map((item) => ({
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/article/${item.topics_id}/`,
    lastModified: new Date(item.update_ymdhi),
  }));

  const features = await getFeatureList();
  const featureDetails = features.map((item) => ({
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/feature/${item.topics_id}/`,
    lastModified: new Date(item.update_ymdhi),
  }));

  return [
    {
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/privacy/`,
    },
    {
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/contact/`,
    },
    {
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/article/`,
    },
    ...articleDetails,
    ...featureDetails,
  ];
}
