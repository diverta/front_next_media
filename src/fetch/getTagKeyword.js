export default async function getTagKeyword() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/rcms-api/1/tag/keyword`,
  );
  const data = await res.json();
  return data.list;
}
