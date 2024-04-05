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
          data.favorite_cnt = data.favorite_cnt + 1;
          setLikesCount(data.favorite_cnt);
        }
      } else {
        const response = await deleteFavorite(data.topics_id);
        if (response.ok) {
          setIsLiked(false);
          data.favorite_cnt = data.favorite_cnt - 1;
          setLikesCount(data.favorite_cnt);
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
    <article className='c-article__detail'>
      <header>
        <figure className='c-article__detail__mainImage'>
          <Image
            alt='dummy main image'
            src={data.image.url}
            width='1200'
            height='400'
          />
        </figure>
        <time className='c-article__detail__date'>{data.ymd}</time>
        <h1 className='c-heading--lv1'>{data.subject}</h1>
        <p className='c-favorite'>
          <button
            type='button'
            onClick={user ? handleLikeClick : null}
            disabled={!user}
          >
            <svg
              className={`c-svg c-favorite__icon ${isLiked ? '-active' : ''}`}
            >
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
        </p>
        <div className='c-tag'>
          <svg className='c-tag__icon c-svg'>
            <use xlinkHref='/svg/icon.svg#icon-tag' />
          </svg>
          <ul className='c-tag__list'>
            {data.tags.map((tag, index) => (
              <li className='c-tag__item' key={index}>
                <Link href={`/article?tag_category_id=${tag.tag_category_id}&tag_id=${tag.tag_id}`} className='c-tag__link'>
                  {tag.tag_nm}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </header>
      <div className='c-article__detail__contents'>
        <div className='c-article__detail__intro'>
          <p className='c-article__detail__intro__text'>{data.introduction}</p>
        </div>
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
