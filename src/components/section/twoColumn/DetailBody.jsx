'use client';

import Image from "next/image";
import { useState, useCallback, useEffect } from "react";
import { postFavorite, deleteFavorite, getDetails } from "@/components/common/fetchData";
import { useUser } from "@/components/common/userContext";

const DetailBody = ({ data, params }) => {
  const { user } = useUser();
  const [data1, setData] = useState(data);
  const [likesCount, setLikesCount] = useState(data.favorite_cnt);
  const [isLiked, setIsLiked] = useState(data1.my_favorite_flg);

  const updateDataList = useCallback(async () => {
    try {
      const data2 = await getDetails(params.id);
      setData(data2);
      setIsLiked(data2.my_favorite_flg);

    } catch (error) {
      console.error("Error fetching favorite list:", error);
    }
  }, [params.id, data1.my_favorite_flg]);
  

  const handleLikeClick = async () => {
    try {
      if(!isLiked){
        const response = await postFavorite(data.topics_id);
        if(response.ok){
          setIsLiked(true);
          data.favorite_cnt = data.favorite_cnt + 1;
          setLikesCount(data.favorite_cnt);
        }
      }
      else{
        const response = await deleteFavorite(data.topics_id);
        if(response.ok){
          setIsLiked(false);
          data.favorite_cnt = data.favorite_cnt - 1;
          setLikesCount(data.favorite_cnt);
        }
      }
      // updateDataList();
    } catch (error) {
      // Handle the error
      console.error('Error updating likes:', error);
    }
  };

  useEffect(() => {
    updateDataList();
  }, [updateDataList]);
  
  return (
        <article className="c-article__detail">
          <header>
            <figure className="c-article__detail__mainImage">
              <Image
                alt="dummy main image"
                src={data.image.url}
                width="1200"
                height="400"
              />
            </figure>
            <time className="c-article__detail__date">{data.ymd}</time>
            <h1 className="c-heading--lv1">{data.subject}</h1>
            <p className="c-favorite">
            <button type="button" onClick={user ? handleLikeClick : null} disabled={!user}>
            <svg className={`c-svg c-favorite__icon ${isLiked ? '-active' : ''}`}>
                  <use xlinkHref="../svg/icon.svg#icon-heart" />
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
            <div className="c-tag">
              <svg className="c-tag__icon c-svg">
                <use xlinkHref="/svg/icon.svg#icon-tag" />
              </svg>
              <ul className="c-tag__list">
                {data.tags.map((tag, index) => (
                  <li className="c-tag__item" key={index}>
                    <a href="/mock/" className="c-tag__link">
                      {tag.tag_nm}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </header>
          <div className="c-article__detail__contents">
          <div className="c-article__detail__intro">
            <p className="c-article__detail__intro__text">{data.introduction}</p>
          </div>
          {data.contentItems.map((item, index) => (
            <div key={index} className="c-article__detail__block">
              <h2>{item.header}</h2>
              <div
                className="c-article__detail__free"
                dangerouslySetInnerHTML={{ __html: item.body }}
              />
            </div>
          ))}
        </div>
        </article>
  );
};

export default DetailBody;
