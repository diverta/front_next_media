import Image from 'next/image'
import Link from 'next/link'

const Banner = () => {
  return (

    <ul className="l-container--contents-side c-banner__list">
      <li className="c-banner__item">
        <Link href="/">
          <Image
              alt="dummy banner"
              src="/images/banner.png" 
              fill
            />
          </Link>
      </li>
    </ul>

  );
};

export default Banner;