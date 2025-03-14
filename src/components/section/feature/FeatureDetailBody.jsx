'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import getFeatureDetails from '@/fetch/getFeatureDetails';
import getDetails from '@/fetch/getDetails';

const FeatureDetailBody = ({ params }) => {
  const [data, setData] = useState([]);
  const [details, setDetails] = useState([]);

  useEffect(() => {
    const fetchList = async () => {
      try {
        const features = await getFeatureDetails(params.id);
        setData(features);

        const contentsPromises = features.relatedContents
          .map((item) => item.module_id)
          .filter((id) => id)
          .map(getDetails);

        const details = await Promise.all(contentsPromises);
        setDetails(details);
      } catch (error) {
        console.error('Error fetching list information', error);
      }
    };

    fetchList();
  }, [params]);

  return (
    <article>
      <h2 className='c-heading--lv2'>{data.subject}</h2>
      <div className='c-text u-white-spcace-pre-wrap'>{data.introduction}</div>
      <ul className='c-media-list l-container--contents u-pb-0'>
        {details.map((details, index) => (
          <li key={index} className='c-media__item'>
            <Link
              href={`../../article/${details.topics_id}`}
              className='c-media'
            >
              <div className='c-media__image'>
                <Image alt='dummy image' src={details.image.url} fill />
              </div>
              <div>
                <h3 className='c-media__heading'>{details.subject}</h3>
                <div className='u-white-spcace-pre-wrap u-mb-20'>
                  {details.introduction}
                </div>
                <div className='c-card__bottom'>
                  <div className='c-tag__outer'>
                    <svg className='c-tag__icon c-svg'>
                      <use href='/svg/icon.svg#icon-tag' />
                    </svg>
                    <ul className='c-tag__list'>
                      {details.tags.map((tag, tag_index) => (
                        <li key={tag_index} className='c-tag__item'>
                          #{tag.tag_nm}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className='c-media__bottom'>
                  <p className='c-media__area'>
                    <svg className='c-map__icon c-svg'>
                      <use href='/svg/icon.svg#icon-map' />
                    </svg>
                    {details.tags.map((tag, tag_index) =>
                      tag.tag_category_id === 5 ? (
                        <span key={tag_index} className='c-tag-card__item'>
                          {tag.tag_nm}
                        </span>
                      ) : null,
                    )}
                  </p>
                  <p className='c-media__category'>
                    {details.contents_type_nm}
                  </p>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </article>
  );
};

export default FeatureDetailBody;
