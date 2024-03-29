export default async function getLimitedContentDetails(slug) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/rcms-api/1/limited-content/details/${slug}`,
    {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    },
  );
  const data = await res.json();
  return data.details;
}
