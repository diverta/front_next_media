import Image from "next/image";

const DetailBody = ({ data }) => {
  // console.log(data);
  return (
    <div className="l-container--col c-article">
        <article className="c-article__detail">
          <header>
            <figure className="c-article__detail__mainImage">
              <Image
                alt="dummy main image"
                src={data.ext_1.url}
                width="1200"
                height="400"
              />
            </figure>
            <time className="c-article__detail__date">{data.ymd}</time>
            <h1 className="c-heading--lv1">{data.subject}</h1>
            <p className="c-favorite">
              <a href="#">
                <svg className="c-favorite__icon c-svg">
                  <use xlinkHref="../svg/icon.svg#icon-heart" />
                </svg>
                <span>5</span>
              </a>
            </p>
            <div className="c-tag">
              <svg className="c-tag__icon c-svg">
                <use xlinkHref="/svg/icon.svg#icon-tag" />
              </svg>
              <ul className="c-tag__list">
                {data.tags.map((tag, index) => (
                  <li className="c-tag__item" key={index}>
                    <a href="/mock/" className="c-tag__link">
                      {tag.tag_nm}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </header>
          <div className="c-article__detail__contents">
            <div className="c-article__detail__intro">
              <p className="c-article__detail__intro__text">{data.ext_2}</p>
            </div>
            <div className="c-article__detail__block">
              <h2>{data.ext_3.ext_3}</h2>
              <div className="c-article__detail__free">
                <p>{data.ext_3.ext_4}</p>
              </div>
            </div>
            {data.ext_3.map((item, index) => (
              <div key={index} className="c-article__detail__block">
                <h2>{item.ext_3}</h2>
                <div
                  className="c-article__detail__free"
                  dangerouslySetInnerHTML={{ __html: item.ext_4 }}
                />
              </div>
            ))}
          </div>
        </article>
      </div>
  );
};

export default DetailBody;
