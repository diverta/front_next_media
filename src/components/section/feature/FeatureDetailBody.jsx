'use client'

import Image from "next/image";
import Link from "next/link";

const FeatureDetailBody = ({ data, details }) => {
  return (
    <section className="c-feature">
      <h2 className="c-heading--lv2">{data.subject}</h2>
      <div className="c-feature__intro">
        {data.introduction}
      </div>
      <ul className="c-feature__list">
        {details.map((details, index) => (
          <li key={index} className="c-feature__item">
            <h3 className="c-heading--lv4">{details.subject}</h3>
            <div className="c-feature__contents">
              <figure className="c-feature__image">
                <Image alt="dummy image" src={details.image.url} width="400" height="150" />
              </figure>
              <div className="c-feature__detail">
                <div className="c-feature__text">{details.introduction}</div>
                <p className="c-feature__link">
                  <Link href={`../../article/${details.topics_id}`} className="c-button">
                    MORE
                  </Link>
                </p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default FeatureDetailBody;