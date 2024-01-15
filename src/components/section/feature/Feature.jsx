import Image from 'next/image'
import { getFeatureList } from '../../common/fetchData';
import Link from 'next/link';

export default async function Feature(){
  const data = await getFeatureList();
  
  return (

    <section className="l-container--contents-side">
      <h2 className="c-heading--lv3-b">特集</h2>
      <ul className="c-banner__list">
        {data.map((item, index) => (
          <li key={index} className="c-banner__item">
            <Link href={`/feature/${item.topics_id}`}>
              <Image
                alt={`Image ${index + 1}`}
                src={item.ext_1.url} /* Assuming imageUrl is a property in each data item */
                fill
              />
            </Link>
          </li>
        ))}
      </ul>
    </section>

  );
};
