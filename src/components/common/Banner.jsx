import Image from 'next/image';
import Link from 'next/link';

const Banner = () => {
  return (
    <aside className='l-container--contents'>
      <ul className='c-banner-list'>
        <li className='c-banner__item'>
          <Link href='/'>
            <Image
              alt='dummy banner'
              src='/images/banner.png'
              width={240}
              height={240}
            />
          </Link>
        </li>
        <li className='c-banner__item'>
          <Link href='/'>
            <Image
              alt='dummy banner'
              src='/images/banner.png'
              width={240}
              height={240}
            />
          </Link>
        </li>
      </ul>
    </aside>
  );
};

export default Banner;
