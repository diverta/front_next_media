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
  const res = await fetch(url, { cache: "no-store" });
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
    { 
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      cache: "no-store",
    }
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

export async function getRanking() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/rcms-api/1/ranking`,
    { cache: "no-store" } // might need to fetch everytime due to dyanmic update of favorite_cnt
  );
  const data = await res.json();
  return data.list;
}

export async function getMyFavoriteList() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/rcms-api/1/my_favorite_list`,
    {
      method: "GET",
      // body: JSON.stringify(params),
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      cache: "no-store",
    }
  );
  const data = await res.json();
  return data;
}

export async function postFavorite(module_id) {
  const params = {
    module_id
  };

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/rcms-api/1/favorite/register`,
    {
      method: "POST",
      body: JSON.stringify(params),
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      cache: "no-store",
    }
  );

  await res.json();
  if (res.ok) {
    return res;
  }

  return null;
}

export async function deleteFavorite(module_id) {
  const params = {
    module_id
  };

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/rcms-api/1/favorite/delete`,
    {
      method: "POST",
      body: JSON.stringify(params),
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    }
  );

  await res.json();
  if (res.ok) {
    return res;
  }

  return null;
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

  if(!res.ok){
    return null;
  }

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

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/rcms-api/1/member/register`,
    {
      method: "POST",
      body: JSON.stringify(credentials),
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    }
  );

  await res.json();
  if(!res.ok){
    return null;
  }

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

export async function reminder(email) {
  const credentials = {
    email,
  };

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/rcms-api/1/reminder`,
    {
      method: "POST",
      body: JSON.stringify(credentials),
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    }
  );

  const response = await res.json();
  console.log(response);
  if(res.ok){
    return response.messages;
  }

  return null;
}

export async function reset(token, temp_pwd, login_pwd) {
  const credentials = {
    token,
    temp_pwd,
    login_pwd
  };

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/rcms-api/1/reminder`,
    {
      method: "POST",
      body: JSON.stringify(credentials),
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    }
  );

  const response = await res.json();
  console.log(response);
  
  if(res.ok){
    return response.messages;
  }

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

export async function getMemberInfo() {
  const userRef = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/rcms-api/1/member/me`,
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

export async function updateMemberInfo(name1, name2, email, login_pwd) {
  const credentials = {
    name1,
    name2,
    email,
    login_pwd,
  };
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/rcms-api/1/member/update`,
    {
      method: "POST",
      body: JSON.stringify(credentials),
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    }
  );

  const status = await res.json();
  if(status.messages){
    return true;
  }
  return null;
}

export async function deleteMember() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/rcms-api/1/member/delete`,
    {
      method: "POST",
      body: JSON.stringify({}),
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    }
  );

  const status = await res.json();
  if(status.messages){
    return true;
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
    contact: {
      text: "お問い合わせ",
      text_en: "Contact",
    },
    login: {
      text: "ログイン",
      text_en: "Login",
    },
    register: {
      text: "会員登録",
      text_en: "Register",
    },
    reminder: {
      text: "パスワード再発行",
      text_en: "Password Reset",
    },
    mypage: {
      text: "マイページ",
      text_en: "My page",
    },
    editProfile: {
      text: "会員情報",
      text_en: "Edit Profile",
    },
    deleteProfile: {
      text: "退会",
      text_en: "Unsubscribe",
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
