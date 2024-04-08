export default async function postUpload(fileData) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/rcms-api/1/upload`,
    {
      method: 'POST',
      body: fileData,
    },
  );

  const status = await res.json();
  return status;
}
