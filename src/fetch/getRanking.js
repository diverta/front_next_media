export default async function getRanking() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/rcms-api/1/ranking`,
  );
  const data = await res.json();
  return data.list;
}
