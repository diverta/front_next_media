import getAllContentList from '@/fetch/getAllContentList';

export default async function sitemap() {
  const items = await getAllContentList();
  const articleDetails = items.map((item) => ({
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/article/${item.topics_id}/`,
    lastModified: new Date(item.update_ymdhi),
  }));

  return [
    {
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/privacy/`,
    },
    ...articleDetails,
  ];
}
