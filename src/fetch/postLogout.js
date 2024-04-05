export default async function postLogout() {
  await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/rcms-api/1/logout`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
  });
}
