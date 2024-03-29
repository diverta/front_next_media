export default async function postMemberDelete() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/rcms-api/1/member/delete`,
    {
      method: 'POST',
      body: JSON.stringify({}),
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    },
  );
  return await res.json().then((d) => d.messages);
}
