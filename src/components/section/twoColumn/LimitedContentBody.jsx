'use client'

import getLimitedContentDetails from '@/fetch/getLimitedContent'
import { useState, useEffect } from 'react'
import Link from 'next/link'

const LimitedContentBody = ({ params }) => {
  const [data, setData] = useState([])
  const [couponLink, setCouponLink] = useState([])

  useEffect(() => {
    const fetchMemberOnlyData = async () => {
      try {
        const limitedData = await getLimitedContentDetails(params.id)
        setData(limitedData)
        setCouponLink(limitedData.couponLink)
      } catch (error) {
        console.error('Error fetching member-only list data :', error)
      }
    }

    fetchMemberOnlyData() // Fetch member-only list initially
  }, [params])

  return (
    <div>
      <section className="c-box c-memberArticle">
        <div className="c-heading--box__outer -oneLine">
          <h2 className="c-heading--box">今月の会員限定記事</h2>
        </div>
        <h2 className="c-heading--lv2">{data.subject}</h2>
        
        <div className="c-memberArticle__type">
          <p className="c-card__category">{data.contents_type_nm}</p>
          <p className="c-card__area">
            <svg className="c-map__icon c-svg">
            <use xlinkHref="/svg/icon.svg#icon-map" />
            </svg>{data.area}
          </p>
          <time className="c-memberArticle__date">{data.ymd}</time>
        </div>
        <div className="c-memberArticle__detail">
            {data.introduction}<br /><br />
        <div dangerouslySetInnerHTML={{ __html: data.body }} />
        </div>
        <div className="c-memberArticle__coupon">
          <dl className="c-memberArticle__coupon__info">
            <dt className="c-memberArticle__coupon__title">{couponLink.title}</dt>
            <dd className="c-memberArticle__coupon__url"><Link href={`${couponLink.url}`} target="_blnak" className="c-memberArticle__coupon__link">お得なクーポン詳細はこちら</Link></dd>
          </dl>
        </div>
      </section>
    </div>
  )
}

export default LimitedContentBody
