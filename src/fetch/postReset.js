export default async function postReset(token, temp_pwd, login_pwd) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/rcms-api/1/reminder`,
    {
      method: 'POST',
      body: JSON.stringify({
        token,
        temp_pwd,
        login_pwd,
      }),
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    },
  );
  return await res.json().then((d) => d.messages);
}
