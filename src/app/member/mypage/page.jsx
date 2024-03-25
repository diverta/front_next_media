'use client'

import Breadcrumb from '@/components/common/Breadcrumb'
import Menu from '@/components/common/Menu'
import PageTitle from '@/components/common/PageTitle'
import getMyFavoriteList from '@/fetch/getMyFavoriteList'
import getLimitedContent from '@/fetch/getLimitedContent'
import CardList from '@/components/ui/CardList'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function Mypage() {
  const [myFavourites, setMyFavourites] = useState([])
  const [setMyFavouritesPageInfo] = useState([])
  const [limitedContent, setLimitedContent] = useState([])

  useEffect(() => {
    const favoriteList = async () => {
      try {
        const favorites = await getMyFavoriteList()
        setMyFavourites(favorites.list)
        setMyFavouritesPageInfo(favorites.pageInfo)
      } catch (error) {
        console.error('Error fetching favorite list:', error)
      }
    };
    favoriteList()
  }, [myFavourites, setMyFavouritesPageInfo])

  useEffect(() => {
    const fetchMemberOnlyList = async () => {
      try {
        const limitedContent = await getLimitedContent()
        setLimitedContent(limitedContent)
      } catch (error) {
        console.error('Error fetching member-only list:', error)
      }
    }

    fetchMemberOnlyList() // Fetch member-only list initially
  }, [])

  return (
    <div className="l-container">
      <Breadcrumb paths={[{ label: "マイページ" }]} />
      <PageTitle
        title="マイページ"
        subTitle="My page"
      />
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
                            alt={item.bannerImage.desc || 'dummy'}
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
