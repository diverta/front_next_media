import Image from 'next/image'
import CardList from '@/components/ui/CardList'
import { getContentList } from '@/components/common/fetchData';

export default async function Home() {
  const data = await getContentList();
  return (
    <div>

      <section className="c-newInfo">
        <div className="u-display-flex u-display-flex-align-items-center u-mb-40">
          <div className="u-display-flex-grow-1">
            <h2 className="c-heading--lv1">新着情報</h2>
            <p className="c-heading--sub">New articles</p>
          </div>
          <div className="u-display-flex-shrink-0">
            <a href="/article/" className="c-button">View All</a>
          </div>
        </div>
        <CardList data={data}/>
      </section>

      {/* ↓ RANKING  */}
      <section className="c-box l-container--contents">
        <div className="c-heading--box__outer">
            <h2 className="c-heading--box -en">RANKING</h2>
            <p className="c-heading--boxSub">お気に入りランキング</p>
        </div>
        <ul className="c-card-list c-card-list--col-2">
          <li className="c-card__item">
            <a href="/article/detail/" className="c-card">
              <span className="c-card__image__badge02">1</span>
              <div className="c-card__image">
                <Image
                    alt="dummy picture"
                    src="/images/dummy.png" 
                    fill
                  />
              </div>
              <div className="c-card__info">
                <h3 className="c-card__heading">台湾のおすすめホテル5選！</h3>
                <p className="c-card__text">観光に便利な大人気ホテルをご紹介。宿泊体験レポレートも。</p>
                <div className="c-card__bottom">
                  <p className="c-card__area">
                    <svg className="c-map__icon c-svg">
                      <use xlinkHref="../svg/icon.svg#icon-map"/>
                    </svg>台湾
                  </p>
                  <p className="c-card__category">CULTURE</p>
                </div>
              </div>
            </a>
          </li>
          <li className="c-card__item">
            <a href="/article/detail/" className="c-card">
              <span className="c-card__image__badge02">2</span>
              <div className="c-card__image">
                <Image
                    alt="dummy picture"
                    src="/images/dummy.png" 
                    fill
                  />
              </div>
              <div className="c-card__info">
                <h3 className="c-card__heading">台湾のおすすめホテル5選！</h3>
                <p className="c-card__text">観光に便利な大人気ホテルをご紹介。宿泊体験レポレートも。</p>
                <div className="c-card__bottom">
                  <p className="c-card__area">
                    <svg className="c-map__icon c-svg">
                      <use xlinkHref="../svg/icon.svg#icon-map"/>
                    </svg>韓国
                  </p>
                  <p className="c-card__category">EVENT</p>
                </div>
              </div>
            </a>
          </li>
        </ul>
      </section>

    </div>
  )
}
