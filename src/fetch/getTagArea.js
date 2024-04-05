export default async function getTagArea() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/rcms-api/1/tag/area`,
  );
  const data = await res.json();
  return data.list;
}
