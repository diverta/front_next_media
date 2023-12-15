export async function getContentList(contentCategory, pageID = 1) {
    const categoryMap = {
      FOOD: 1,
      SHOPPING: 15,
      SIGHTSEEING: 16,
      EVENT: 18,
      CULTURE: 19,
    };
  
    const categoryID = categoryMap[contentCategory] || '';
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/rcms-api/1/content/list?pageID=${pageID}&contents_type=${categoryID}`, { cache: "no-store" })
    const data = await res.json();
    return data.list;
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



