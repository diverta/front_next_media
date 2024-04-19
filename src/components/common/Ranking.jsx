'use client';

import { useState, useEffect } from 'react';
import getRanking from '@/fetch/getRanking';
import Link from 'next/link';
import Image from 'next/image';

export default function Ranking() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchList = async () => {
      try {
        const fetchedlist = await getRanking();
        setData(fetchedlist);
      } catch (error) {
        console.error('Error fetching list information', error);
      }
    };

    fetchList();
  }, []);

  return (
    <section className='c-box l-container--contents'>
      <div className='c-heading--box__outer'>
        <h2 className='c-heading--box -en'>RANKING</h2>
        <p className='c-heading--boxSub'>お気に入りランキング</p>
      </div>
      <ul className='c-card-list c-card-list--col-2'>
        {data &&
          data.map((item, index) => (
            <li className='c-card__item' key={index}>
              <Link href={`/article/${item.topics_id}`} className='c-card'>
                <span className='c-card__image__badge02'>{index + 1}</span>
                <div className='c-card__image'>
                  <Image
                    alt={item.image.desc || 'dummy'}
                    src={item.image.url}
                    fill
                  />
                </div>
                <div className='c-card__info'>
                  <h3 className='c-card__heading'>{item.subject}</h3>
                  <p className='c-card__text'>{item.introduction}</p>
                  <div className='c-card__bottom'>
                    <p className='c-card__area'>
                      <svg className='c-map__icon c-svg'>
                        <use href='../svg/icon.svg#icon-map' />
                      </svg>
                      {item.tags.map((tag, tag_index) =>
                        tag.tag_category_id === 5 ? (
                          <span key={tag_index} className='c-tag-card__item'>
                            {tag.tag_nm}
                          </span>
                        ) : null,
                      )}
                    </p>
                    <p className='c-card__category'>{item.contents_type_nm}</p>
                  </div>
                </div>
              </Link>
            </li>
          ))}
      </ul>
    </section>
  );
}
