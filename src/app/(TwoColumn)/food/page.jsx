import Image from 'next/image'
import Pager from "@/components/common/Pager";
import { newContentList } from '@/components/common/fetchData';
import CardList from '@/components/ui/CardList';

export default async function Food () {
  const data = await newContentList('FOOD');
  return (
    <section className="c-article__list">
      <h2 className="c-heading--lv2 u-mb-50">フード<span>記事一覧</span></h2>
      <CardList data={data}/>
      <Pager />
    </section>
  )
}
