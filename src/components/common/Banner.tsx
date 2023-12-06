import Image from 'next/image'

const Banner = () => {
  return (

    <ul className="l-container--contents-side c-banner__list">
      <li className="c-banner__item">
        <a href="/">
          <Image
              alt="dummy banner"
              src="/images/banner.png" 
              fill
            />
          </a>
      </li>
    </ul>

  );
};

export default Banner;