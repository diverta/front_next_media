import Image from 'next/image';
import Link from 'next/link';

export default function CardList({ data }) {
  if (!data || !Array.isArray(data)) {
    return null;
  }

  return (
    <div>
      <ul className='c-card-list c-card-list--col-3'>
        {data.map((card, index) => (
          <li key={index} className='c-card__item'>
            <Link href={`/article/${card.topics_id}`} className='c-card'>
              <span className='c-card__image__badge'>
                {card.contents_type_nm}
              </span>
              <div className='c-card__image'>
                <Image
                  alt={card.image.desc || 'dummy'}
                  src={card.image.url}
                  fill
                />
                <span className='c-card__date'>{card.ymd}</span>
              </div>
              <h3 className='c-card__heading'>{card.subject}</h3>
              <p className='c-card__text'>{card.introduction}</p>
              <div className='c-card__bottom'>
                <div className='c-tag__outer'>
                  <svg className='c-tag__icon c-svg'>
                    <use href='/svg/icon.svg#icon-tag' />
                  </svg>
                  <ul className='c-tag__list'>
                    {card.tags.map((tag, tag_index) => (
                      <li key={tag_index} className='c-tag__item'>
                        #{tag.tag_nm}
                      </li>
                    ))}
                  </ul>
                </div>
                <p className='c-favorite'>
                  <svg className='c-favorite__icon c-svg'>
                    <use href='/svg/icon.svg#icon-heart' />
                  </svg>
                  <span>{card.favorite_cnt}</span>
                </p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
