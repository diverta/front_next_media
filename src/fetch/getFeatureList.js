export default async function getFeatureList() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/rcms-api/1/pickup/list`,
  );
  const data = await res.json();
  return data.list;
}
