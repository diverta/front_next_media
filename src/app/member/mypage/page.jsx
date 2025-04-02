'use client';

import Breadcrumb from '@/components/common/Breadcrumb';
import Menu from '@/components/common/Menu';
import PageTitle from '@/components/common/PageTitle';
import getMyFavoriteList from '@/fetch/getMyFavoriteList';
import getLimitedContent from '@/fetch/getLimitedContent';
import CardList from '@/components/ui/CardList';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Metadata from '@/components/common/Metadata';
import { METADATA } from '@/constants/config';
import { useRouter } from 'next/navigation';

export default function Page() {
  const [myFavorites, setMyFavorites] = useState([]);
  // const [setMyFavoritesPageInfo] = useState([]);
  const [limitedContent, setLimitedContent] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const favoriteList = async () => {
      try {
        const favorites = await getMyFavoriteList();
        if(favorites.errors.length){
          router.push('/login');
        }
        else {
          setMyFavorites(favorites.list);
          // setMyFavoritesPageInfo(favorites.pageInfo);
        }
      } catch (error) {
        console.error('Error fetching favorite list:', error);
      }
    };
    favoriteList();
  }, []);

  useEffect(() => {
    const fetchMemberOnlyList = async () => {
      try {
        const limitedContent = await getLimitedContent();
        setLimitedContent(limitedContent);
      } catch (error) {
        console.error('Error fetching member-only list:', error);
      }
    };

    fetchMemberOnlyList(); // Fetch member-only list initially
  }, []);

  return (
    <main className='l-container'>
      <Metadata title={METADATA.MEMBER_MYPAGE} />
      <Breadcrumb paths={[{ label: 'マイページ' }]} />
      <PageTitle title='マイページ' subTitle='My page' />
      <div className='l-container--col-2 l-container--contents'>
        <div className='l-container--col-2__main'>
          {/* Member only content */}
          <section>
            <div className='c-heading--border-horizontal'>
              <h2 className='c-heading--lv3 u-mb-0'>今月の会員限定記事</h2>
            </div>
            <ul className='c-media-list c-media-list--col-2'>
              {limitedContent &&
                limitedContent.map((item, index) => (
                  <li className='c-media__item' key={index}>
                    <Link
                      href={`/member/limited/${item.topics_id}`}
                      className='c-media'
                    >
                      <div className='c-media__image'>
                        <Image
                          alt={item.bannerImage.desc || 'dummy'}
                          src={item.bannerImage.url}
                          fill
                        />
                      </div>
                      <div>
                        <h3 className='c-media__heading'>{item.subject}</h3>
                        <p className='c-media__text'>{item.introduction}</p>
                        <div className='c-media__bottom'>
                          <p className='c-media__area'>
                            <svg className='c-map__icon c-svg'>
                              <use href='/svg/icon.svg#icon-map' />
                            </svg>
                            {item.area}
                          </p>
                          <p className='c-media__category'>
                            {item.contents_type_nm}
                          </p>
                        </div>
                      </div>
                    </Link>
                  </li>
                ))}
            </ul>
          </section>
          <section className='c-favoriteList l-container--contents'>
            <h2 className='c-heading--lv1'>お気に入り記事</h2>
            <p className='c-heading--sub'>Favorite articles</p>
            <div className='u-mt-40'>
              {myFavorites.length === 0 ? (
                <p>お気に入り記事はありません。</p>
              ) : (
                <CardList data={myFavorites} />
              )}
            </div>
          </section>
        </div>
        <div className='l-container--col-2__side'>
          <Menu />
        </div>
      </div>
    </main>
  );
}
