import { Suspense } from 'react';
import Banner from '@/components/common/Banner';
import TagArea from '@/components/common/TagArea';
import TagKeyword from '@/components/common/TagKeyword';
import Feature from '@/components/section/feature/Feature';
import Article from '@/components/section/article/Article';
import { METADATA } from '@/constants/config';

export const metadata = {
  title: METADATA.ARTICLES,
};

export default function Page() {
  return (
    <main className='l-container'>
      <Suspense>
        <Article />
        <div className='l-container--large'>
          <Feature />
          <TagArea />
          <TagKeyword />
          <Banner />
        </div>
      </Suspense>
    </main>
  );
}
