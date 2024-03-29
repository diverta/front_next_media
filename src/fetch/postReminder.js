export default async function postReminder(email) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/rcms-api/1/reminder`,
    {
      method: 'POST',
      body: JSON.stringify({
        email,
      }),
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    },
  );
  return await res.json().then((d) => d.messages);
}
