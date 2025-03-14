'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import getDetails from '@/fetch/getDetails';
import postFavorite from '@/fetch/postFavorite';
import deleteFavorite from '@/fetch/deleteFavorite';
import { useUser } from '@/contexts/user';
import Link from 'next/link';

const DetailBody = ({ data, params }) => {
  const { user } = useUser();
  const [data1, setData] = useState(data);
  const [likesCount, setLikesCount] = useState(data1.favorite_cnt);
  const [isLiked, setIsLiked] = useState(data1.my_favorite_flg);

  const handleLikeClick = async () => {
    try {
      if (!isLiked) {
        const response = await postFavorite(data.topics_id);
        if (response.ok) {
          setIsLiked(true);
          data1.favorite_cnt = data1.favorite_cnt + 1;
          setLikesCount(data1.favorite_cnt);
        }
      } else {
        const response = await deleteFavorite(data.topics_id);
        if (response.ok) {
          setIsLiked(false);
          data1.favorite_cnt = data1.favorite_cnt - 1;
          setLikesCount(data1.favorite_cnt);
        }
      }
    } catch (error) {
      console.error('Error updating likes:', error);
    }
  };

  useEffect(() => {
    const updateDataList = async () => {
      try {
        const data2 = await getDetails(params.id);
        setData(data2);
        setLikesCount(data2.favorite_cnt);
        setIsLiked(data2.my_favorite_flg);
      } catch (error) {
        console.error('Error fetching favorite list:', error);
      }
    };
    updateDataList();
  }, [params]);

  return (
    <article className='c-article__detail l-container--contents u-pt-20'>
      <figure className='c-article__detail__mainImage'>
        <Image
          alt='dummy main image'
          src={data.image.url}
          width='1240'
          height='600'
        />
      </figure>
      <header>
        <time className='c-article__detail__date u-mb-10' dateTime={data.ymd}>
          {data.ymd}
        </time>
        <h1 className='c-heading--lv1'>{data.subject}</h1>
        <div className='c-article__detail__head'>
          <div className='c-tag__outer'>
            <svg className='c-tag__icon c-svg'>
              <use xlinkHref='/svg/icon.svg#icon-tag' />
            </svg>
            <ul className='c-tag__list'>
              {data.tags.map((tag, index) => (
                <li className='c-tag__item' key={index}>
                  <Link
                    href={`/article?tag_category_id=${tag.tag_category_id}&tag_id=${tag.tag_id}`}
                    className='c-tag'
                  >
                    #{tag.tag_nm}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className='c-favorite'>
            {user ? (
              <></>
            ) : (
              <span className='c-favorite__desc'>
                ログインすると
                <br />
                お気に入りできます
              </span>
            )}
            <button
              type='button'
              onClick={user ? handleLikeClick : null}
              disabled={!user}
              className={`c-favorite__button ${isLiked ? 'is-active' : ''}`}
            >
              <svg className='c-svg c-favorite__icon'>
                <use xlinkHref='/svg/icon.svg#icon-heart' />
              </svg>
              <span>{likesCount}</span>
            </button>
            {/* <a href="#">
                  <svg className="c-favorite__icon c-svg">
                    <use xlinkHref="../svg/icon.svg#icon-heart" />
                  </svg>
                  <span>5</span>
                </a> */}
          </div>
        </div>
      </header>
      <div className='c-article__detail__contents'>
        <p className='c-article__detail__intro u-white-spcace-pre-wrap'>
          {data.introduction}
        </p>
        {data.contentItems.map((item, index) => (
          <div key={index} className='c-article__detail__block'>
            <h2>{item.header}</h2>
            <div
              className='c-article__detail__free'
              dangerouslySetInnerHTML={{ __html: item.body }}
            />
          </div>
        ))}
      </div>
    </article>
  );
};

export default DetailBody;
