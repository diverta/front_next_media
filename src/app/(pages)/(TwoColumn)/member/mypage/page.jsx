"use client"
import { useCallback, useRef } from "react"
import { useUser } from "@/components/common/userContext"
import { logout } from "@/components/common/fetchData"
import { useRouter } from "next/navigation"
import {
  getMyFavoriteList,
  getLimitedContent,
} from "@/components/common/fetchData"
import CardList from "@/components/ui/CardList"
import { useState, useEffect } from "react"
import Pager from "@/components/common/Pager"
import { getLabels } from "@/components/common/fetchData"
import Breadcrumb from "@/components/common/Breadcrumb"
import PageTitle from "@/components/common/PageTitle"
import Menu from "@/components/common/Menu"
import Link from "next/link"
import Image from "next/image"

export default function Mypage() {
  const { user, storeUser } = useUser()
  const router = useRouter()
  const [myFavourites, setMyFavourites] = useState([])
  const [myFavouritesPageInfo, setMyFavouritesPageInfo] = useState([])
  const [limitedContent, setLimitedContent] = useState([])
  const contentDirectory = getLabels()
  const content = contentDirectory.mypage

  const favoriteList = useCallback(async () => {
    try {
      const favorites = await getMyFavoriteList()
      setMyFavourites(favorites.list)
      setMyFavouritesPageInfo(favorites.pageInfo)
    } catch (error) {
      console.error("Error fetching favorite list:", error)
    }
  }, [])

  useEffect(() => {
    favoriteList()
  }, [favoriteList])

  useEffect(() => {
    const fetchMemberOnlyList = async () => {
      try {
        const limitedContent = await getLimitedContent()
        setLimitedContent(limitedContent)
        console.log(limitedContent)
      } catch (error) {
        console.error("Error fetching member-only list:", error)
      }
    }

    fetchMemberOnlyList() // Fetch member-only list initially
  }, [])

  return (
    <div className="l-container">
      <Breadcrumb paths={[{ label: content.text }]} />
      <PageTitle content={content} />
      <div className="l-container--col-2 l-container--contents">
        <div className="l-container--col-2__main">
          <div>
            {/* Member only content */}
            <section className="c-box">
              <div className="c-heading--box__outer -oneLine">
                <h2 className="c-heading--box">今月の会員限定記事</h2>
              </div>
              <ul className="c-card-list c-card-list--col-2">
                {limitedContent &&
                  limitedContent.map((item, index) => (
                    <li className="c-card__item" key={index}>
                      <Link
                        href={`limited/${item.topics_id}`}
                        className="c-card"
                      >
                        <div className="c-card__image">
                          <Image
                            alt={item.bannerImage.desc || "dummy"}
                            src={item.bannerImage.url}
                            fill
                          />
                        </div>
                        <div className="c-card__info">
                          <h3 className="c-card__heading">{item.subject}</h3>
                          <p className="c-card__text">{item.introduction}</p>
                          <div className="c-card__bottom">
                            <p className="c-card__area">
                              <svg className="c-map__icon c-svg">
                                <use href="../svg/icon.svg#icon-map" />
                              </svg>
                              {item.area}
                            </p>
                            <p className="c-card__category">
                              {item.contents_type_nm}
                            </p>
                          </div>
                        </div>
                      </Link>
                    </li>
                  ))}
              </ul>
            </section>
            <section className="c-favoriteList l-container--contents">
              <h2 className="c-heading--lv1">お気に入り記事</h2>
              <p className="c-heading--sub">Favorite articles</p>
              <div className="u-mt-40">
                <CardList data={myFavourites} />
                {/* <Pager pageInfo={myFavouritesPageInfo} /> */}
              </div>
            </section>
          </div>
        </div>
        <div className="l-container--col-2__side">
          <Menu />
        </div>
      </div>
    </div>
  )
}
