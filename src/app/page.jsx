import Banner from '@/components/common/Banner';
import TagArea from '@/components/common/TagArea';
import TagKeyword from '@/components/common/TagKeyword';
import Hero from '@/components/section/top/Hero';
import Feature from '@/components/section/feature/Feature';
import Ranking from '@/components/common/Ranking';
import CardList from '@/components/ui/CardList';
import getContentList from '@/fetch/getContentList';
import Link from 'next/link';

export default async function Page() {
  const { list } = await getContentList();

  return (
    <div className='l-container is-top'>
      <Hero />
      <div className='l-container--col-2'>
        <div className='l-container--col-2__main'>
          <div>
            <section className='c-newInfo'>
              <div className='u-display-flex u-display-flex-align-items-center u-mb-40'>
                <div className='u-display-flex-grow-1'>
                  <h2 className='c-heading--lv1'>新着情報</h2>
                  <p className='c-heading--sub'>New articles</p>
                </div>
                <div className='u-display-flex-shrink-0'>
                  <Link href='/article/' className='c-button'>
                    View All
                  </Link>
                </div>
              </div>
              <CardList data={list} />
            </section>
            <Ranking />
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
