import Image from "next/image";

export default function CardList({data}) {
  return (
    <div>
      <ul className="c-card-list c-card-list--col-3">
      {data.map((card, index) => (
          <li key={index} className="c-card__item">
            <a href={`/culture/${card.topics_id}`} className="c-card">
              <span className="c-card__image__badge">{card.contents_type_nm}</span>
              <div className="c-card__image">
                <Image alt="dummy picture" src={card.ext_1.url} fill />
                <span className="c-card__date">{card.ymd}</span>
              </div>
              <h3 className="c-card__heading">{card.subject}</h3>
              <p className="c-card__text">{card.ext_2}</p>
              <div className="c-card__bottom">
                <div className="c-tag">
                  <svg className="c-tag__icon c-svg">
                    <use xlinkHref="/svg/icon.svg#icon-tag" />
                  </svg>
                  <ul className="c-tag-card__list">
                    {card.tags.map((tag, tag_index) => (
                      <li key={tag_index} className="c-tag-card__item">
                        {tag.tag_nm}
                      </li>
                    ))}
                  </ul>
                </div>
                <p className="c-favorite">
                  <svg className="c-favorite__icon c-svg">
                    <use xlinkHref="../svg/icon.svg#icon-heart" />
                  </svg>
                  {/* <span>{card.likes}</span> */}
                </p>
              </div>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}


