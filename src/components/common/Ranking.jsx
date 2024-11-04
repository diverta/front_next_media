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
    <section className='u-bg-white'>
      <div className='l-container--large l-container--contents'>
        <div className='c-heading--border-horizontal u-display-flex-wrap'>
          <h2 className='c-heading--lv3 u-mb-0'>ランキング</h2>
        </div>
        <ul className='c-media-list c-media-list--col-2'>
          {data &&
            data.map((item, index) => (
              <li className='c-media__item' key={index}>
                <Link href={`/article/${item.topics_id}`} className='c-media'>
                  <span className='c-media__image__badge'>{index + 1}</span>
                  <div className='c-media__image'>
                    <Image
                      alt={item.image.desc || 'dummy'}
                      src={item.image.url}
                      fill
                    />
                  </div>
                  <div>
                    <h3 className='c-media__heading'>{item.subject}</h3>
                    <p className='c-media__text'>{item.introduction}</p>
                    <div className='c-media__bottom'>
                      <p className='c-media__area'>
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
                      <p className='c-media__category'>
                        {item.contents_type_nm}
                      </p>
                    </div>
                  </div>
                </Link>
              </li>
            ))}
        </ul>
      </div>
    </section>
  );
}
