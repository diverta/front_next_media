import getTagKeyword from '@/fetch/getTagKeyword';
import Link from 'next/link';

export default async function TagKeyword() {
  const data = await getTagKeyword();

  return (
    <section className='l-container--contents-side'>
      <h2 className='c-heading--lv3-b'>キーワードから探す</h2>
      <ul className='c-tag__list'>
        {data.map((tag, index) => (
          <li key={index} className='c-tag__item'>
            <Link
              href={`/article?tag_category_id=${tag.tag_category_id}&tag_id=${tag.tag_id}`}
              className='c-tag__link'
            >
              {tag.tag_nm}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
