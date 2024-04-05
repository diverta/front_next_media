export default async function deleteFavorite(module_id) {
  const params = {
    module_id,
  };

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/rcms-api/1/favorite/delete`,
    {
      method: 'POST',
      body: JSON.stringify(params),
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    },
  );
  
  await res.json();
  if (res.ok) {
    return res;
  }

  return null;
}
