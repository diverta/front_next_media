'use client';

import DetailBody from '@/components/section/twoColumn/DetailBody';
import Banner from '@/components/common/Banner';
import Breadcrumb from '@/components/common/Breadcrumb';
import TagArea from '@/components/common/TagArea';
import TagKeyword from '@/components/common/TagKeyword';
import Feature from '@/components/section/feature/Feature';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState, Suspense } from 'react';
import getArticlePreview from '@/fetch/getArticlePreview';

export default function Page() {
  return (
    <Suspense>
      <PreviewArticle />
    </Suspense>
  );
}

function PreviewArticle() {
  const preview_token = useSearchParams().get('preview_token');
  const [data, setData] = useState();
  const [paths, setPaths] = useState([{}]);
  const [params, setParams] = useState({});

  useEffect(() => {
    const articleInfo = async () => {
      try {
        const info = await getArticlePreview(preview_token);
        setData(info);
        setPaths([
          {
            href: `/article?topic=${info.contents_type_nm.toLowerCase()}`,
            label: info.contents_type_ext_col_01,
          },
          { label: '記事詳細' },
        ]);
        setParams({
          id: info.topics_id,
        });
      } catch (error) {
        console.error('Error fetching member information', error);
      }
    };

    articleInfo();
  }, [preview_token]);

  return (
    <div className='l-container'>
      <Breadcrumb paths={paths} />
      <div className='l-container--col-2 c-article'>
        <div className='l-container--col-2__main'>
          <div>
            {data && params && <DetailBody data={data} params={params} />}
          </div>
        </div>
        <div className='l-container--col-2__side'>
          <Banner />
          <Feature />
          <TagArea />
          <TagKeyword />
        </div>
      </div>
    </div>
  );
}
