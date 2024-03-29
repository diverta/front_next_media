export default async function getProfile() {
  const userRef = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/rcms-api/1/profile`,
    {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    },
  );
  return await userRef.json();
}
