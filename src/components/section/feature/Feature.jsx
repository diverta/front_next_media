'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import getFeatureList from '@/fetch/getFeatureList';
import Link from 'next/link';

export default function Feature() {
  const [data, setData] = useState([]);

  //again test comment
  //commit 2

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
    <section className='l-container--contents-side'>
      <h2 className='c-heading--lv3-b'>特集</h2>
      <ul className='c-banner__list'>
        {data.map((item, index) => (
          <li key={index} className='c-banner__item'>
            <Link href={`/feature/${item.topics_id}`}>
              <Image
                alt={`Image ${index + 1}`}
                src={
                  item.image.url
                } /* Assuming imageUrl is a property in each data item */
                width={400}
                height={180}
              />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
