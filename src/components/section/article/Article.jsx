'use client';

import Breadcrumb from '@/components/common/Breadcrumb';
import PageTitle from '@/components/common/PageTitle';
import Pager from '@/components/common/Pager';
import CardList from '@/components/ui/CardList';
import getContentList from '@/fetch/getContentList';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Article({ children }) {
  const searchParams = useSearchParams();

  const [params, setParams] = useState({});
  const [title, setTitle] = useState('');
  const [list, setList] = useState(null);
  const [pageInfo, setPageInfo] = useState({});

  useEffect(() => {
    searchParams.get('topic') && setTitle('記事');
    searchParams.get('search') && setTitle('検索結果');
    searchParams.get('tag_id') && setTitle('タグ検索結果');
    title === '' && setTitle('記事');

    // changes the searchParams object to a plain object
    const params = searchParams
      .entries()
      .reduce((prev, [key, value]) => ({ ...prev, [key]: value }), {});
    setParams(params);

    async function fetchData() {
      const { list, pageInfo } = await getContentList(params);
      setList(list);
      setPageInfo(pageInfo);
    }
    fetchData();
  }, [searchParams, title]);

  const Wrapper = ({ children }) => (
    <section className='c-article__list'>
      <div className='c-heading__wrapper'>
        <h2 className='c-heading--lv2 u-display-flex-grow-1'>
          <span>{title ? `${title}一覧` : ''}</span>
        </h2>
        <div className='u-display-flex-shrink-0 u-text-align-right'>
          <Link href='/article' className='c-button'>
            View All
          </Link>
        </div>
      </div>
      {children}
    </section>
  );

  return (
    <>
      <Breadcrumb paths={[{ label: list?.[0]?.contents_type_ext_col_01 }]} />
      <PageTitle
        title={list?.[0]?.contents_type_ext_col_01 || '検索結果'}
        subTitle={list?.[0]?.contents_type_nm}
      />
      <div className='l-container--col-2 l-container--contents'>
        <div className='l-container--col-2__main'>
          <Wrapper>
            <>
              {list === null && (
                <div className='c-spinner'>
                  <div className='c-spinner__circle'></div>
                </div>
              )}
              {list?.length === 0 && <p>記事がありません。</p>}
              {list?.length > 0 && (
                <>
                  <CardList data={list} />
                  {Object.keys(pageInfo).length > 0 && (
                    <Pager pageInfo={pageInfo} searchParams={params} />
                  )}
                </>
              )}
            </>
          </Wrapper>
        </div>
        {children}
      </div>
    </>
  );
}
