export async function getContentList(contentCategory, pageID = 1, tag_id="", search="") {
    const categoryMap = {
      FOOD: 1,
      SHOPPING: 15,
      SIGHTSEEING: 16,
      EVENT: 18,
      CULTURE: 19,
    };
  
    const categoryID = categoryMap[contentCategory] || '';
    var url = `${process.env.NEXT_PUBLIC_BASE_URL}/rcms-api/1/content/list?pageID=${pageID}&contents_type=${categoryID}&tag_id=${tag_id}`;
    if(search) url+=`&filter=keyword%20contains%20${search}`;
    console.log(url);
    const res = await fetch(url , { cache: "no-store" })
    const data = await res.json();
    return data;
  }

export async function getCategoryList() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/rcms-api/1/category/list`, { cache: "no-store" })
    const data = await res.json();
    return data.list;
}

export async function getDetails(id) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/rcms-api/1/content/details/${id}`, { cache: "no-store" });
    const data = await res.json();
    return data.details;
  }

  export async function getFeatureList() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/rcms-api/1/pickup/list`, { cache: "no-store" })
    const data = await res.json();
    return data.list;
}

export async function getFeatureDetails(id) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/rcms-api/1/pickup/details/${id}`, { cache: "no-store" });
  const data = await res.json();
  return data.details;
}

export async function getTagArea() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/rcms-api/1/tag/area`, { cache: "no-store" });
  const data = await res.json();
  return data.list;
}

export async function getTagKeyword() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/rcms-api/1/tag/keyword`, { cache: "no-store" });
  const data = await res.json();
  return data.list;
}



