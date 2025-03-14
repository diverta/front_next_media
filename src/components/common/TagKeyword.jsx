'use client';

import { useState, useEffect } from 'react';

import getTagKeyword from '@/fetch/getTagKeyword';
import Link from 'next/link';

export default function TagKeyword() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchList = async () => {
      try {
        const fetchedlist = await getTagKeyword();
        setData(fetchedlist);
      } catch (error) {
        console.error('Error fetching list information', error);
      }
    };

    fetchList();
  }, []);

  return (
    <section className='l-container--contents'>
      <h2 className='c-heading--lv3--border-top'>キーワードから探す</h2>
      <ul className='c-tag__list'>
        {data.map((tag, index) => (
          <li key={index} className='c-tag__item'>
            <Link
              href={`/article?tag_category_id=${tag.tag_category_id}&tag_id=${tag.tag_id}`}
              className='c-tag'
            >
              #{tag.tag_nm}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
