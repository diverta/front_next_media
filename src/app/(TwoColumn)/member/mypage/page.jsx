"use client";

import { getMemberInfo } from "@/components/common/fetchData";
import { useCallback, useRef } from "react";
import { useUser } from "@/components/common/userContext";
import { logout } from "@/components/common/fetchData";
import { useRouter } from "next/navigation";
import { getMyFavoriteList } from "@/components/common/fetchData";
import CardList from "@/components/ui/CardList";
import { useState, useEffect } from "react";
import Pager from "@/components/common/Pager";

export default function Mypage() {
  const { user, storeUser } = useUser();
  const router = useRouter();
  const [myFavourites, setMyFavourites] = useState([]);
  const [myFavouritesPageInfo, setMyFavouritesPageInfo] = useState([]);
  console.log(user);

  const handleLogout = async (event) => {
    event.preventDefault();
    const user = await logout();
    console.log(user);
    storeUser(null);

    if (user == null) {
      // window.location.href = "/"
      router.push("/");
    }
  };

  const favoriteList = useCallback(async () => {
    try {
      const favorites = await getMyFavoriteList();
      setMyFavourites(favorites.list);
      setMyFavouritesPageInfo(favorites.pageInfo);
      console.log("Bhai", favorites);
      console.log("Bhairr", myFavouritesPageInfo);
      
    } catch (error) {
      console.error("Error fetching favorite list:", error);
    }
  }, []);

  useEffect(() => {
    favoriteList();
  }, [favoriteList]);

  return (
    <div>
      {user && user.name1 && <p>Hello {user.name1}</p>}
      <button
        type="button"
        onClick={handleLogout}
        className="c-button--primary u-width-100"
      >
        Logout
      </button>
      <section className="c-favoriteList l-container--contents">
        <h2 className="c-heading--lv1">お気に入り記事</h2>
        <p className="c-heading--sub">Favorite articles</p>
        <div className="u-mt-40">
          <CardList data={myFavourites} />
          {/* <Pager pageInfo={myFavouritesPageInfo} /> */}
        </div>
      </section>
    </div>
  );
}
