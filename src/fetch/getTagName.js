export default async function getTagName(tagCategoryID, tagID) {
  const endpoint = tagCategoryID == 5 ? 'area' : 'keyword';
  const url = new URL(
    `${process.env.NEXT_PUBLIC_BASE_URL}/rcms-api/1/tag/${endpoint}`,
  );
  url.searchParams.append('id', tagID);
  const res = await fetch(url);

  const data = await res.json();
  return data.list;
}
