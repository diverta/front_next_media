export default async function postLogin(email, password) {
  const credentials = {
    email,
    password,
  };

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/rcms-api/1/login`,
    {
      method: 'POST',
      body: JSON.stringify(credentials),
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    },
  );
  return await res.json();
}
