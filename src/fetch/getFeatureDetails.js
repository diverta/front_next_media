export default async function getFeatureDetails(id) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/rcms-api/1/pickup/details/${id}`,
  );
  const data = await res.json();
  return data.details;
}
