export default async function getArticlePreview(preview_token) {
  const url = new URL(
    `${process.env.NEXT_PUBLIC_BASE_URL}/rcms-api/1/content/preview`,
  );
  url.searchParams.append('preview_token', preview_token);

  const preview = await fetch(url.toString(), {
    method: 'GET',
    credentials: 'include',
  });

  const data = await preview.json();
  return data.details;
}
