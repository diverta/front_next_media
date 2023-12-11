import Image from 'next/image'
import Pager from "@/components/common/Pager";
import { newContentList } from '@/components/common/fetchData';
import CardList from '@/components/ui/CardList';

export default async function Shopping () {
  const data = await newContentList('SHOPPING');
  return (
    <section className="c-article__list">
      <h2 className="c-heading--lv2 u-mb-50">ショッピング<span>記事一覧</span></h2>
      <CardList data={data}/>
      <Pager />
    </section>
  )
}
