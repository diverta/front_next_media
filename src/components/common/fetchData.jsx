export async function getContentList(
  contentCategory,
  pageID = 1,
  tag_id = "",
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
  if (tag_id) url += `&tag_id=${tag_id}`;
  if (search) url += `&filter=keyword%20contains%20${search}`;
  console.log(url);
  const res = await fetch(url, { cache: "no-store" });
  const data = await res.json();
  return data;
}

export async function getCategoryList() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/rcms-api/1/category/list`,
    { cache: "no-store" }
  );
  const data = await res.json();
  return data.list;
}

export async function getDetails(id) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/rcms-api/1/content/details/${id}`,
    { cache: "no-store" }
  );
  const data = await res.json();
  return data.details;
}

export async function getFeatureList() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/rcms-api/1/pickup/list`,
    { cache: "no-store" }
  );
  const data = await res.json();
  return data.list;
}

export async function getFeatureDetails(id) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/rcms-api/1/pickup/details/${id}`,
    { cache: "no-store" }
  );
  const data = await res.json();
  return data.details;
}

export async function getLimitedContent() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/rcms-api/1/limited-content`,
    { cache: "no-store" }
  );
  const data = await res.json();
  return data.list;
}

export async function getMemberInfo() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/rcms-api/1/profile`,
    { cache: "no-store" }
  );
  const data = await res.json();
  return data;
}

export async function getTagArea() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/rcms-api/1/tag/area`,
    { cache: "no-store" }
  );
  const data = await res.json();
  return data.list;
}

export async function getTagKeyword() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/rcms-api/1/tag/keyword`,
    { cache: "no-store" }
  );
  const data = await res.json();
  return data.list;
}

export async function login(email, password) {
  const credentials = {
    email,
    password,
  };

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/rcms-api/1/login`,
    {
      method: "POST",
      body: JSON.stringify(credentials),
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    }
  );

  await res.json();
  const user = await profile();

  if (res.ok && user) {
    return user;
  }

  return null;
}

export async function register(name1, name2, email, login_pwd) {
  const credentials = {
    name1,
    name2,
    email,
    login_pwd,
  };

  console.log("BHAI IDHAR", credentials);

  await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/rcms-api/1/member/register`,
    {
      method: "POST",
      body: JSON.stringify(credentials),
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    }
  );

  const user = await login(email, login_pwd);
  if (user) {
    return user;
  }
  return null;
}

export async function logout() {
  await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/rcms-api/1/logout`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  });

  return null;
}

export async function profile() {
  const userRef = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/rcms-api/1/profile`,
    {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    }
  );

  const user = await userRef.json();
  if (user) {
    return user;
  }

  return null;
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
    login: {
      text: "ログイン",
      text_en: "Login",
    },
    register: {
      text: "会員登録",
      text_en: "Register",
    },
    mypage: {
      text: "マイページ",
      text_en: "My page",
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
