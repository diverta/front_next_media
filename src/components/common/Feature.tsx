import Image from 'next/image'

const Feature = () => {
  return (

    <section className="l-container--contents-side">
      <h2 className="c-heading--lv3-b">特集</h2>
      <ul className="c-banner__list">
        <li className="c-banner__item">
          <a href="/">
            <Image
                alt="dummy banner"
                src="/images/banner_feature.png" 
                fill
              />
          </a>
        </li>
        <li className="c-banner__item">
          <a href="/">
            <Image
                alt="dummy banner"
                src="/images/banner_feature.png" 
                fill
              />
          </a>
        </li>
      </ul>
    </section>

  );
};

export default Feature;