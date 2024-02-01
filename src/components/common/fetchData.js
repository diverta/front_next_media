export async function getContentList(
  contentCategory,
  pageID = 1,
  tag_id = null,
  search = ""
) {
  const categoryMap = {
    food: 1,
    shopping: 15,
    sightseeing: 16,
    event: 18,
    culture: 19,
  };

  const categoryID = categoryMap[contentCategory] || "";
  var url = `${process.env.NEXT_PUBLIC_BASE_URL}/rcms-api/1/content/list?pageID=${pageID}`;
  if (contentCategory) url += `&contents_type=${categoryID}`;
  if (tag_id) url += `&tag_id[]=${tag_id}`;
  if (search) url += `&filter=keyword%20contains%20${search}`;
  console.log(url);
  const res = await fetch(url,{ cache: "no-store" });
  const data = await res.json();
  return data;
}

export async function getAllContentList() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/rcms-api/1/content/all`,{ cache: "no-store" }
  );
  const data = await res.json();
  return data.list;
}

export async function getDetails(id) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/rcms-api/1/content/details/${id}`,{ cache: "no-store" }
  );
  const data = await res.json();
  return data.details;
}

export async function getFeatureList() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/rcms-api/1/pickup/list`,{ cache: "no-store" }
  );
  const data = await res.json();
  return data.list;
}

export async function getFeatureDetails(id) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/rcms-api/1/pickup/details/${id}`,{ cache: "no-store" }
  );
  const data = await res.json();
  return data.details;
}

export async function getTagArea() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/rcms-api/1/tag/area`,{ cache: "no-store" }
  );
  const data = await res.json();
  return data.list;
}

export async function getTagKeyword() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/rcms-api/1/tag/keyword`,{ cache: "no-store" }
  );
  const data = await res.json();
  return data.list;
}

export async function getRanking() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/rcms-api/1/ranking`,
    { cache: "no-store" } // might need to fetch everytime due to dyanmic update of favorite_cnt
  );
  const data = await res.json();
  return data.list;
}

export function getLabels() {
  const contentDirectory = {
    article: {
      text: "記事",
      text_en: "ARTICLE",
    },
    search: {
      text: "サーチ",
      text_en: "SEARCH",
    },
    tag_id: {
      5: {
        text: "タグエリア",
        text_en: "TAG AREA",
      },
      6: {
        text: "タグキーワード",
        text_en: "TAG KEYWORD",
      },
    },
  };

  return contentDirectory;
}
