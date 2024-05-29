export default async function getAllContentList(page = 1) {
  const url = new URL(
    `${process.env.NEXT_PUBLIC_BASE_URL}/rcms-api/1/content/all`,
  );
  url.searchParams.append('pageID', page);
  const res = await fetch(url);
  return await res.json();
}
