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
    <article className='c-box c-memberArticle'>
      <Metadata title={METADATA.LIMITED_CONTENT} />
      <header>
        <div className='c-heading--box__outer -oneLine'>
          <p className='c-heading--box u-mt-0 u-mb-0'>今月の会員限定記事</p>
        </div>
        <h2 className='c-heading--lv2'>{data.subject}</h2>
        <div className='c-memberArticle__head'>
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
      </header>
      <div className='c-article__detail__contents'>
        {data.introduction}
        <br />
        <br />
        <div dangerouslySetInnerHTML={{ __html: data.body }} />
      </div>
      <div className='c-memberArticle__coupon'>
        <dl className='c-memberArticle__coupon__inner'>
          <dt className='c-memberArticle__coupon__title'>{couponLink.title}</dt>
          <dd className='c-memberArticle__coupon__url'>
            <Link
              href={`${couponLink.url}`}
              target='_blnak'
              className='c-memberArticle__coupon__link'
            >
              お得なクーポン詳細はこちら
            </Link>
          </dd>
        </dl>
      </div>
    </article>
  );
};

export default LimitedContentBody;
