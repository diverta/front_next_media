import Banner from "@/components/common/Banner";
import TagArea from "@/components/common/TagArea";
import TagKeyword from "@/components/common/TagKeyword";
import Hero from "@/components/section/top/Hero";
import Feature from "@/components/section/feature/Feature";
import Image from "next/image";
import CardList from "@/components/ui/CardList";
import getContentList from "@/fetch/getContentList";
import getRanking from "@/fetch/getRanking";
import Link from "next/link";

export default async function Page() {
  const { list } = await getContentList();
  const topRankedList = await getRanking();

  return (
    <div className="l-container is-top">
      <Hero />
      <div className="l-container--col-2">
        <div className="l-container--col-2__main">

          <div>
            <section className="c-newInfo">
              <div className="u-display-flex u-display-flex-align-items-center u-mb-40">
                <div className="u-display-flex-grow-1">
                  <h2 className="c-heading--lv1">新着情報</h2>
                  <p className="c-heading--sub">New articles</p>
                </div>
                <div className="u-display-flex-shrink-0">
                  <Link href="/article/" className="c-button">
                    View All
                  </Link>
                </div>
              </div>
              <CardList data={list} />
            </section>

            {/* ↓ RANKING  */}
            <section className="c-box l-container--contents">
              <div className="c-heading--box__outer">
                <h2 className="c-heading--box -en">RANKING</h2>
                <p className="c-heading--boxSub">お気に入りランキング</p>
              </div>
              <ul className="c-card-list c-card-list--col-2">
                {topRankedList.map((item, index) => (
                  <li className="c-card__item" key={index}>
                    <Link href={`/article/${item.topics_id}`} className="c-card">
                      <span className="c-card__image__badge02">{index + 1}</span>
                      <div className="c-card__image">
                        <Image alt={item.image.desc || 'dummy'} src={item.image.url} fill />
                      </div>
                      <div className="c-card__info">
                        <h3 className="c-card__heading">{item.subject}</h3>
                        <p className="c-card__text">{item.introduction}</p>
                        <div className="c-card__bottom">
                          <p className="c-card__area">
                            <svg className="c-map__icon c-svg">
                              <use href="../svg/icon.svg#icon-map" />
                            </svg>
                            {item.tags.map((tag, tag_index) =>
                              tag.tag_category_id === 5 ? (
                                <span key={tag_index} className="c-tag-card__item">
                                  {tag.tag_nm}
                                </span>
                              ) : null
                            )}
                          </p>
                          <p className="c-card__category">{item.contents_type_nm}</p>
                        </div>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          </div>

        </div>
        <div className="l-container--col-2__side">
          <Banner />
          <Feature />
          <TagArea />
          <TagKeyword />
        </div>
      </div>
    </div>
  );
}
