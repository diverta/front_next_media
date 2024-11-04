'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import getFeatureList from '@/fetch/getFeatureList';
import Link from 'next/link';

export default function Feature() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchList = async () => {
      try {
        const fetchedlist = await getFeatureList();
        setData(fetchedlist);
      } catch (error) {
        console.error('Error fetching list information', error);
      }
    };

    fetchList();
  }, []);

  return (
    <section className='l-container--contents'>
      <div className='u-mb-40'>
        <h2 className='c-heading--lv1'>特集</h2>
        <p className='c-heading--sub'>Features</p>
      </div>
      <ul className='c-banner-list c-banner-list--col-2'>
        {data.map((item, index) => (
          <li key={index} className='c-banner__item'>
            <Link href={`/feature/${item.topics_id}`}>
              <Image
                alt={`Image ${index + 1}`}
                src={
                  item.image.url
                } /* Assuming imageUrl is a property in each data item */
                width={600}
                height={342}
              />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
