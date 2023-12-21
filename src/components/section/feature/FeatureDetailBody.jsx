'use client'

import { getDetails } from "@/components/common/fetchData";
import Image from "next/image";

const FeatureDetailBody = ({ data }) => {

  return (
    <section className="c-feature">
      <h2 className="c-heading--lv2">{data.subject}</h2>
      <div className="c-feature__intro">
        {data.ext_2}
      </div>
      <ul className="c-feature__list">
        {data.ext_3.map(async (item, index) => {
          const details = await getDetails(item.module_id);
          return (
            <li key={index} className="c-feature__item">
              <h3 className="c-heading--lv4">{details.subject}</h3>
              <div className="c-feature__contents">
                <figure className="c-feature__image">
                <Image
                alt="dummy image"
                src={details.ext_1.url}
                width="400"
                height="150"
              />
                </figure>
                <div className="c-feature__detail">
                  <div className="c-feature__text">
                    {details.ext_2}
                  </div>
                  <p className="c-feature__link">
                    <a href={`../../article/${details.topics_id}`} className="c-button">MORE</a>
                  </p>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default FeatureDetailBody;
