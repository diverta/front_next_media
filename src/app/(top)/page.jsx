import Image from 'next/image'

export default function () {
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
        <ul className="c-card-list c-card-list--col-3">
          <li className="c-card__item">
            <a href="/article/detail/" className="c-card">
              <span className="c-card__image__badge">FOOD</span>
              <div className="c-card__image"> 
                <Image
                  alt="dummy picture"
                  src="/images/dummy.png" 
                  fill
                />
                <span className="c-card__date">2023/10/19</span>
              </div>
              <h3 className="c-card__heading">大阪・難波 人気食べ歩きスポット10選！</h3>
              <p className="c-card__text">昔ながらの名店から今年イチオシのスポットまで。大阪食い倒れツアーのご紹介です。</p>
              <div className="c-card__bottom">
                <div className="c-tag">
                  <svg className="c-tag__icon c-svg">
                    <use xlinkHref="/svg/icon.svg#icon-tag"/>
                  </svg>
                  <ul className="c-tag-card__list">
                    <li className="c-tag-card__item">大阪</li>
                    <li className="c-tag-card__item">スイーツ</li>
                    <li className="c-tag-card__item">食べ歩き</li>
                  </ul>
                </div>
                <p className="c-favorite">
                  <svg className="c-favorite__icon c-svg">
                    <use xlinkHref="../svg/icon.svg#icon-heart"/>
                  </svg>
                  <span>5</span>
                </p>
              </div>
            </a>
          </li>
        </ul>
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
