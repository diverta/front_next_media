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
    <section className='c-feature'>
      <h2 className='c-heading--lv2'>{data.subject}</h2>
      <div className='c-text u-white-spcace-pre-wrap'>{data.introduction}</div>
      <ul className='c-feature__list'>
        {details.map((details, index) => (
          <li key={index} className='c-feature__item'>
            <h3 className='c-heading--lv4'>{details.subject}</h3>
            <div className='c-feature__contents'>
              <figure className='c-feature__image'>
                <Image
                  alt='dummy image'
                  src={details.image.url}
                  width='400'
                  height='150'
                />
              </figure>
              <div>
                <div className='c-feature__text u-white-spcace-pre-wrap'>
                  {details.introduction}
                </div>
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
                <div className='u-display-flex u-display-flex-justify-content-end'>
                  <Link
                    href={`../../article/${details.topics_id}`}
                    className='c-button'
                  >
                    MORE
                  </Link>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default FeatureDetailBody;
