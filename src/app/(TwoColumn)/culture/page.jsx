import Image from 'next/image'
import Pager from "@/components/common/Pager";
import CardList from '@/components/ui/CardList';
import { getContentList } from '@/components/common/fetchData';

export default async function Culture ({ params }) {
  // console.log(params.slug);
  const data = await getContentList('CULTURE');
  return (
    <section className="c-article__list">
      <h2 className="c-heading--lv2 u-mb-50">カルチャー<span>記事一覧</span></h2>
      <CardList data={data}/>
      <Pager />
    </section>
  )
}