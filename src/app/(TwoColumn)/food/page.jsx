import Image from 'next/image'
import Pager from "@/components/common/Pager";

export default function Food () {
  return (

    <section class="c-article__list">
      <h2 class="c-heading--lv2 u-mb-50">ショッピング<span>記事一覧</span></h2>
      <ul class="c-card-list c-card-list--col-3">
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

      <Pager />
    </section>

  )
}