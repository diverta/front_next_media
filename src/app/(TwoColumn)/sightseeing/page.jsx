import Image from 'next/image'
import Pager from "@/components/common/Pager";
import { newContentList } from '@/app/(top)/page';
import CardList from '@/components/ui/CardList';

export default async function Sightseeing () {
  const data = await newContentList('SIGHTSEEING');
  return (
    <section className="c-article__list">
      <h2 className="c-heading--lv2 u-mb-50">サイトシーイング<span>記事一覧</span></h2>
      <CardList data={data}/>
      <Pager />
    </section>
  )
}
