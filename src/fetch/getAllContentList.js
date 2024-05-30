export default async function getAllContentList(page = 1) {
  const url = new URL(
    `${process.env.NEXT_PUBLIC_BASE_URL}/rcms-api/1/content/all`,
  );
  url.searchParams.append('pageID', page);

  const { list, pageInfo } = await fetch(url).then(response => response.json());
  const hasMorePage = pageInfo.pageNo < pageInfo.totalPageCnt;
  
  return [...list,...(hasMorePage ? await getAllContentList(page + 1) : [])];
}