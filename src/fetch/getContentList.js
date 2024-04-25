import { category } from '@/constants/config';

export default async function getContentList(params) {
  const { topic = null, page = 1, tag_id = null, search = '' } = params || {};

  const url = new URL(
    `${process.env.NEXT_PUBLIC_BASE_URL}/rcms-api/1/content/list`,
  );

  url.searchParams.append('pageID', page);
  const categoryID = category[topic] || '';
  categoryID && url.searchParams.append('contents_type', categoryID);
  tag_id && url.searchParams.append('tag_id[]', tag_id);
  search && url.searchParams.append('filter', `keyword contains ${search}`);

  const res = await fetch(url);
  return await res.json();
}
