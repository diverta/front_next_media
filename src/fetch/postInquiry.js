export default async function postInquiry(formData) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/rcms-api/1/inquiry/1`,
    {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: { 'Content-Type': 'application/json' },
    },
  );
  return await res.json();
}
