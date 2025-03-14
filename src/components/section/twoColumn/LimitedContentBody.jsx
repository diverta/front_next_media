'use client';

import getLimitedContentDetails from '@/fetch/getLimitedContentDetails';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Metadata from '@/components/common/Metadata';
import { METADATA } from '@/constants/config';

const LimitedContentBody = () => {
  const [data, setData] = useState([]);
  const [couponLink, setCouponLink] = useState([]);
  const pathname = usePathname();

  useEffect(() => {
    const segments = pathname.split('/');
    segments.pop();
    const slug = segments.pop();

    if (!slug) {
      throw new Error('Invalid slug. Please check the URL.');
    }

    const fetchMemberOnlyData = async (slug) => {
      try {
        const limitedData = await getLimitedContentDetails(slug);
        console.log('limitedData', limitedData);
        setData(limitedData);
        setCouponLink(limitedData.couponLink);
      } catch (error) {
        console.error('Error fetching member-only list data :', error);
      }
    };
    fetchMemberOnlyData(slug); // Fetch member-only list initially
  }, [pathname]);

  return (
    <>
      <div className='c-heading--border-horizontal'>
        <p className='c-heading--lv3 u-mt-0 u-mb-0'>今月の会員限定記事</p>
      </div>
      <article className='c-article u-mt-0'>
        <Metadata title={METADATA.LIMITED_CONTENT} />
        <header className='u-pt-0'>
          <div className='u-display-flex u-mb-15'>
            <span className='c-badge u-mr-10'>{data.contents_type_nm}</span>
            <p className='c-card__area u-mr-15'>
              <svg className='c-map__icon c-svg'>
                <use xlinkHref='/svg/icon.svg#icon-map' />
              </svg>
              {data.area}
            </p>
            <time className='c-article__detail__date' dateTme={data.ymd}>
              {data.ymd}
            </time>
          </div>
          <h1 className='c-heading--lv2 u-mt-0'>{data.subject}</h1>
        </header>
        <div className='c-article__detail__contents'>
          <p className='u-mt-0'>{data.introduction}</p>
          <div dangerouslySetInnerHTML={{ __html: data.body }} />
        </div>
        <section className='c-article__detail__contents u-pb-0'>
          <div className='u-bg-white u-pa-20 u-display-flex u-display-flex-align-items-center'>
            <p className='c-badge u-mt-0 u-mb-0 u-mr-10 u-display-flex-shrink-0'>
              {couponLink.title}
            </p>
            <p className='u-mt-0 u-mb-0'>
              <Link href={`${couponLink.url}`} target='_blnak'>
                お得なクーポン詳細はこちら
              </Link>
            </p>
          </div>
        </section>
      </article>
    </>
  );
};

export default LimitedContentBody;
