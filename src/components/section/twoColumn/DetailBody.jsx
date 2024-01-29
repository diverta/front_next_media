import Image from "next/image";
import Link from "next/link";

const DetailBody = ({ data }) => {
  return (
    <div>
      <article className="c-article__detail">
        <header>
          <figure className="c-article__detail__mainImage">
            <Image
              alt="dummy main image"
              src={data.image.url}
              width="1200"
              height="400"
            />
          </figure>
          <time className="c-article__detail__date">{data.ymd}</time>
          <h1 className="c-heading--lv1">{data.subject}</h1>
          <p className="c-favorite">
            <Link href="#">
              <svg className="c-favorite__icon c-svg">
                <use href="../svg/icon.svg#icon-heart" />
              </svg>
              <span>{data.favorite_cnt}</span>
            </Link>
          </p>
          <div className="c-tag">
            <svg className="c-tag__icon c-svg">
              <use href="/svg/icon.svg#icon-tag" />
            </svg>
            <ul className="c-tag__list">
              {data.tags.map((tag, index) => (
                <li className="c-tag__item" key={index}>
                  <a href={`/article?tag_category_id=${tag.tag_category_id}&tag_id=${tag.tag_id}`} className="c-tag__link">
                    {tag.tag_nm}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </header>
        <div className="c-article__detail__contents">
          <div className="c-article__detail__intro">
            <p className="c-article__detail__intro__text">{data.introduction}</p>
          </div>
          {data.contentItems.map((item, index) => (
            <div key={index} className="c-article__detail__block">
              <h2>{item.header}</h2>
              <div
                className="c-article__detail__free"
                dangerouslySetInnerHTML={{ __html: item.body }}
              />
            </div>
          ))}
        </div>
      </article>
    </div>
  );
};

export default DetailBody;
