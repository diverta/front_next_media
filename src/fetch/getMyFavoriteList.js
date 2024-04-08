export default async function getMyFavoriteList() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/rcms-api/1/my_favorite_list`,
    {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    },
  );
  const data = await res.json();
  return data;
}
