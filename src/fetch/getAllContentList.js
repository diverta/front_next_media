export default async function getAllContentList() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/rcms-api/1/content/all`,
  );
  const data = await res.json();
  return data.list;
}
