'use client';

import Breadcrumb from '@/components/common/Breadcrumb';
import PageTitle from '@/components/common/PageTitle';
import Pager from '@/components/common/Pager';
import CardList from '@/components/ui/CardList';
import getContentList from '@/fetch/getContentList';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { contentDirectory } from '@/constants/config';

export default function Article({ children }) {
  const searchParams = useSearchParams();

  const [params, setParams] = useState({});
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [categoryTitle, setCategoryTitle] = useState('');
  const [list, setList] = useState(null);
  const [pageInfo, setPageInfo] = useState({});

  useEffect(() => {
    // searchParams.get('topic') && setContent('') && setTitle('記事');
    // searchParams.get('search') && setContent(contentDirectory.search);
    // searchParams.get('tag_id') && setTitle('タグ検索結果') && setContent('');
    // title === '' && setTitle('記事');
    if (searchParams.get('topic')) {
      setContent('');
      setTitle('記事');
    } else if (searchParams.get('search')) {
      setContent(contentDirectory.search);
    } else if (searchParams.get('tag_id')) {
      setTitle('タグ検索結果')
      setContent('');
    } else setContent(contentDirectory.article);
    
    // changes the searchParams object to a plain object
    const params = searchParams
      .entries()
      .reduce((prev, [key, value]) => ({ ...prev, [key]: value }), {});
    setParams(params);

    async function fetchData() {
      const { list, pageInfo } = await getContentList(params);
      setList(list);
      setPageInfo(pageInfo);
      setCategoryTitle(list?.[0]?.contents_type_ext_col_01);
    }
    fetchData();
  }, [searchParams, title, content]);

  const Wrapper = ({ children }) => (
    <section className='c-article__list'>
      <div className='c-heading__wrapper'>
        <h2 className='c-heading--lv2 u-display-flex-grow-1'>
          {/* <span>{title ? `${title}一覧` : ''}</span> */}
          <span>
            {content
              ? `${content.title}一覧`
              : `${categoryTitle}  ${title}一覧`}
          </span>
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
      <Breadcrumb
        paths={[{ label: content ? content.title : categoryTitle }]}
      />
      <PageTitle
        title={content ? content.title : categoryTitle}
        subTitle={content ? content.subtitle : list?.[0]?.contents_type_nm}
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
